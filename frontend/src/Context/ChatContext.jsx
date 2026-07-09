import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./authContext.jsx";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const { authUser } = useContext(AuthContext);
  const userId = authUser?._id;

  const [messages, setMessages] = useState([]);
  const [sending, setSending] = useState(false);

  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);

  const [newChat, setNewChat] = useState(false);

  /* --------------------------------------------------
     FETCH ALL CONVERSATIONS
  -------------------------------------------------- */
  useEffect(() => {
    if (!userId) return;

    const fetchConversations = async () => {
      try {
        const res = await axios.get(`/api/conversations/user/${userId}`);
        setConversations(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Fetch conversations error:", error);
        setConversations([]);
      }
    };

    fetchConversations();
  }, [userId]);

  /* --------------------------------------------------
     RESET FOR NEW CHAT
  -------------------------------------------------- */
  useEffect(() => {
    if (newChat) {
      setActiveConversationId(null);
      setMessages([]);
      setNewChat(false);
    }
  }, [newChat]);

  /* --------------------------------------------------
     LOAD CONVERSATION
  -------------------------------------------------- */
  const loadConversation = async (conversationId) => {
    try {
      const res = await axios.get(
        `/api/conversations/chat/${conversationId}`
      );

      setActiveConversationId(conversationId);
      setMessages(res.data?.messages || []);
    } catch (error) {
      console.error("Load conversation error:", error);
      setMessages([]);
    }
  };

  /* --------------------------------------------------
     SEND MESSAGE
  -------------------------------------------------- */
  const sendMessage = async (text) => {
    if (!text.trim() || !userId) return;

    setSending(true);
    let conversationId = activeConversationId;

    try {
      // Create new conversation if none active
      if (!conversationId) {
        const convRes = await axios.post("/api/conversations", { userId });
        conversationId = convRes.data._id;

        setActiveConversationId(conversationId);
        setConversations((prev) => [convRes.data, ...prev]);
        setMessages([]);
      }

      // User message
      setMessages((prev) => [
        ...prev,
        { sender: "user", content: text },
      ]);

      const aiRes = await axios.post("/api/chat/ai", {
        userId,
        message: text,
        conversationId,
      });

      setMessages((prev) => [
        ...prev,
        { sender: "bot", content: aiRes.data.reply || "No reply from AI" },
      ]);
    } catch (error) {
      console.error("Send message error:", error);
    } finally {
      setSending(false);
    }
  };

  /* --------------------------------------------------
     DELETE CONVERSATION
  -------------------------------------------------- */
  const deleteConversation = async (conversationId) => {
    try {
      await axios.delete(`/api/conversations/${conversationId}`);

      setConversations((prev) =>
        prev.filter((c) => c._id !== conversationId)
      );

      if (conversationId === activeConversationId) {
        setActiveConversationId(null);
        setMessages([]);
      }
    } catch (error) {
      console.error("Delete conversation failed:", error);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sending,
        sendMessage,

        conversations,
        loadConversation,
        deleteConversation,

        activeConversationId,
        setActiveConversationId,

        newChat,
        setNewChat,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);