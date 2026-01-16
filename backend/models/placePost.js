import mongoose from "mongoose";

const placePostSchema = new mongoose.Schema(
    {
        imageUrl: {
            type: String,
            required: true,
        },

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
            index: true, // critical for fast lookup
        },

        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.model("PlacePost", placePostSchema);
