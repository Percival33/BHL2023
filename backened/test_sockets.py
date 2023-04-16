import asyncio
import json
import threading

import websockets
import ssl
from websockets.sync.client import connect


async def test_finished_task():
    async with websockets.connect("ws://localhost:8000/user/adam-nowak") as websocket:
        await websocket.send(json.dumps({
            "type": "finished_task",
            "content": {
                "items": [
                    "643ab0ff4b42ff95f745ba2a",
                    "643ab10f4b42ff95f745ba2b"
                ],
                "date_order": "2008-09-15T15:53:00+05:00"
            }
        }))


async def test_taken_product():
    async with websockets.connect("ws://localhost:8000/user/adam-nowak") as websocket:
        await websocket.send(json.dumps({
            "type": "taken_product",
            "content": {
                "items": [
                    "643ab0ff4b42ff95f745ba2a",
                    "643ab10f4b42ff95f745ba2b"
                ],
                "date_order": "2008-09-15T15:53:00+05:00"
            }
        }))


def test_defect(w):
    # print("test_defect")
    while True:
        w.send(json.dumps({
            "type": "defect",
            "item_id": "643ab0ff4b42ff95f745ba2a",
            "content": "broken cardboard"
        }))
        res = w.recv()


def resolve_defect(w):
    while True:
        w.send(json.dumps({
            "type": "resolved",
            "item_id": "643ab0ff4b42ff95f745ba2a",
        }))
        res = w.recv()


def test_register_dashboard(w):
    while True:
        res = w.recv()
        print(json.loads(res))


def test_register_dashboard2(w):
    while True:
        res = w.recv()
        print(json.loads(res))


def communicate(w1, w2, w3):
    t1 = threading.Thread(target=test_register_dashboard2, args=(w1,))
    t2 = threading.Thread(target=test_register_dashboard, args=(w2,))
    t3 = threading.Thread(target=test_defect, args=(w3,))
    t1.start()
    t2.start()
    t3.start()

    t1.join()
    t2.join()
    t3.join()


if __name__ == "__main__":
    with connect("ws://localhost:8000/user/dashboard/1") as websocket1:
        with connect("ws://localhost:8000/user/dashboard/2") as websocket2:
            with connect("ws://localhost:8000/user/adam-nowak") as websocket3:
                communicate(websocket1, websocket2, websocket3)

#     with connect("ws://localhost:8000/user/dashboard/1") as websocket1:
#         with connect("ws://localhost:8000/user/dashboard/2") as websocket2:
#             communicate(websocket1, websocket2, websocket2)
#
# asyncio.get_event_loop().run_until_complete(test_finished_task())
# asyncio.get_event_loop().run_until_complete(communicate())
# asyncio.get_event_loop().run_until_complete(test_register_dashboard2())

# asyncio.get_event_loop().run_until_complete(test_taken_product())