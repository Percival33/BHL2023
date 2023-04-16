from pymongo import MongoClient
from abc import ABC


class DatabaseConnector(ABC):
    def __init__(self, url, db_name='dev'):
        self.client = MongoClient(url)
        self.db = self.client[db_name]
