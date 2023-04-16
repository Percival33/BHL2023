from fastapi import APIRouter
from beans import defect_connector

router = APIRouter()


@router.get("/")
async def get_all_defects():
    return defect_connector.get_all()
