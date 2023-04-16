from enum import Enum
from pydantic import BaseModel


class ProductType(BaseModel):
    name: str
    weight: int  # TODO


class Product(BaseModel):
    count: int
    count_reserved: int
    product_type_id: str
    regal: int
    column: int
    shelf: int


class ItemType(str, Enum):
    ON_SHELF = "on_shelf"
    PROCESSED = "processed"
    COLLECTED = "collected"


class Item(BaseModel):
    product_id: str
    state: ItemType


class OrderItem(BaseModel):
    product_type_id: str
    qty: int


class Order(BaseModel):
    order_items: list[OrderItem]
    date_ordered: str
    date_completed: str = None


class RecordItemType(str, Enum):
    READY = "ready"  # ready to collect
    PROCESSED = "processed"  # collecting
    COMPLETED = "completed"  # collected


# per wyspa
class RecordItem(BaseModel):  # instruction for frontend
    product_id: str
    qty: int
    regal: int
    column: int
    shelf: int
    state: RecordItemType = RecordItemType.READY


# dla pracownika
class RecordState(str, Enum):
    CREATED = "created"
    PROCESSED = "processed"  # assigned worker
    COMPLETED = "completed"


class Record(BaseModel):
    _id: str
    products: list[RecordItem]
    worker_id: str
    date_started: str
    date_finished: str = None
    state: RecordState = RecordState.CREATED
    distance: int


class RecordItemResponseType(str, Enum):  # returned from frontend
    DEFECT = "defect"
    SCANNED_ITEM = "scanned_item"


class RecordItemResponse(BaseModel):
    type: RecordItemResponseType
    item_id: str
    product_id: str


class RecordResponseType(str, Enum):
    FINISHED_TASK = "finished_task"
    ERROR = "error"  # TODO: handle error on frontend


class RecordResponse(BaseModel):
    type: RecordResponseType
    record_id: str


class TaskType(str, Enum):
    NEW_TASK = "new_task"

class RecordIdentity(BaseModel):
    record_id: str
    record: Record

class Task(BaseModel):  # message for frontend
    type: TaskType = TaskType.NEW_TASK
    content: RecordIdentity


class AnnouncementType(str, Enum):  # message to worker
    BREAK = "break"  # message for worker to go for a break


class Announcement(BaseModel):
    type: AnnouncementType = AnnouncementType.BREAK
    content: str


class User(BaseModel):
    name: str
    last_name: str
    assigned: bool
    records: list[Record]
    user_id: str  # shorter than mongo id


class DefectType(str, Enum):  # defect reported by worker to system
    REPORTED: str = "reported"
    RESOLVED: str = "resolved"


class Defect(BaseModel):
    item_id: str
    comment: str
    date: str
    worker_id: str
    state: DefectType = DefectType.REPORTED


class Qr(BaseModel):
    product_id: str
    item_id: str
    name: str
    date: str
