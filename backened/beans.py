from connectors.ItemConnector import ItemConnector
from connectors.ProductConnector import ProductConnector
from connectors.UserConnector import UserConnector
from connectors.DefectConnector import DefectConnector

from config import settings
from managers.PathManager import PathManager

from managers.RecordManager import RecordManager
from managers.UserManagers import UserManager

user_connector = UserConnector(settings.DB_URL)
item_connector = ItemConnector(settings.DB_URL)
product_connector = ProductConnector(settings.DB_URL)
defect_connector = DefectConnector(settings.DB_URL)

user_manager = UserManager()
path_manager = PathManager()
records_manager = RecordManager(user_connector, product_connector, path_manager)
