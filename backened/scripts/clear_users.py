from pymongo import MongoClient, InsertOne
from config import settings
from beans import user_connector

client = MongoClient(settings.DB_URL)
db = client['dev']

users = user_connector.get_all_users()

for user in users:
    user_connector.change_user_state(user, True)

client.close()
