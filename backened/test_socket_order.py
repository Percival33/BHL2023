import asyncio
import json

import websockets
import ssl


async def test_receving_instruction():
    async with websockets.connect("ws://localhost:8000/user/1") as websocket:
        while True:
            res = await websocket.recv()
            print(res)



asyncio.get_event_loop().run_until_complete(test_receving_instruction())
asyncio.get_event_loop().run_forever()
