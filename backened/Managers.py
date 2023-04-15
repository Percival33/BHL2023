from fastapi import WebSocket


class WorkersManager:
    def __init__(self):
        self.active_connections: dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, username: str):
        await websocket.accept()
        self.active_connections[username] = websocket

    def disconnect(self, username):
        self.active_connections.pop(username)

    async def send_to_user(self, username: str, message: str):
        soc = self.active_connections[username]
        await soc.send_json(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections.values():
            await connection.send_json(message)
