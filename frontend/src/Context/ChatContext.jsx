import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./authContext.jsx";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { authUser } = useContext(AuthContext);
  const userId = authUser?._id;

  const [newChat, setNewChat] = useState(false);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);

  // ✅ conversation history list
  const [conversations, setConversations] = useState([]);

  /* --------------------------------------------------
     FETCH ALL CONVERSATIONS (HISTORY)
  -------------------------------------------------- */
  useEffect(() => {
    if (!userId) return;

    const fetchConversations = async () => {
      try {
        const res = await axios.get(`/api/conversations/user/${userId}`);
        console.log(res);
        setConversations(Array.isArray(res.data) ? res.data : []);
      } catch (err) {
        console.error("Fetch conversations error:", err);
        setConversations([]);
      }
    };

    fetchConversations();
  }, [userId]);

  /* --------------------------------------------------
     CREATE NEW CONVERSATION
  -------------------------------------------------- */
  useEffect(() => {
    if (!newChat || !userId) return;

    const createNewChat = async () => {
      try {
        const res = await axios.post("/api/conversations", { userId });
        console.log("res =",res);

        setConversationId(res.data._id);
        setMessages([]);
        setConversations((prev) => [res.data, ...prev]);
        setNewChat(false);
      } catch (err) {
        console.error("Create conversation error:", err);
      }
    };

    createNewChat();
  }, [newChat, userId]);

  /* --------------------------------------------------
     LOAD ONE CONVERSATION (MESSAGES)
  -------------------------------------------------- */
  const loadConversation = async (convId) => {
    try {
      const res = await axios.get(`/api/conversations/chat/${convId}`);

      setConversationId(convId);
      setMessages(res.data?.messages || []);
    } catch (err) {
      console.error("Load conversation error:", err);
      setMessages([]);
    }
  };

  /* --------------------------------------------------
     SEND MESSAGE TO AI
  -------------------------------------------------- */
  const sendToAI = async (text) => {
    const res = await axios.post("/api/chat/ai", {
      userId,
      message: text,
      conversationId,
    });
   
    setConversationId(res.data.conversationId);
    console.log(res.data);
    return res.data.reply;
  };

  /* --------------------------------------------------
     SEND MESSAGE (USER + BOT)
  -------------------------------------------------- */
  const sendMessage = async (text) => {
  if (!text.trim()) return;

  setSending(true);

  setMessages((prev) => [
    ...prev,
    { sender: "user", content: text },
  ]);

  try {
    const aiReply = await sendToAI(text);

    setMessages((prev) => [
      ...prev,
      { sender: "bot", content: aiReply || "No reply from AI" },
    ]);
  } catch (error) {
    console.error("AI Error:", error);
    setMessages((prev) => [
      ...prev,
      { sender: "bot", content: "⚠️ AI error. Try again." },
    ]);
  } finally {
    setSending(false);
  }
};


  return (
    <ChatContext.Provider
      value={{
        messages,
        sendMessage,
        sending,

        newChat,
        setNewChat,

        conversationId,
        setConversationId,

        conversations,
        loadConversation,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
