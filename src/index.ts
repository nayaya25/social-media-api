import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { webSocketConnect } from "./websocket";
import server from "./server";
dotenv.config();
const PORT = process.env.PORT || 3000;

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/social_media_api_db').then(() => {
    console.log('Connected to MongoDB');
}).catch((error: any) => {
    console.error('MongoDB connection error:', error);
});
// Start the server
const startServer = () => server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

webSocketConnect()
startServer()
