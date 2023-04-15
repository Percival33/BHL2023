from fastapi import FastAPI
from pymongo.mongo_client import MongoClient

from .models import UserModel
from .config import settings
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


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        reload=settings.DEBUG_MODE,
        port=settings.PORT,
    )
