"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendNotificationToUser = exports.webSocketConnect = void 0;
const ws_1 = __importDefault(require("ws"));
const server_1 = __importDefault(require("./server"));
const jwt_1 = require("./utils/jwt");
const webSocketConnectionManager_1 = __importDefault(require("./utils/webSocketConnectionManager"));
// WebSocket server setup
const wss = new ws_1.default.Server({ server: server_1.default });
const webSocketConnect = () => {
    wss.on('connection', (ws, req) => {
        var _a, _b;
        console.log('WebSocket client connected');
        // Extract token from query string
        const token = (_b = (_a = req.url) === null || _a === void 0 ? void 0 : _a.split('?')[1]) === null || _b === void 0 ? void 0 : _b.split('=')[1];
        if (!token) {
            ws.close(1008, 'Token not provided');
            return;
        }
        try {
            // Verify JWT token
            const decodedToken = (0, jwt_1.verifyToken)(token);
            if (!decodedToken) {
                throw new Error('Token Verification Failed');
            }
            const userId = decodedToken.userId;
            // Associate WebSocket connection with user ID
            webSocketConnectionManager_1.default.addConnection(userId, ws);
        }
        catch (error) {
            console.error(error);
            ws.close(1008, 'Authentication failed');
        }
    });
};
exports.webSocketConnect = webSocketConnect;
// Function to send notifications to a specific user
const sendNotificationToUser = (userId, payload) => {
    let client = webSocketConnectionManager_1.default.getConnection(userId);
    if (client && client.readyState === ws_1.default.OPEN)
        client.send(JSON.stringify(payload));
};
exports.sendNotificationToUser = sendNotificationToUser;
