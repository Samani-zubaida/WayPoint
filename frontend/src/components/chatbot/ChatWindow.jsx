import { useState } from "react";
import { useChat } from "../../Context/ChatContext.jsx";

const ChatWindow = ({ showSidebar, isMin, setShowSidebar, setLoading, loading }) => {
  const { messages, sendMessage, sending } = useChat();
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    sendMessage(input);
    setInput("");
  };

  const BotLoader = () => (
    <div className="flex gap-1 px-4 py-2 bg-white border border-gray-200 rounded-2xl shadow-sm">
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.15s]" />
      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:0.3s]" />
    </div>
  );

  return (
    <div className="flex-1 flex flex-col min-w-0 h-[calc(100vh-70px)] bg-gray-50">

      {/* Small Header */}
      <div className="w-full flex justify-end pr-6 pt-3 select-none">
        <span className="text-[11px] md:text-xs text-gray-400 font-medium tracking-wider">
          Personal AI Assistant
        </span>
      </div>

      {/* Messages Area */}
      <div
        className="
        flex-1
        overflow-y-auto
        flex
        flex-col
        gap-5
        px-4 md:px-10
        py-6
        scroll-smooth
        "
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-4 py-3 max-w-[78%] text-sm md:text-[15px] rounded-2xl shadow-md break-words ${
              msg.sender === "bot"
                ? "self-start bg-white border border-gray-200 text-gray-700"
                : "self-end bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
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

        {/* BOT LOADER */}
        {loading && (
          <div className="self-start">
            <BotLoader />
          </div>
        )}
      </div>

      {/* Input Section */}
      <div className="w-full px-4 md:px-10 pb-6">

        <div
          className="
          flex items-center gap-3
          bg-white
          border border-gray-200
          rounded-full
          shadow-xl
          px-5 py-3
          max-w-4xl
          mx-auto
          transition
          "
        >
          <input
            type="text"
            className="
            flex-1
            bg-transparent
            outline-none
            text-sm md:text-[15px]
            placeholder-gray-400
            font-medium
            "
            placeholder="Ask anything about travel, places, or destinations..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !sending) handleSend();
            }}
          />

          <button
            onClick={handleSend}
            disabled={sending}
            className="
            px-5 py-2
            rounded-full
            text-white
            text-sm font-medium
            bg-gradient-to-r from-indigo-600 to-purple-700
            hover:scale-105
            active:scale-95
            transition-all duration-200
            shadow-lg
            disabled:opacity-50
            "
          >
            {sending ? "..." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;