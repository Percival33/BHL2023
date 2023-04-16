import json

from connectors.ABCConnector import DatabaseConnector
from models import Defect
from models import DefectType


class DefectConnector(DatabaseConnector):
    def __init__(self, url, db_name='dev'):
        super().__init__(url, db_name)
        self.defects_table = self.db['defect']

    def report_defect(self, defect: Defect):
        new_doc = self.defects_table.insert_one(defect.dict())
        return self.get_one(new_doc.inserted_id)

    def get_one(self, defect_id: str):
        doc = self.defects_table.find_one({"_id": defect_id})
        doc["_id"] = str(doc["_id"])
        return doc

    def get_all(self):
        docs = list(self.defects_table.find({}))
        for doc in docs:
            doc["_id"] = str(doc["_id"])
        return list(docs)

    def resolve_defect(self, defect: Defect):
        return self.defects_table.update_one(defect)
