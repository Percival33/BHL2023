import json

from connectors.ABCConnector import DatabaseConnector
from models import Defect


class DefectConnector(DatabaseConnector):
    def __init__(self, url, db_name='dev'):
        super().__init__(url, db_name)
        self.defects_table = self.db['defect']

    def report_defect(self, defect: Defect):
        self.defects_table.insert_one(defect.dict())
