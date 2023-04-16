from bson import ObjectId

from connectors.ABCConnector import DatabaseConnector
from models import Record, RecordState


class RecordConnector(DatabaseConnector):
    def __init__(self, url, db_name='dev'):
        super().__init__(url, db_name)
        self.record_table = self.db['record']

    def insert_record(self, record: Record):
        return self.record_table.insert_one(record.dict())

    def change_record_state(self, record_id: str, state: RecordState):
        self.record_table.update_one({
            '_id': ObjectId(record_id)
        }, {
            "$set": {"state": state}
        })

    def get_all_records(self):
        return self.record_table.find({})
