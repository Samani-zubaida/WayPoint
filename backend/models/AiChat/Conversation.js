import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
  sender: { type: String, enum: ["user", "bot"], required: true },
  content: { type: String, required: true },
});

const conversationSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  messages: [messageSchema],
});

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;
