import twilio from "twilio"
import {app} from "./app.js"
import dotenv from "dotenv"
import { websocketserver } from "./websocket.js";
import CallData from "./models/CallData.models.js";

dotenv.config({
    path: './.env',
})

const client = twilio(process.env.TWILIO_SID,process.env.TWILIO_AUTH_TOKEN);

// todo : handle incomming twillio calls

app.post("/voice",async (req,res) => {
    const twiml = new twilio.twiml.VoiceResponse();
    const callerId = req.body.From; //Get called number

    //create a new recodrd in mongodb for this call
    const callRecord = new CallData({
        callerId: callerId,
        conversation : ["call started"]
    })

    await callRecord.save()

    // start recording the call
    twiml.record({
        action : `${process.env.SERVER_URL}/api/v1/whishper/transcribe`,
        method : "POST",
        maxLength : 60, // this is record time
        trim : "trim-silence"
    });
    // Intorduction message
    twiml.say("Hello! I am flex your AI assistant. Let's have a conversation.")

    // connect to websocket for real-time interaction
    if (process.env.WEBSOCKET_SERVER) {
        twiml.stream({ url: process.env.WEBSOCKET_SERVER });
    } else {
        console.log("⚠️ WebSocket Server URL is missing.");
    }

    res.type("text/xml")
    res.send(twiml.toString());
})

// Endpoint to send AI-generated response as Twilio speech
app.post("/twilio-response", (req,res) => {
    const twiml = new twilio.twiml.VoiceResponse();
    const { aiResponse } = req.body;

    twiml.say(aiResponse || "I'm sorry, I didn't catch that .")

    res.type("text/xml")
    res.send(twiml.toString());
})

// Test WebSocket connection
websocketserver.on("connection", (ws) => {
    console.log("WebSocket connected in server.js");

    ws.on("message", (message) => {
        console.log(`Received: ${message}`);
        ws.send(`Server received: ${message}`);
    });
});

// wscat is a tool for connecting to and communicating with WebSocket servers (use this (npm install -g wscat))