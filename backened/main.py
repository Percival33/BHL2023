import json


from connectors.ABCConnector import DatabaseConnector
from routers.order_router import router as order_router
from routers.user_router import router as user_router

from config import settings
import uvicorn


db_connector = DatabaseConnector(settings.DB_URL)
app = FastAPI()
app.include_router(order_router, prefix="/order", tags=['order'])
app.include_router(user_router, prefix="/user", tags=['user'])

if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        reload=settings.DEBUG_MODE,
        port=settings.PORT,
    )
