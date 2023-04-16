import json

from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from beans import (
    user_manager,
    defect_connector,
    record_connector,
    item_connector,
    product_connector,
    dashboard_manager,
    user_connector,
    path_manager
)
from models import RecordItemResponseType, Defect, DefectType, RecordResponseType, RecordState
from datetime import datetime

router = APIRouter()


@router.websocket("/{user_id}")
async def user_endpoint(websocket: WebSocket, user_id: str):
    await user_manager.connect(websocket, user_id)
    user = user_connector.get_user_by_username(user_id)
    if user is None:
        user_manager.disconnect(user_id)
        await websocket.close()
        return
    try:
        user_connector.change_user_state(user, False)
        while True:
            response = await websocket.receive_json()
            if response['type'] == RecordItemResponseType.SCANNED_ITEM:
                handle_scanned_item(response)
            elif response['type'] == RecordItemResponseType.DEFECT:
                msg = handle_defect(response, user_id)
                await dashboard_manager.broadcast(msg)
            elif response['type'] == RecordResponseType.FINISHED_TASK:
                handle_task_finished(response, user_id)
    except WebSocketDisconnect:
        user_connector.change_user_state(user, True)
        user_manager.disconnect(user_id)
        print("Connection closed")


@router.get("/orphant/{user_id}")
def get_orphant_record(user_id: str):
    orphant = record_connector.get_orphant_record(user_id)
    print(orphant)
    orphant.pop('_id')
    return orphant


@router.get("/")
def get_all_users():
    return user_connector.get_all_users()


def handle_defect(response, user_id):
    defect = Defect(
        item_id=response["item_id"],
        comment=response["content"],
        date=datetime.now().isoformat(),
        worker_id=user_id,
        state=DefectType.REPORTED
    )
    return defect_connector.report_defect(defect)


def handle_task_finished(response, user_id):
    record_connector.change_record_state(response['record_id'], RecordState.COMPLETED)
    user = user_connector.get_user_by_username(user_id)
    user_connector.append_record(user_id, response['record_id'])
    user_connector.change_user_state(user, False)


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
