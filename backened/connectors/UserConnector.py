from connectors.ABCConnector import DatabaseConnector


class UserConnector(DatabaseConnector):
    def __init__(self, url, db_name='dev'):
        super().__init__(url, db_name)
        self.users_table = self.db['user']

    def append_record(self, user_id, record_id):
        doc = self.users_table.find_one({"user_id": user_id})
        print(doc)
        self.users_table.update_one({"user_id": user_id}, {'$push': {'records': str(record_id)}})
        doc = self.users_table.find_one({"user_id": user_id})
        print(doc)

    def get_free_users(self):
        users = self.users_table.find({'assigned': False})
        min_user = None

        for user in users:
            if min_user is None or len(user['records']) < len(min_user['records']):
                min_user = user

        return [min_user]

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
