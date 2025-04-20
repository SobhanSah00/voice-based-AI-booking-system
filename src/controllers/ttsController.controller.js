import axios from "axios"
import fs from "fs"
import FormData from "form-data"
import { ApiResponse } from "../utils/ApiResponse.js"
import { ApiError } from "../utils/ApiError.js"
import { asyncHandler } from "../utils/asyncHandeler.js"

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_VOICE_ID = process.env.ELEVENLABS_VOICE_ID;

export const generateSpeech = asyncHandler(async (text) => {
    try {
        if (!text) {
            throw new ApiError("Text is required", 400);
        }
        const formData = new FormData();
        formData.append("text", text);
        formData.append("model_id", "eleven_monolingual_v1"); // Default model
    
        const response = await axios.post(
            `https://api.elevenlabs.io/v1/text-to-speech/${ELEVENLABS_VOICE_ID}`,
            formData,
            {
                headers: {
                    "Content-Type": "application/json",
                    "xi-api-key": ELEVENLABS_API_KEY,
                },
                responseType: "arraybuffer", // Get audio file as buffer
            }
        );
    
        const audioPath = `./public/audio/output.mp3`;
        fs.writeFileSync(audioPath, response.data);
        return new ApiResponse(audioPath, "Audio file generated successfully");
    
    } catch (error) {
        console.error("❌ ElevenLabs TTS Error:", error);
        throw new ApiError(500, "Failed to generate speech");
    }

})