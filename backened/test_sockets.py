import asyncio

import json

import websockets
import ssl


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


async def test_defect():
    async with websockets.connect("ws://localhost:8000/user/adam-nowak") as websocket:
        await websocket.send(json.dumps({
            "type": "defect",
            "item_id": "643ab0ff4b42ff95f745ba2a",
            "content": "broken cardboard"
        }))


# asyncio.get_event_loop().run_until_complete(test_finished_task())
asyncio.get_event_loop().run_until_complete(test_defect())
# asyncio.get_event_loop().run_until_complete(test_taken_product())
asyncio.get_event_loop().run_forever()

