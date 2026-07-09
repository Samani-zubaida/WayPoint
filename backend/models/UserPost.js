import mongoose from "mongoose";
import { CATEGORIES } from "../utils/categories.js";

const userPostSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    location: {
      lat: {
        type: Number,
        required: true,
      },
      lon: {
        type: Number,
        required: true,
      },
    },

    images: [
      {
        type: String,
      },
    ],

    video: {
      type: String,
      default: null,
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],

    category: {
      type: String,
      enum: CATEGORIES,
      default: "Other",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("UserPost", userPostSchema);