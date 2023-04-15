from fastapi import FastAPI
from pymongo.mongo_client import MongoClient

from models import UserModel

client = MongoClient()
app = FastAPI()
db = client['dev']


@app.get("/", response_model=list[UserModel])
def root():
    return list(db['user'].find({}))


@app.get("/hello/{name}")
def say_hello(name: str):
    return ""
