import express from "express";
import {
  createPost,
  deletePost,
  getAllPost,
  getPostById,
  getSinglePost,
  toggleLikePost,
  updatePost,
} from "../controllers/postControllers.js";
import { protectRoute } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// create post
router.post(
  "/upload",
  protectRoute,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  createPost
);

// get all posts
router.get("/all", getAllPost);

// get posts by user
router.get("/user/:userId", protectRoute, getPostById);

// get single post
router.get("/post/:postId", getSinglePost);

// delete post
router.delete("/:postId", protectRoute, deletePost);

// update post
router.put(
  "/:id",
  protectRoute,
  upload.fields([
    { name: "image", maxCount: 1 },
    { name: "video", maxCount: 1 },
  ]),
  updatePost
);

// ❤️ LIKE / UNLIKE POST  ✅ FIXED
router.put("/:id/like", protectRoute, toggleLikePost);

export default router;
