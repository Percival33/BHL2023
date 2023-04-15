from datetime import datetime
from typing import List

from pydantic import BaseModel


class Item:
    code: str
    name: str
    state: str
    regal: int
    column: int
    shelf: int


class Order:
    items: List[Item]
    date_order: datetime


class Record:
    items: List[Item]
    date_assigned: datetime
    date_collected: datetime
    distance: int


class Worker:
    name: str
    last_name: str
    is_free: bool
    orders: List[Order]
