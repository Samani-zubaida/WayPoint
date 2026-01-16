import express from "express";
import {
  createConversation,
  getUserConversations,
  getConversationById,   // 👈 ADD THIS
} from "../controllers/AIConversation/HistController.js";

const router = express.Router();

// create new conversation
router.post("/", createConversation);

// sidebar history (list)
router.get("/user/:userId", getUserConversations);

// chat messages (single conversation)
router.get("/chat/:conversationId", getConversationById);

export default router;
