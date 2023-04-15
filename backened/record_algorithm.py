from db_connector import DatabaseConnector
from models import Order, Record
import time


class RecordsManager:
    def __init__(self, db: DatabaseConnector):
        self.db = db

    def create_record(self, order: Order, user_id):
        print(order['items'])
        for item in order['items']:
            records_elements = self.db.get_available_items(item)
            # for it in records_elements:
            #     self.db.reserve_item(it)


    def assign_worker(self):
        user = self.db.get_free_users()[0]
        self.db.


