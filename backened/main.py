import json

from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.encoders import jsonable_encoder
from pymongo.mongo_client import MongoClient
from time import sleep
from Managers import WorkersManager
from db_connector import DatabaseConnector

from models import Order, User
from config import settings
import uvicorn

from record_algorithm import RecordsManager

worker_manager = WorkersManager()

db_connector = DatabaseConnector(settings.DB_URL)
records_manager = RecordsManager(db_connector)
app = FastAPI()


@app.get("/", response_model=list[User])
def root():
    return db_connector.get_free_users()


@app.post("/order")
async def collect_order(order: Order):
    order = jsonable_encoder(order)
    records_manager.create_record(order)
    # await worker_manager.send_to_user("hello", json.dumps(order))
    return ""


@app.websocket("/work/{username}")
async def socket_test(websocket: WebSocket, username: str):
    await worker_manager.connect(websocket, username)
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
