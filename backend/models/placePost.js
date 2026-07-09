import mongoose from "mongoose";
import { CATEGORIES } from "../utils/categories.js";

const placePostSchema = new mongoose.Schema(
  {
    images: [
      {
        type: String,
        required: true,
      },
    ],

    lat: {
      type: Number,
      required: true,
    },

    lng: {
      type: Number,
      required: true,
    },

    placeId: {
      type: String,
      required: true,
      index: true,
    },

    category: {
      type: String,
      enum: CATEGORIES,
      default: "Other",
      required: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("PlacePost", placePostSchema);