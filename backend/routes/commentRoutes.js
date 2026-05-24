import express from "express";
import { addComment, deleteComment } from "../controllers/commentController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

// add comment
router.post("/:postId", protectRoute, addComment);

// delete comment
router.delete("/:commentId", protectRoute, deleteComment);

export default router;
