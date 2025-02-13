import {Router} from "express"
import { upload } from "../middlewares/multer.middleware.js"
import { transcribeAudio } from "../controllers/whisper.controller.js"

const router = Router();

router.post("/transcribe", upload.single("audio"), transcribeAudio);

export default router;