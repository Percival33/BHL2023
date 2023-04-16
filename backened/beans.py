from connectors.ItemConnector import ItemConnector
from connectors.ProductConnector import ProductConnector
from connectors.RecordConnector import RecordConnector
from connectors.UserConnector import UserConnector
from connectors.DefectConnector import DefectConnector
from connectors.QrConnector import QrConnector

from config import settings
from managers.PathManager import PathManager

from managers.RecordManager import RecordManager
from managers.UserManagers import UserManager
from managers.DashboardManager import DashboardManager

user_connector = UserConnector(settings.DB_URL, settings.DB_NAME)
item_connector = ItemConnector(settings.DB_URL, settings.DB_NAME)
record_connector = RecordConnector(settings.DB_URL, settings.DB_NAME)
qr_connector = QrConnector(settings.DB_URL, settings.DB_NAME)
product_connector = ProductConnector(settings.DB_URL, settings.DB_NAME)
defect_connector = DefectConnector(settings.DB_URL, settings.DB_NAME)

dashboard_manager = DashboardManager()
user_manager = UserManager()
path_manager = PathManager()
records_manager = RecordManager(user_connector, product_connector, path_manager, item_connector, qr_connector, record_connector)
