import { useState } from "react";
import { useChat } from "../../Context/ChatContext.jsx";
import { Plus, ChevronsLeft, ChevronsRight, MoreVertical } from "lucide-react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";

const SideBar = ({ showSidebar, isMin, setIsMin }) => {
  const { setNewChat, conversations, loadConversation,deleteConversation } = useChat();
  const [activeId, setActiveId] = useState(null);

  return (
    <div
      className={`
        bg-gradient-to-b from-white via-gray-100 to-white
        backdrop-blur-xl shadow-2xl
        flex flex-col transition-all duration-300
        min-h-0                 /* 🔑 REQUIRED FOR SCROLL */
        overflow-y-auto
        ${isMin ? "w-[40px]" : "w-[260px]"}
        ${showSidebar ? "block" : "hidden md:block"}
      `}
    >
      {/* Header (fixed height) */}
      <div
        className={`px-2 py-4 flex shrink-0 ${
          isMin ? "flex-col items-center gap-2" : "items-center justify-between"
        }`}
      >
        <button
          onClick={() => {
            setNewChat(true);
            setActiveId(null);
          }}
          className={`flex items-center justify-center gap-2 rounded-xl
            bg-gradient-to-r from-purple-600 to-indigo-600
            text-white shadow transition
            ${isMin ? "p-2" : "px-3 py-2 text-sm"}
          `}
        >
          <Plus className="w-4 h-4" />
          {!isMin && <span>New Chat</span>}
        </button>

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

      {/* Conversations (scrollable) */}
      {!isMin && (
        <div
          className="
            flex-1 min-h-0        /* 🔑 REQUIRED */
            px-3 pt-2 pb-6
            space-y-2
            overflow-y-auto
            scrollbar-thin
            scrollbar-thumb-purple-300
            scrollbar-track-transparent 
            auto-scroll
          "
        >
          {conversations.map((conv) => {
            const isActive = activeId === conv._id;

            return (
              <div
                key={conv._id}
                onClick={() => {
                  loadConversation(conv._id);
                  setActiveId(conv._id);
                }}
                className={`
                  flex items-center justify-between gap-2
                  px-3 py-2 rounded-xl cursor-pointer
                  bg-white/70 text-sm shadow-md
                  transition-all duration-200
                  hover:bg-purple-100 hover:-translate-y-[2px]
                  ${isActive ? "ring-2 ring-purple-400 bg-white" : ""}
                `}
              >
                {/* Chat title */}
                <span className="truncate max-w-[170px]">
                  {conv.messages?.[0]?.content || "Chit Chat"}
                </span>

                {/* Menu */}
                <Menu as="div" className="relative shrink-0">
                  <MenuButton
                    onClick={(e) => e.stopPropagation()}
                    className="p-1 rounded-md hover:bg-gray-200"
                  >
                    <MoreVertical className="w-4 h-4 text-gray-600" />
                  </MenuButton>

                  <MenuItems
                    className="
                      absolute right-0 z-20 mt-2 w-28
                      rounded-md bg-white shadow-lg
                      ring-1 ring-black/10
                    "
                  >
                    <MenuItem>
                      {({ active }) => (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteConversation(conv._id);
                          }}
                          className={`
    w-full px-3 py-2 text-sm text-left
    text-red-600
    ${active ? "bg-red-50" : ""}
  `}
                        >
                          Delete
                        </button>
                      )}
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SideBar;
