from connectors.ABCConnector import DatabaseConnector
from models import ItemType


class ItemConnector(DatabaseConnector):
    def __init__(self, url, db_name='dev'):
        super().__init__(url, db_name)
        self.items_table = self.db['item']



    # def get_available_items(self, item: OrderItem):
    #     items = self.items_table.find({
    #         "code": ObjectId(item['id']),
    #         "state": ON_SHELF
    #     }).limit(item['quantity'])
    #     return list(items)
    #
    def collect_item(self, item_id):
        self.items_table.update_one({"_id": item_id}, {"$set": {'state': ItemType.COLLECTED}}, upsert=False)
