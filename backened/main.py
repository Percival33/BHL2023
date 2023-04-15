from fastapi import FastAPI
from pymongo.mongo_client import MongoClient

client = MongoClient("mongodb+srv://bhl:<password>@cluster0.eyuhfo8.mongodb.net/?retryWrites=true&w=majority")
app = FastAPI()


@app.get("/")
def root():
    return {"message": "Hello World"}


@app.get("/hello/{name}")
def say_hello(name: str):
    return {"message": f"Hello {name}"}
