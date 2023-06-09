from connectors.ProductConnector import ProductConnector
from connectors.RecordConnector import RecordConnector
from connectors.UserConnector import UserConnector
from managers.PathManager import PathManager
from models import Order, Record, RecordItem
import datetime

from utils.RecordItemsQueue import RecordItemsQueue


class RecordManager:
    def __init__(self, user_connector: UserConnector, product_connector: ProductConnector, path_manager: PathManager,
                 item_connector, qr_connector, record_connector: RecordConnector):
        self.user_connector = user_connector
        self.product_connector = product_connector
        self.path_manager = path_manager
        self.records_queue = RecordItemsQueue()
        self.item_connector = item_connector
        self.qr_connector = qr_connector
        self.record_connector = record_connector

    def reserve_products(self, order_items):
        taken = []
        for item in order_items:
            products = self.product_connector.get_available_products_by_type(item.product_type_id)
            to_take = item.qty
            for product in products:
                count = product['count']
                possible_to_take = count - product['count_reserved']
                if possible_to_take > to_take:
                    reserved_qty = to_take
                else:
                    reserved_qty = possible_to_take
                self.product_connector.reserve_product(product['nid'], reserved_qty)
                to_take -= reserved_qty
                product['name'] = self.product_connector.get_available_products_by_name(product['product_type_id'])
                taken.append((product, reserved_qty))
                items = self.item_connector.get_available_items(str(product["nid"]), reserved_qty)
                # print("len2", len(items), items)
                for item_product in items:
                    # print("it", item_product)
                    name = self.product_connector.get_available_products_by_name(product['product_type_id'])
                    self.qr_connector.insert_qr_data({
                        "product_id": str(product["nid"]),
                        "item_id": str(item_product["nid"]),
                        "name": name
                    })

                if to_take <= 0:
                    break
        return taken

    # TODO make it in transaction
    def handle_order(self, order: Order):
        self.records_queue.inject_order(order)

        def is_free_user():
            return self.user_connector.get_free_user_count() > 0

        records = []
        while self.records_queue.is_enough_to_assign() and is_free_user():
            batch = self.records_queue.get_batch()
            taken = self.reserve_products(batch)
            print("CHECK USER")
            user = self.user_connector.get_free_users()[0]
            self.user_connector.change_user_state(user, True)
            record = Record(**{
                "worker_id": user['user_id'],
                "date_started": datetime.datetime.now().isoformat(),
                "products": [
                    RecordItem(**{
                        'product_id': str(product['nid']),
                        'qty': qty,
                        'name': product['name'],
                        'regal': product['regal'],
                        'column': product['column'],
                        'shelf': product['shelf']
                    }) for product, qty in taken
                ],
                "distance": -1
            })
            record.products = self.path_manager.get_optimal_route(record.products)
            _id = self.record_connector.insert_record(record)
            records.append((record, _id.inserted_id))
        return records
