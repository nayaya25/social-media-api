import WebSocket from 'ws';
import server from "./server";
import { verifyToken } from "./utils/jwt";
import webSocketConnectionManager from "./utils/webSocketConnectionManager";

// WebSocket server setup
const wss = new WebSocket.Server({ server });

export const webSocketConnect = () => {
    wss.on('connection', (ws: WebSocket, req) => {
        console.log('WebSocket client connected');
        // Extract token from query string
        const token = req.url?.split('?')[1]?.split('=')[1];
        if (!token) {
            ws.close(1008, 'Token not provided');
            return;
        }

        try {
            // Verify JWT token
            const decodedToken: any = verifyToken(token);
            if (!decodedToken) {
                throw new Error('Token Verification Failed');
            }
            const userId = decodedToken.user.id;

            // Associate WebSocket connection with user ID
            webSocketConnectionManager.addConnection(userId, ws);

        } catch (error) {
            console.error(error);
            ws.close(1008, 'Authentication failed');
        }
    });
}

// Function to send notifications to a specific user
export const sendNotificationToUser = (userId: string, payload: any) => {
    let client = webSocketConnectionManager.getConnection(userId);
    console.log("CLIENT", client)
    if(client && client.readyState === WebSocket.OPEN)
        client.send(JSON.stringify(payload));
}