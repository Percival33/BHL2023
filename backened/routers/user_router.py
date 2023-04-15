from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from beans import user_manager

router = APIRouter()


@router.websocket("/{username}")
async def socket_test(websocket: WebSocket, username: str):
    await user_manager.connect(websocket, username)
    try:
        while True:
            response = await websocket.receive_json()
            # if response["type"] == RecordItemType.finished_task:
            #     finish_record(response["content"])
            # elif response["type"] == RecordItemType.defect:
            #     handle_defect(response["content"])
            # elif response["type"] == RecordItemType.taken_product:
            #     taken_product(response["content"])
    except WebSocketDisconnect:
        print("Connection closed")
