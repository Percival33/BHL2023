import json

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from beans import user_manager, defect_connector, item_connector, dashboard_manager
from models import RecordItemResponseType, Defect, DefectType
from datetime import datetime

router = APIRouter()


@router.websocket("/{user_id}")
async def socket_test(websocket: WebSocket, user_id: str):
    await user_manager.connect(websocket, user_id)
    try:
        while True:
            response = await websocket.receive_json()
            msg = handle_response(response, user_id)
            await dashboard_manager.broadcast(msg)
    except WebSocketDisconnect:
        print("Connection closed")


def handle_response(response, user_id):
    if response["type"] == RecordItemResponseType.DEFECT:
        defect = Defect(
            item_id=response["item_id"],
            comment=response["content"],
            date=str(datetime.timestamp(datetime.now())),
            worker_id=user_id,
            state=DefectType.REPORTED
        )
        defect_connector.report_defect(defect)
        return defect.json()
    elif response["type"] == RecordItemResponseType.SCANNED_ITEM:
        item_connector.scan_item(item_id=response["item_id"])
        return ""
    return ""


@router.websocket("/dashboard/{dashboard_id}")
async def register_dashboard(websocket: WebSocket, dashboard_id):
    await dashboard_manager.connect(websocket, dashboard_id)
    try:
        while True:
            res = await websocket.receive()
    except WebSocketDisconnect:
        print("Connection closed")
