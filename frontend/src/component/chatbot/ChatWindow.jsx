import { useState } from "react";
import { useChat } from "../../Context/ChatContext.jsx";
import { Menu } from "lucide-react";

const ChatWindow = ({ showSidebar, isMin, setShowSidebar,setLoading,loading}) => {
  const { messages, sendMessage, sending } = useChat();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const BotLoader = () => (
  <div className="flex gap-1 px-4 py-2 bg-gray-100 rounded-2xl">
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]" />
    <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]" />
  </div>
);


  return (
    <div className="flex-1 flex flex-col min-w-0 h-screen transition-all duration-300 ">
      {/* Header */}
      <div className="min-w-0 pl-4 bg-gradient-to-r from-white via-gray-100 to-white shadow-2xl pb-2">
        <h1 className="text-2xl font-semibold pt-2 bg-gradient-to-r from-purple-600 to-pink-800 bg-clip-text text-transparent">
          Your Personal Travel Assistant
        </h1>
      </div>

      {/* Messages */}
      <div className="flex-1 min-w-0 overflow-y-auto flex flex-col gap-3 pt-12 p-4">
        {messages.map((msg, i) => (
  <div
    key={i}
    className={`px-4 py-2 max-w-[80%] text-sm rounded-2xl break-words ${
      msg.sender === "bot"
        ? "self-start bg-gray-100"
        : "self-end bg-blue-100"
    }`}
  >
    {msg.sender === "bot" ? (
      <div
        className="prose prose-sm max-w-none"
        dangerouslySetInnerHTML={{ __html: msg.content }}
      />
    ) : (
      msg.content
    )}
  </div>
))}

{/* 🤖 BOT LOADER (shown only while waiting) */}
{loading && (
  <div className="self-start">
    <BotLoader />
  </div>
)}

      </div>

      {/* Input */}
      <div className="p-3 bg-white flex gap-2 scroll-auto">
        <input
          type="text"
          className="flex-1 min-w-0 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !sending) handleSend();
          }}
        />
        <button
          onClick={handleSend}
          disabled={sending}
          className="shrink-0 px-5 py-2 rounded-lg text-white bg-gradient-to-r from-indigo-700 to-purple-700 hover:opacity-90 disabled:opacity-50 transition"
        >
          {sending ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
};

export default ChatWindow;
