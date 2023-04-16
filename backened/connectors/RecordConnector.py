from bson import ObjectId

from connectors.ABCConnector import DatabaseConnector
from models import Record, RecordState


class RecordConnector(DatabaseConnector):
    def __init__(self, url, db_name='dev'):
        super().__init__(url, db_name)
        self.record_connector = self.db['record']

    def insert_record(self, record: Record):
        return self.record_connector.insert_one(record.dict())

    def change_record_state(self, record_id: str, state: RecordState):
        self.record_connector.update_one({
            '_id': ObjectId(record_id)
        }, {
            "$set": {"state": state}
        })