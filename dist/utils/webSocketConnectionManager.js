"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class WebSocketManager {
    constructor() {
        this.connections = new Map();
    }
    addConnection(userId, ws) {
        this.connections.set(userId, ws);
    }
    removeConnection(userId) {
        this.connections.delete(userId);
    }
    getConnection(userId) {
        return this.connections.get(userId);
    }
}
exports.default = new WebSocketManager();
