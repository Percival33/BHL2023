from fastapi import APIRouter

from beans import record_connector

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
