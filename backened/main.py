import json

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.encoders import jsonable_encoder
from pymongo.mongo_client import MongoClient
from time import sleep
from Managers import WorkersManager

from models import UserModel, Order
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
            await websocket.receive()
    except WebSocketDisconnect:
        print("Connection closed")


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        reload=settings.DEBUG_MODE,
        port=settings.PORT,
    )
