import json

from fastapi import APIRouter
from fastapi.encoders import jsonable_encoder

from models import Order, Task
from beans import records_manager
from beans import user_manager

router = APIRouter()


@router.post("/")
async def collect_order(order: Order):
    order = jsonable_encoder(order)
    record = records_manager.handle_order(order)
    print(record.json())
    json_task = json.dumps(Task(**{
            "type": "new_task",
          "content": record
        }).json())
    await user_manager.send_to_user(record.worker_id, json_task)
    return "done!"
