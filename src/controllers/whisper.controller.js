import fs from "fs"
import { OpenAI } from "openai"
import {asyncHandler} from "../utils/asyncHandeler.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import axios from "axios"


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
        const userText = response.text
        fs.unlinkSync(audioPath); // deelte the temporary files

        const aiRsponce = await axios.post(`${process.env.SERVER_URL}/api/v1/gpt/chat`, {text : userText})

        return res.status(200).json(new ApiResponse({userText,aiRsponce : aiRsponce.data.response}))
    }
    catch (error) {
        console.error("❌ Whisper API Error:", error);
        return res.status(500).json(new ApiError(500, {error : "failed to transcribe the audio"}))
    }
})