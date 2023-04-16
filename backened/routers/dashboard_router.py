from fastapi import APIRouter, WebSocket, WebSocketDisconnect

from beans import record_connector, dashboard_manager
from models import DefectType

router = APIRouter()


@router.get("/heatmap")
def get_heatmap_data():
    records = list(record_connector.get_all_records())
    heatmap = {}
    for record in records:
        products = record['products']
        for product in products:
            coor = (product['regal'], product['column'])
            count = heatmap.get(coor, 0)
            count += product['qty']
            heatmap[coor] = count
    return [
        {
            "regal": regal,
            "column": column,
            "qty": qty
        } for ((regal, column), qty) in heatmap.items()
    ]


@router.websocket("/{dashboard_id}")
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
