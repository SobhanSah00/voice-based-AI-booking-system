import {OpenAI} from "openai"
import { asyncHandler } from "../utils/asyncHandeler.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const generateAiResponse = asyncHandler(async(req,res) => {
    const {text} = req.body;
    if(!text) {
        return new ApiError(400, "Please provide text to generate AI response");
    }

    // send user speech to GPT-4
    const response = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [
            {
                role: "system",
                content : "You are a friendly AI assistant guiding a user through a booking process in a natural conversation."
            },
            {
                role: "user",
                content: text
            }
        ]
    });
    const aiRsponce = response.choices[0]?.message?.content || "sorry, I did not understand that ."
    return new ApiResponse(200, aiRsponce);
})