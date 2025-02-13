import fs from "fs"
import { OpenAI } from "openai"
import {asyncHandler} from "../utils/asyncHandeler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
})

export const transcribeAudio = asyncHandler(async (req,res) => {
    try {
        if (!req.file) {
            return new ApiResponse(400, "No file provided")
        }
        const audioPath = req.file.path;

        // transcribing using whishper api
        const response = await openai.audio.transcriptions.create({
            file : fs.createReadStream(audioPath),
            model : "whisper-1",
            language : "en",
        });
        fs.unlinkSync(audioPath);

        return res.status(200).json(new ApiResponse({text : response.text}))
    }
    catch (error) {
        console.error("❌ Whisper API Error:", error);
        return res.status(500).json(new ApiError(500, {error : "failed to transcribe the audio"}))
    }
})