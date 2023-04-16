from fastapi import WebSocket


class DashboardManager:
    def __init__(self):
        self.active_connections: dict[str, WebSocket] = {}

    async def connect(self, websocket: WebSocket, dashboard_id: str):
        await websocket.accept()
        self.active_connections[dashboard_id] = websocket

    def disconnect(self, dashboard_id):
        self.active_connections.pop(dashboard_id)

    async def send_to_user(self, dashboard_id: str, message: str):
        soc = self.active_connections[dashboard_id]
        await soc.send_json(message)

    async def broadcast(self, message: str):
        for connection in self.active_connections.values():
            await connection.send_json(message)
