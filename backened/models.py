from datetime import datetime
from typing import List

from pydantic import BaseModel

ON_SHELF = "on_shelf"
PROCESSED = "processed"

class Product(BaseModel):
    name: str


class Item(BaseModel):
    code: str
    name: str
    state: str # on shelf, proccesed, collected
    regal: int
    column: int
    shelf: int


class OrderItem(BaseModel):
    id: str
    quantity: int


class Order(BaseModel):
    items: list[OrderItem]
    date_order: str


class Record(BaseModel):
    items: list[Item]
    worker_id: str
    state: str
    date_assigned: datetime
    date_collected: datetime
    distance: int


class RecordResponse(BaseModel):
    type: str
    content: Record


class User(BaseModel):
    name: str
    last_name: str
    is_free: bool
    orders: List[Order]
    username: str

