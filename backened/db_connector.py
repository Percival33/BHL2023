from bson import ObjectId
from pymongo import MongoClient

from models import ON_SHELF, OrderItem, Item, PROCESSED


class DatabaseConnector:
    def __init__(self, url):
        self.client = MongoClient(url)
        self.db = self.client['dev']
        self.users_table = self.db['user']
        self.items_table = self.db['Items']

    def get_free_users(self):
        return list(self.users_table.find({'is_free': True}))

    def get_available_items(self, item: OrderItem):
        items = self.items_table.find({
            "code": ObjectId(item['id']),
            "state": ON_SHELF
        }).limit(item['quantity'])
        return list(items)

    def reserve_item(self, item: Item):
        self.items_table.update_one({"_id": item["_id"]}, {"$set":{'state': PROCESSED}}, upsert=False)

    def change_user_state(self, user, state):
        self.users_table.update_one({"_id": user['_id']}, {"$set": {"state": state}})


