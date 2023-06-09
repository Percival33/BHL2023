from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder

from models import Order, Task, RecordIdentity
from beans import records_manager
from beans import user_manager

router = APIRouter()


@router.post("/")
async def collect_order(order: Order):
    order = jsonable_encoder(order)
    records = records_manager.handle_order(order)
    for record, id in records:
        json_task = Task(**{
            "type": "new_task",
            "content": RecordIdentity(record_id=str(id), record=record)
        }).json()
        await user_manager.send_to_user(record.worker_id, json_task)
    return "done!"
