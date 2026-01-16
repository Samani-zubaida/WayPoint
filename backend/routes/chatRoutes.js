import express from "express";
import { chatWithAI } from "../controllers/AIConversation/chatController.js";

const router = express.Router();

router.post("/ai", chatWithAI);

export default router;

