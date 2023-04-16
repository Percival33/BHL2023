import json

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from beans import (
    user_manager,
    defect_connector,
    item_connector,
    product_connector,
    dashboard_manager,
    user_connector
)
from models import RecordItemResponseType, Defect, DefectType
from datetime import datetime

router = APIRouter()


@router.websocket("/{user_id}")
async def user_endpoint(websocket: WebSocket, user_id: str):
    await user_manager.connect(websocket, user_id)
    try:
        while True:
            response = await websocket.receive_json()
            if response['type'] == RecordItemResponseType.SCANNED_ITEM:
                handle_scanned_item(response)
            elif response['type'] == RecordItemResponseType.DEFECT:
                msg = handle_defect(response, user_id)
                await dashboard_manager.broadcast(msg)
    except WebSocketDisconnect:
        print("Connection closed")


@router.get("/")
def get_all_users():
    return user_connector.get_all_users()


def handle_defect(response, user_id):
    defect = Defect(
        item_id=response["item_id"],
        comment=response["content"],
        date=str(datetime.timestamp(datetime.now())),
        worker_id=user_id,
        state=DefectType.REPORTED
    )
    return defect_connector.report_defect(defect)


def handle_scanned_item(response):
    # TODO: validate product_id
    handle_item_collection(response)


def handle_item_collection(response):
    item_connector.collect_item(response['item_id'])
    product_connector.decrement_count(response['product_id'])


@router.websocket("/dashboard/{dashboard_id}")
async def register_dashboard(websocket: WebSocket, dashboard_id):
    await dashboard_manager.connect(websocket, dashboard_id)
    try:
        while True:
            res = await websocket.receive()
            print(res)
            if res["type"] == DefectType.RESOLVED:
                raise NotImplementedError("implement after frontend dashboard changes")
                # defect = defect_connector.get_one(res["_id"])
                # defect_connector.resolve_defect(defect)

    except WebSocketDisconnect:
        print("Connection closed")
