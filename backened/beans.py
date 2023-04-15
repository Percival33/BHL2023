from connectors.ItemConnector import ItemConnector
from connectors.UserConnector import UserConnector
from connectors.DefectConnector import DefectConnector

from config import settings

from managers.RecordManager import RecordManager
from managers.UserManagers import UserManager

user_connector = UserConnector(settings.DB_URL)
item_connector = ItemConnector(settings.DB_URL)
defect_connector = DefectConnector(settings.DB_URL)

records_manager = RecordManager(user_connector, item_connector)
user_manager = UserManager()
