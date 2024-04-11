"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const websocket_1 = require("./websocket");
const server_1 = __importDefault(require("./server"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
// MongoDB Connection
mongoose_1.default.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social_media_api_db').then(() => {
    console.log('Connected to MongoDB');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});
// Start the server
const startServer = () => server_1.default.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
(0, websocket_1.webSocketConnect)();
startServer();
