import { useState } from "react";
import { useChat } from "../../Context/ChatContext.jsx";
import { Plus, X, ChevronsLeft, ChevronsRight } from "lucide-react";

const SideBar = ({ showSidebar, setShowSidebar, isMin, setIsMin }) => {
  const { setNewChat, conversations, loadConversation } = useChat();
  const [activeId, setActiveId] = useState(null);

  return (
    <>
      {/* Sidebar container */}
      <div
        className={`
          bg-gradient-to-b from-white via-gray-100 to-white
          backdrop-blur-xl shadow-2xl
          flex flex-col transition-all duration-300
          ${isMin ? "w-[40px]" : "w-[260px]"}
          ${showSidebar ? "block" : "hidden md:block"}
        `}
      >
        {/* Header */}
        <div
          className={`px-2 py-4 flex ${
            isMin ? "flex-col items-center gap-2" : "items-center justify-between"
          }`}
        >
          {/* New Chat */}
          <button
            onClick={() => {
              setNewChat(true);
              setActiveId(null);
            }}
            className={`flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow transition ${
              isMin ? "p-2" : "px-3 py-2 text-sm"
            }`}
          >
            <Plus className="w-4 h-4" />
            {!isMin && <span className="text-sm">New Chat</span>}
          </button>

          {/* Close + Toggle */}
          <div className={`${isMin ? "flex-col" : "flex"} items-center gap-1`}>
            <button
              onClick={() => setIsMin(!isMin)}
              className="p-1.5 rounded-lg hover:bg-purple-100 transition"
            >
              {isMin ? (
                <ChevronsRight className="w-4 h-4 text-purple-700" />
              ) : (
                <ChevronsLeft className="w-4 h-4 text-purple-700" />
              )}
            </button>
          </div>
        </div>

        {/* Conversations */}
{!isMin && (
  <div className="flex-1 px-3 pt-2 pb-6 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-transparent hover:scrollbar-thumb-purple-400 max-h-[calc(100vh-96px)]">
    {conversations.map((conv) => {
      const isActive = activeId === conv._id;
      return (
        <div
          key={conv._id}
          onClick={() => {
            loadConversation(conv._id);
            setActiveId(conv._id);
          }}
          className={`px-3 py-2 rounded-xl cursor-pointer
                    bg-white/70
                    text-sm truncate
                    transition-all duration-200
                    hover:bg-purple-50
                    shadow-md
                    hover:-translate-y-[2px]${
            isActive
              ? "ring-2 ring-purple-400 bg-white"
              : "hover:bg-purple-100"
          }`}
        >
          {conv.messages?.[0]?.content || "Chit Chat"}
        </div>
      );
    })}
  </div>
)}

      </div>
    </>
  );
};

export default SideBar;
