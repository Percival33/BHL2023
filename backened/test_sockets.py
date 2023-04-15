import asyncio
import websockets

async def test():
    async with websockets.connect("ws://localhost:8080/work/hello") as websocket:
        while True:
            response = await websocket.recv()
            print(response)

asyncio.get_event_loop().run_until_complete(test())
asyncio.get_event_loop().run_forever()