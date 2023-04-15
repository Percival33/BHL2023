from datetime import datetime
from typing import List

from pydantic import BaseModel

class Product(BaseModel):
    name: str


class Item(BaseModel):
    code: str
    name: str
    state: str # on shelf, proccesed, collected
    regal: int
    column: int
    shelf: int


class Order(BaseModel):
    items: List[str]
    date_order: str


class Record(BaseModel):
    items: List[Item]
    date_assigned: datetime
    date_collected: datetime
    distance: int


class User(BaseModel):
    name: str
    last_name: str
    is_free: bool
    orders: List[Order]

class UserModel(BaseModel):
    name: str
    lastName: str