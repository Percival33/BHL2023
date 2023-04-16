from connectors.ABCConnector import DatabaseConnector
from datetime import datetime

from models import Qr


class QrConnector(DatabaseConnector):
    def __init__(self, url, db_name='dev'):
        super().__init__(url, db_name)
        self.qr_table = self.db['qr']

    def insert_qr_data(self, data):
        date = datetime.now().isoformat()
        data["date"] = date
        new_doc = Qr(**data)
        print("newdoc", new_doc)
        self.qr_table.insert_one(new_doc.dict())
