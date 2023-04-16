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
            if response['type'] == RecordItemResponseType.SCANNED_ITEM:
                handle_scanned_item(response)
            elif response['type'] == RecordItemResponseType.DEFECT:
                msg = handle_defect(response, user_id)
                await websocket.send_json(json.dumps(str(msg)))
    except WebSocketDisconnect:
        print("Connection closed")


def handle_defect(response, user_id):
    defect = Defect(
        item_id=response["item_id"],
        comment=response["content"],
        date=str(datetime.timestamp(datetime.now())),
        worker_id=user_id
    )
    # defect_connector.report_defect(defect)
    print(defect)
    return defect


def handle_scanned_item(response):
    # TODO: validate product_id
    handle_item_collection(response)


def handle_item_collection(response):
    item_connector.collect_item(response['item_id'])
    product_connector.decrement_count(response['product_id'])
