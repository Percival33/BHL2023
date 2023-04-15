from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder

from models import Order
from beans import records_manager

router = APIRouter()


@router.post("/")
async def collect_order(order: Order):
    order = jsonable_encoder(order)
    records_manager.create_record(order)
    # await worker_manager.send_to_user("hello", json.dumps(order))
    return ""
