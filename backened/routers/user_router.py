import json

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from beans import user_manager, defect_connector, item_connector, product_connector
from models import RecordItemResponseType, Defect
from datetime import datetime

router = APIRouter()


@router.websocket("/{user_id}")
async def user_endpoint(websocket: WebSocket, user_id: str):
    await user_manager.connect(websocket, user_id)
    try:
        while True:
            response = await websocket.receive_json()
            print(response)
            # if response["type"] == RecordItemType.finished_task:
            #     finish_record(response["content"])
            # elif response["type"] == RecordItemType.defect:
            #     handle_defect(response["content"])
            # elif response["type"] == RecordItemType.taken_product:
            #     taken_product(response["content"])
    except WebSocketDisconnect:
        print("Connection closed")


def handle_defect(response, user_id):
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


def handle_item_collection(response):
    item_connector.reserve_item(response['item_id'])
    product_connector.decrement_count(response['product_id'])
