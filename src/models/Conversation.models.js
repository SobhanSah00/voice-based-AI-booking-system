import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema({
    userSpeech: String,
    aiResponse: String,
    timestamp: { type: Date, default: Date.now }
});

const Conversation = mongoose.model("Conversation", conversationSchema);
export default Conversation;
