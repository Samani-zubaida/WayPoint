import { createContext, useContext, useState, useEffect, useCallback } from "react";
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

  /* ======================================================
      FETCH CONVERSATIONS
  ====================================================== */

  const fetchConversations = useCallback(async () => {
    if (!userId) return;

    try {
      const res = await axios.get(`/api/conversations/user/${userId}`);

      setConversations(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Fetch conversations failed:", err);
      setConversations([]);
    }
  }, [userId]);

  useEffect(() => {
    fetchConversations();
  }, [fetchConversations]);

  /* ======================================================
      NEW CHAT
  ====================================================== */

  useEffect(() => {
    if (!newChat) return;

    setMessages([]);
    setActiveConversationId(null);

    setNewChat(false);
  }, [newChat]);

  /* ======================================================
      LOAD CONVERSATION
  ====================================================== */

  const loadConversation = async (conversationId) => {
    try {
      const res = await axios.get(
        `/api/conversations/chat/${conversationId}`
      );

      setActiveConversationId(conversationId);

      setMessages(res.data.messages || []);
    } catch (err) {
      console.error(err);
      setMessages([]);
    }
  };

  /* ======================================================
      SEND MESSAGE
  ====================================================== */

  const sendMessage = async (text) => {
    if (!text.trim()) return;
    if (!userId) return;

    setSending(true);

    try {
      let conversationId = activeConversationId;

      /* -------------------------------
            CREATE NEW CHAT
      -------------------------------- */

      if (!conversationId) {
        const convRes = await axios.post("/api/conversations", {
          userId,
        });

        conversationId = convRes.data._id;

        setActiveConversationId(conversationId);
      }

      /* -------------------------------
            OPTIMISTIC USER MESSAGE
      -------------------------------- */

      const userMessage = {
        sender: "user",
        content: text,
      };

      setMessages((prev) => [...prev, userMessage]);

      /* -------------------------------
            AI RESPONSE
      -------------------------------- */

      await axios.post("/api/chat/ai", {
        userId,
        message: text,
        conversationId,
      });

      /* -------------------------------
            RELOAD CHAT
      -------------------------------- */

      const chatRes = await axios.get(
        `/api/conversations/chat/${conversationId}`
      );

      const updatedMessages = chatRes.data.messages || [];

      setMessages(updatedMessages);

      /* -------------------------------
            REFRESH SIDEBAR
      -------------------------------- */

      await fetchConversations();
    } catch (err) {
      console.error("Send message error:", err);
    } finally {
      setSending(false);
    }
  };

  /* ======================================================
      DELETE CHAT
  ====================================================== */

  const deleteConversation = async (conversationId) => {
    try {
      await axios.delete(`/api/conversations/${conversationId}`);

      setConversations((prev) =>
        prev.filter((c) => c._id !== conversationId)
      );

      if (conversationId === activeConversationId) {
        setMessages([]);
        setActiveConversationId(null);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        sending,
        sendMessage,

        conversations,
        fetchConversations,

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