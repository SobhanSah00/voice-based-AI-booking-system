import Conversation from "../models/Conversation.models.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandeler.js";

export const saveConversation = asyncHandler(async (userSpeech, aiResponse) => {
    try {
        const conversation = new Conversation({ userSpeech, aiResponse });
        await conversation.save();
        console.log("✅ Conversation saved to database.");
    } catch (error) {
        console.error("❌ Error saving conversation:", error);
    }
});
