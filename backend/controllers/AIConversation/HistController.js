import Conversation from "../../models/AiChat/Conversation.js";

export const createConversation = async (req, res) => {
  try {
    const { userId } = req.body;

    const conversation = await Conversation.create({
      userId,
      messages: [],
    });

    return res.status(201).json({
      conversationId: conversation._id, // 👈 explicitly sending it
      conversation,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUserConversations = async (req, res) => {
  try {
    const { userId } = req.params;

    const conversations = await Conversation
      .find({ userId })
      .sort({ createdAt: -1 });

    return res.status(200).json(conversations);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getConversationById = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const conversation = await Conversation.findById(conversationId);

    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({ error: "Failed to load conversation" });
  }
};
