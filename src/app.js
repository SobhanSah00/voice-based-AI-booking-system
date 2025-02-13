import express from "express"
import cors from "cors"

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))
app.use(express.json());

app.get("/", (req,res) => {
    res.send("Hello World!")
})

import WhisperRouter from "./routes/whisper.routes";

app.use("/api/v1/whishper",WhisperRouter)

export {
    app
}