from bson import ObjectId

from connectors.ABCConnector import DatabaseConnector


class UserConnector(DatabaseConnector):
    def __init__(self, url, db_name='dev'):
        super().__init__(url, db_name)
        self.users_table = self.db['user']

    def append_record(self, user_id, record_id):
        doc = self.users_table.findOne({"user_id": user_id})
        print(doc)
        self.users_table.update_one({"user_id": user_id}, {'$push': {'records': record_id}})
        doc = self.users_table.findOne({"user_id": user_id})
        print(doc)

    def get_free_users(self):
        return list(self.users_table.find({'assigned': False}))

    def get_free_user_count(self):
        return self.users_table.count_documents({'assigned': False})

    #TODO change to realy changing user
    def change_user_state(self, user, state):
        self.users_table.update_one({"nid": user['nid']}, {"$set": {"assigned": state}}, upsert=False)

    def get_user_by_username(self, user_id):
        return self.users_table.find_one({"user_id": user_id})

    def get_all_users(self):
        docs = list(self.users_table.find({}))
        for doc in docs:
            doc["_id"] = str(doc["_id"])

        return docs
