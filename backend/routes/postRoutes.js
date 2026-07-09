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

router.post(
  "/upload",
  protectRoute,
  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  createPost
);

router.get("/all", getAllPost);

router.get(
  "/user/:userId",
  protectRoute,
  getPostById
);

router.get(
  "/post/:postId",
  getSinglePost
);

router.delete(
  "/:postId",
  protectRoute,
  deletePost
);

router.put(
  "/:id",
  protectRoute,
  upload.fields([
    {
      name: "images",
      maxCount: 10,
    },
    {
      name: "video",
      maxCount: 1,
    },
  ]),
  updatePost
);

router.put(
  "/:id/like",
  protectRoute,
  toggleLikePost
);

export default router;