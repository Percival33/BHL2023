from bson import ObjectId

from connectors.ABCConnector import DatabaseConnector


class UserConnector(DatabaseConnector):
    def __init__(self, url, db_name='dev'):
        super().__init__(url, db_name)
        self.users_table = self.db['user']

    def get_free_users(self):
        return list(self.users_table.find({'assigned': False}))

    def get_free_user_count(self):
        return self.users_table.count_documents({'assigned': False})

    #TODO change to realy changing user
    def change_user_state(self, user, state):
        print(self.users_table.find_one({"_id": ObjectId(user['_id'])}))
        self.users_table.update_one({"_id": ObjectId(user['_id']), "user_id": "1"}, {"$set": {"state": state}}, upsert=False)

    def get_user_by_username(self, user_id):
        return self.users_table.find_one({"user_id": user_id})
