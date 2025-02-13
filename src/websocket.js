import { WebSocketServer } from "ws"
import dotenv from "dotenv"

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

    ws.on("close",() => {
        console.log("❌ WebSocket connection closed");
    })
})

console.log(`🚀 WebSocket server running on ws://localhost:${process.env.WEBSOCKET_PORT || 5050}`)

export {
    websocketserver
}