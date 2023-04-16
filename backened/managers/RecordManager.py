from connectors.ABCConnector import DatabaseConnector
from connectors.ProductConnector import ProductConnector
from connectors.UserConnector import UserConnector
from managers.PathManager import PathManager
from models import Order, Record, RecordItem
import datetime


class RecordManager:
    def __init__(self, user_connector: UserConnector, product_connector: ProductConnector, path_manager: PathManager):
        self.user_connector = user_connector
        self.product_connector = product_connector
        self.path_manager = path_manager

    def reserve_products(self, order_items):
        taken = []
        print(order_items)
        for item in order_items:
            print(item)
            products = self.product_connector.get_available_products_by_type(item['product_type_id'])
            to_take = item['qty']
            for product in products:
                print(product)
                count = product['count']
                possible_to_take = count - product['count_reserved']
                print(possible_to_take)
                if possible_to_take > to_take: reserved_qty = to_take
                else: reserved_qty = possible_to_take
                self.product_connector.reserve_product(product['_id'], reserved_qty)
                to_take -= reserved_qty
                taken.append((product, reserved_qty))
                if to_take <= 0:
                    break
        return taken

    #TODO make it in transaction
    def handle_order(self, order: Order):
        taken = self.reserve_products(order['order_items'])
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
        return record

