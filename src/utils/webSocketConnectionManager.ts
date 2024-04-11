// websocketManager.ts
import WebSocket from 'ws';

interface WebSocketConnection {
    userId: string;
    ws: WebSocket;
}

class WebSocketManager {
    private connections: Map<string, WebSocket>;

    constructor() {
        this.connections = new Map();
    }

    public addConnection(userId: string, ws: WebSocket) {
        this.connections.set(userId, ws);
    }

    public removeConnection(userId: string) {
        this.connections.delete(userId);
    }

    public getConnection(userId: string) {
        return this.connections.get(userId);
    }

}

export default new WebSocketManager();
