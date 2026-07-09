import express from "express";
import {
  createConversation,
  getUserConversations,
  getConversationById,
  deleteConversation,
} from "../controllers/AIConversation/HistController.js";

const router = express.Router();

router.post("/", createConversation);
router.get("/user/:userId", getUserConversations);
router.get("/chat/:conversationId", getConversationById);

// ✅ FIXED
router.delete("/:conversationId", deleteConversation);

export default router;
