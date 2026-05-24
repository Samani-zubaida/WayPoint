import fetch from "node-fetch";
import Conversation from "../../models/AiChat/Conversation.js";
import { marked } from "marked";

let lastGeminiCallTime = 0;
const GEMINI_MIN_DELAY = 1500;

function canCallGemini() {
  const now = Date.now();
  if (now - lastGeminiCallTime < GEMINI_MIN_DELAY) {
    return false;
  }
  lastGeminiCallTime = now;
  return true;
}

async function callGeminiWithRetry(url, options, retries = 3) {
  for (let i = 0; i < retries; i++) {
    const response = await fetch(url, options);

    if (response.ok) return response;

    if (response.status === 503) {
      console.warn("Gemini 503 – retrying...");
      await new Promise((r) => setTimeout(r, 2000));
      continue;
    }

    return response;
  }

  throw new Error("Gemini unavailable after retries");
}

export const chatWithAI = async (req, res) => {
  const { userId, message, conversationId } = req.body;

  if (!message?.trim()) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    /* ------------------------------
      Find or create conversation
    ------------------------------ */
    let conversation = null;

    if (conversationId) {
      conversation = await Conversation.findOne({
        _id: conversationId,
        userId,
      });
    }

    // ✅ Create new conversation if not found
    if (!conversation) {
      conversation = await Conversation.create({
        userId,
        title: "New Chat",
        messages: [],
      });
    }

    /* ------------------------------
      Set title from first user message
    ------------------------------ */
    if (conversation.title === "New Chat") {
      const cleanTitle = message.replace(/[#*_`]/g, "").trim();
      conversation.title =
        cleanTitle.length > 50
          ? cleanTitle.slice(0, 50) + "..."
          : cleanTitle;
    }

    /* ------------------------------
      Save user message
    ------------------------------ */
    conversation.messages.push({
      sender: "user",
      content: message,
    });

    /* ------------------------------
      Rate limit protection
    ------------------------------ */
    if (!canCallGemini()) {
      await conversation.save();

      return res.json({
        reply: marked.parse(
          "**Please wait a moment** before sending another message ⏳"
        ),
        conversation,
      });
    }

    /* ------------------------------
      Gemini request
    ------------------------------ */
    const apiKey = process.env.GEMINI_API_KEY;
    const model = "models/gemini-2.5-flash";

    const systemPrompt = `
You are a helpful assistant.

Rules:
- Give detailed, well-structured answers
- Use headings, paragraphs, and bullet points
- Emphasize important words using **bold**
- Keep responses clean and readable
- Use emojis where appropriate
- If user asks about places, include its history, current condition ,people reviews
- include places manufacturer , its owner, best time to visit , famous food there
`;

    const geminiContents = [
      {
        role: "user",
        parts: [{ text: systemPrompt }],
      },
      ...conversation.messages.slice(-6).map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.content }],
      })),
    ];

    const response = await callGeminiWithRetry(
      `https://generativelanguage.googleapis.com/v1/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: geminiContents }),
      }
    );

    /* ------------------------------
      Handle Gemini errors
    ------------------------------ */
    if (!response.ok) {
      const errText = await response.text();
      console.error("Gemini error:", response.status, errText);

      await conversation.save();

      return res.json({
        reply: marked.parse(
          response.status === 429
            ? "**AI is busy.** Please try again shortly ⏳"
            : "**AI error.** Please try again later ⚠️"
        ),
        conversation,
      });
    }

    /* ------------------------------
      Parse Gemini response
    ------------------------------ */
    const data = await response.json();

    const rawText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI.";

    const formattedReply = marked.parse(rawText);

    /* ------------------------------
      Save bot reply
    ------------------------------ */
    conversation.messages.push({
      sender: "bot",
      content: formattedReply,
    });

    await conversation.save();

    /* ------------------------------
      Send response
    ------------------------------ */
    return res.json({
      reply: formattedReply,
      conversation,
    });
  } catch (error) {
    console.error("chatWithAI error:", error);
    return res.status(500).json({
      error: "Server error. Please try again later.",
    });
  }
};




