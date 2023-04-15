from connectors.ABCConnector import DatabaseConnector


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
    #     def reserve_item(self, item: Item):
    #         self.items_table.update_one({"_id": item["_id"]}, {"$set": {'state': PROCESSED}}, upsert=False)