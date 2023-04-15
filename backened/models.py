from datetime import datetime
from enum import Enum
from pydantic import BaseModel


class Product(BaseModel):
    name: str


class Item(BaseModel):
    code: str
    name: str
    state: str  # on shelf, proccesed, collected
    regal: int
    column: int
    shelf: int


class Order(BaseModel):
    items: list[str]
    date_order: str


class Record(BaseModel):
    items: list[Item]
    date_assigned: datetime
    date_collected: datetime
    distance: int


class RecordType(str, Enum):
    finished_task = "finished_task"
    defect = "defect"
    taken_product = "taken_product"


class RecordResponse(BaseModel):
    type: RecordType
    content: Record


class User(BaseModel):
    name: str
    last_name: str
    is_free: bool
    orders: list[Order]


class UserModel(BaseModel):
    name: str
    lastName: str
