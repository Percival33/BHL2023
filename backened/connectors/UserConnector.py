from connectors.ABCConnector import DatabaseConnector


class UserConnector(DatabaseConnector):
    def __init__(self, url, db_name='dev'):
        super().__init__(url, db_name)
        self.users_table = self.db['user']

    def get_free_users(self):
        return list(self.users_table.find({'is_free': True}))

    def change_user_state(self, user, state):
        self.users_table.update_one({"_id": user['_id']}, {"$set": {"state": state}})

    def get_user_by_username(self, user_id):
        return self.users_table.find_one({"user_id": user_id})
