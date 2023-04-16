from connectors.ABCConnector import DatabaseConnector
from connectors.ProductConnector import ProductConnector
from connectors.UserConnector import UserConnector
from managers.PathManager import PathManager
from models import Order, Record, RecordItem
import datetime

from utils.RecordItemsQueue import RecordItemsQueue


class RecordManager:
    def __init__(self, user_connector: UserConnector, product_connector: ProductConnector, path_manager: PathManager, item_connector, qr_connector):
        self.user_connector = user_connector
        self.product_connector = product_connector
        self.path_manager = path_manager
        self.records_queue = RecordItemsQueue()
        self.item_connector = item_connector
        self.qr_connector = qr_connector

    def reserve_products(self, order_items):
        taken = []
        for item in order_items:
            products = self.product_connector.get_available_products_by_type(item.product_type_id)
            to_take = item.qty
            for product in products:
                count = product['count']
                possible_to_take = count - product['count_reserved']
                if possible_to_take > to_take: reserved_qty = to_take
                else: reserved_qty = possible_to_take
                self.product_connector.reserve_product(product['_id'], reserved_qty)
                to_take -= reserved_qty
                taken.append((product, reserved_qty))
                for item_product in self.item_connector.get_available_items(product["_id"], reserved_qty):
                    self.qr_connector.insert_qr_data({
                        "product_id": product["_id"],
                        "item_id": item_product["_id"],
                        "name": self.product_connector.get_available_products_by_name()
                    })

                if to_take <= 0:
                    break
        return taken

    #TODO make it in transaction
    def handle_order(self, order: Order):
        self.records_queue.inject_order(order)
        def is_free_user():
            return self.user_connector.get_free_user_count() > 0
        records = []
        while self.records_queue.is_enough_to_assign() and is_free_user():
            batch = self.records_queue.get_batch()
            taken = self.reserve_products(batch)
            user = self.user_connector.get_free_users()[0]
            self.user_connector.change_user_state(user, True)
            record = Record(**{
                "worker_id": user['user_id'],
                "date_started": datetime.datetime.now().isoformat(),
                "products": [
                    RecordItem(**{
                        'product_id': str(product['_id']),
                        'qty': qty,
                        'regal': product['regal'],
                        'column': product['column'],
                        'shelf': product['shelf']
                    }) for product, qty in taken
                ],
                "distance": -1
            })
            record.products = self.path_manager.get_optimal_route(record.products)
            records.append(record)
        return records

