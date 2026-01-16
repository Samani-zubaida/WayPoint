import fetch from "node-fetch";
import Conversation from "../../models/AiChat/Conversation.js";
import { marked } from "marked";
import { formatContent } from "../../utils/formatContent.js";

/**
 * Gemini free-tier friendly rate limit
 * 1 request every 1.5 seconds
 */
let lastGeminiCallTime = 0;
const GEMINI_MIN_DELAY = 1500;

function canCallGemini() {
  const now = Date.now();
  if (now - lastGeminiCallTime < GEMINI_MIN_DELAY) return false;
  lastGeminiCallTime = now;
  return true;
}

// 🔹 helper to remove HTML before sending to Gemini
function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "");
}

export const chatWithAI = async (req, res) => {
  const { userId, message, conversationId } = req.body;

  if (!userId || !message?.trim()) {
    return res.status(400).json({ error: "Invalid input" });
  }

  try {
    /* 1️⃣ Find or create conversation */
    let conversation = conversationId
      ? await Conversation.findById(conversationId)
      : null;

    if (!conversation) {
      conversation = await Conversation.create({
        userId,
        messages: [],
      });
    }

    /* 2️⃣ Save USER message */
    conversation.messages.push({
      sender: "user",
      content: formatContent(message),
    });

    /* 3️⃣ Rate limit */
    if (!canCallGemini()) {
      await conversation.save();
      return res.json({
        reply: "<b>Please wait before sending another message.</b>",
        conversationId: conversation._id,
      });
    }

    /* 4️⃣ Build Gemini context */
    const contents = conversation.messages
      .slice(-6)
      .filter((m) => m.sender === "bot")
      .map((m) => ({
        role: "model",
        parts: [{ text: stripHtml(m.content) }],
      }));

    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    /* 5️⃣ Gemini API call */
    const apiKey = process.env.GEMINI_API_KEY;
    const model = "models/gemini-2.5-flash";


    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", errorText);

      await conversation.save();
      return res.json({
        reply: "<b>AI error. Please try again.</b>",
        conversationId: conversation._id,
      });
    }

    const data = await response.json();

    const rawText =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI.";

    const formattedReply = marked.parse(rawText);

    const summaryPrompt = `Summarize the following messege in few words :\n\n${message}`;

    const summaryResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1/${model}:generateContent?key=${apiKey}`,
      {method:"Post",
       headers : {"Content-Type":"application/json"},
       body : JSON.stringify({
        contents:[
          {role : "user", parts : [{text : summaryPrompt}],
        },
        ],
       }),
      }
    )

    const summaryData = await summaryResponse.json();
    const summaryText =
      summaryData?.candidates?.[0]?.content?.parts?.[0]?.text || "";


    /* 6️⃣ Save BOT message */
    conversation.messages.push({
      sender: "bot",
      content: formattedReply,
    });

    await conversation.save();

    /* 7️⃣ Send response */
    return res.json({
      reply: formattedReply,
      summary : summaryText,
      conversationId: conversation._id,
    });
  } catch (err) {
    console.error("chatWithAI error:", err);
    return res.status(500).json({ error: "Server error" });
  }
};
