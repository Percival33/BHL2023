import json
from fastapi import FastAPI

from connectors.ABCConnector import DatabaseConnector
from routers.defect_router import router as defect_router
from routers.order_router import router as order_router
from routers.user_router import router as user_router
from fastapi import FastAPI
from config import settings
import uvicorn


db_connector = DatabaseConnector(settings.DB_URL)
app = FastAPI()
app.include_router(order_router, prefix="/order", tags=['order'])
app.include_router(defect_router, prefix="/defect", tags=['defect'])
app.include_router(user_router, prefix="/user", tags=['user'])

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        reload=settings.DEBUG_MODE,
        port=settings.PORT,
    )
