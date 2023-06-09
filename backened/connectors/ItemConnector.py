from connectors.ABCConnector import DatabaseConnector
from models import ItemType


class ItemConnector(DatabaseConnector):
    def __init__(self, url, db_name='dev'):
        super().__init__(url, db_name)
        self.items_table = self.db['item']

    def get_available_items(self, product_id: str, qty: int):
        print(product_id, qty)
        items = self.items_table.find({
            "product_id": product_id,
        }).limit(qty)
        return list(items)

    #
    def collect_item(self, item_id):
        self.items_table.update_one({"nid": item_id}, {"$set": {'state': ItemType.COLLECTED}}, upsert=False)

    def get(self, item_id):
        return self.items_table.find_one({"nid": item_id, "state": ItemType.ON_SHELF})
