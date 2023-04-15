import json

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from beans import user_manager, defect_connector, item_connector
from models import RecordItemResponseType, Defect
from datetime import datetime

router = APIRouter()


@router.websocket("/{user_id}")
async def socket_test(websocket: WebSocket, user_id: str):
    await user_manager.connect(websocket, user_id)
    try:
        while True:
            response = await websocket.receive_json()
            msg = handle_response(response, user_id)
            await websocket.send_json(json.dumps(str(msg)))
    except WebSocketDisconnect:
        print("Connection closed")


def handle_response(response, user_id):
    if response["type"] == RecordItemResponseType.DEFECT:
        defect = Defect(
            item_id=response["item_id"],
            comment=response["content"],
            date=str(datetime.timestamp(datetime.now())),
            worker_id=user_id
        )
        # defect_connector.report_defect(defect)
        print(defect)
        return defect
    elif response["type"] == RecordItemResponseType.SCANNED_ITEM:
        item_connector.scan_item(item_id=response["item_id"])
# @router.websocket("/dashboard")
# async def socket_test(websocket: WebSocket):
#     await dashboard_manager.connect(websocket, user_id)
#     try:
#         while True:
#             response = await websocket.receive_json()
#     except WebSocketDisconnect:
#         print("Connection closed")
