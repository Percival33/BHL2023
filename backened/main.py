import json

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.encoders import jsonable_encoder
from pymongo.mongo_client import MongoClient
from Managers import WorkersManager

from models import UserModel, Order, RecordItemType, Record
from config import settings
import uvicorn

client = MongoClient(f"{settings.DB_URL}")
worker_manager = WorkersManager()
app = FastAPI()
db = client['dev']


@app.get("/", response_model=list[UserModel])
def root():
    return list(db['user'].find({}))


@app.post("/order")
async def say_hello(order: Order):
    order = jsonable_encoder(order)
    print(order)
    await worker_manager.send_to_user("hello", json.dumps(order))
    return "sent"


@app.websocket("/work/{worker_id}")
async def socket_test(websocket: WebSocket, worker_id: str):
    await worker_manager.connect(websocket, worker_id)
    try:
        while True:
            response = await websocket.receive_json()
            if response["type"] == RecordItemType.finished_task:
                finish_record(response["content"])
            elif response["type"] == RecordItemType.defect:
                handle_defect(response["content"])
            elif response["type"] == RecordItemType.taken_product:
                taken_product(response["content"])
    except WebSocketDisconnect:
        print("Connection closed")


def finish_record(record: Record):
    print(record)
    db.records
    pass


def handle_defect(record: Record):
    pass


def taken_product(record: Record):
    pass


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        reload=settings.DEBUG_MODE,
        port=settings.PORT,
    )
