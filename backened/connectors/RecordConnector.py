from connectors.ABCConnector import DatabaseConnector
from models import Record


class RecordConnector(DatabaseConnector):
    def __init__(self, url, db_name='dev'):
        super().__init__(url, db_name)
        self.record_connector = self.db['record']

    def insert_record(self, record: Record):
        return self.record_connector.insert_one(record.dict())