import asyncio
import json

import websockets
import ssl


async def test_receving_instruction():
    async with websockets.connect("ws://localhost:8000/user/1") as websocket:
        while True:
            res = await websocket.recv()
            print(res)

async def test_finishing_task():
    async with websockets.connect("ws://localhost:8000/user/1") as websocket:
        await websocket.send(json.dumps({
            "type": "finished_task",
            "record_id": "643b7b9876bf74f2f9fcd8a7"
        }))



asyncio.get_event_loop().run_until_complete(test_receving_instruction())
asyncio.get_event_loop().run_forever()
