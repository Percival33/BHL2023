from bson import ObjectId

from connectors.ABCConnector import DatabaseConnector


class ProductConnector(DatabaseConnector):
    def __init__(self, url, db_name='dev'):
        super().__init__(url, db_name)
        self.product_table = self.db['product']
        self.product_type_table = self.db['product_type']

    def get_available_products_by_type(self, product_type_id):
        # return self.product_table.find({
        #     "product_type_id": ObjectId(product_type_id),
        #     "$expr": {"$lt": ["$count_reserved", "$count"]}
        # }).sort('count_reserved', -1)

        return self.product_table.find({
            "product_type_id": product_type_id,
        }).sort('count_reserved', -1)

    def get_available_products_by_name(self, product_type_id):
        doc = self.product_type_table.find_one({
            "_id": ObjectId(product_type_id),
        })

        print(doc)
        return doc["name"]

    def reserve_product(self, product_id, reserved_count):
        self.product_table.update_one({
            "_id": product_id
        }, {
            "$inc": {'count_reserved': reserved_count}
        })

    def get(self, product_id):
        return self.product_table.find_one({"_id": ObjectId(product_id)})

    def decrement_count(self, product_id, qty=1):
        self.product_table.update_one(
            {
                "_id": ObjectId(product_id)
            },
            {
                "$inc": {"count": -qty, "count_reserved": -qty},
            }
        )
        return self.get(product_id)
