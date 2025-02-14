import {Router} from "express"
import { generateAiResponse } from "../controllers/gptController.controller.js"

const router = Router();

router.post("/chat",generateAiResponse);

export default router;
