from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pymongo.mongo_client import MongoClient
from time import sleep

from models import UserModel
from config import settings
import uvicorn

client = MongoClient(f"{settings.DB_URL}/{settings.DB_NAME}")
app = FastAPI()
db = client['dev']

@app.get("/", response_model=list[UserModel])
def root():
    return list(db['user'].find({}))


@app.get("/hello/{name}")
def say_hello(name: str):
    return ""


@app.websocket("/")
async def socket_test(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            await websocket.send_text("hello")
    except WebSocketDisconnect:
        print("Connection closed")


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        reload=settings.DEBUG_MODE,
        port=settings.PORT,
    )
