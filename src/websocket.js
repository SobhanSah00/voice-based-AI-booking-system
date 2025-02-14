import { WebSocketServer } from "ws"
import dotenv from "dotenv"
import axios from "axios";
import {saveConversation} from "./controllers/conversationController.controller.js"

dotenv.config(
    {
        path: './.env'
    }
);

//create a websocket server
const websocketserver = new WebSocketServer({port : process.env.WEBSOCKET_PORT || 5050})

websocketserver.on("connection",(ws) => {
    console.log("✅ New WebSocket connection established");
    // Handle incoming messages
    ws.on("message", (message) => {
        console.log(`📩 Received message :  ${message}`);

        // Example: Echo back the message for testing
        ws.send(`🗣️ Echo: ${message}`);
    })

    ws.on("message", async (message) => {
        const userText = message.toString();
        console.log(`📩 Received message: ${userText}`);
        
        try {
            // Send transcribed text to GPT-4 for AI response
            const aiResponse = await axios.post(`${process.env.SERVER_URL}/api/v1/gpt/chat`, { text: userText });

            const aiText = aiResponse.data.response
            // Send AI response to client in real-time
            ws.send(aiText);
            await saveConversation(userText,aiText)
        } catch (error) {
            console.error("❌ Error processing AI response:", error);
            ws.send("Sorry, an error occurred.");
        }
    })

    ws.on("close",() => {
        console.log("❌ WebSocket connection closed");
    })
})

console.log(`🚀 WebSocket server running on ws://localhost:${process.env.WEBSOCKET_PORT || 5050}`)

export {
    websocketserver
}