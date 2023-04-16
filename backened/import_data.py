import sys

import json
from config import settings
from pymongo import MongoClient, InsertOne

client = MongoClient(settings.DB_URL)
db = client[sys.argv[1]]

collections = [
    "item",
    "user",
    "product",
    "product_type"
]

for name in collections:
    collection = db[name]
    requesting = []

    with open(rf"{name}.json") as f:
        data = json.load(f)
        for obj in data:
            requesting.append(InsertOne(obj))

    result = collection.bulk_write(requesting)

client.close()
