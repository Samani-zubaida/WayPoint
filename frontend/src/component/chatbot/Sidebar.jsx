import { useState } from "react";
import { useChat } from "../../Context/ChatContext.jsx";

import {
  Plus,
  ChevronsLeft,
  ChevronsRight,
  MoreVertical,
  MessageSquare,
  Trash2,
  Search,
  Sparkles,
} from "lucide-react";

import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

const SideBar = ({ showSidebar, isMin, setIsMin }) => {
  const {
    setNewChat,
    conversations,
    loadConversation,
    deleteConversation,
  } = useChat();

  const [activeId, setActiveId] = useState(null);
  const [search, setSearch] = useState("");

  const filteredConversations = conversations.filter((conv) => {
    const title =
      conv.messages?.[0]?.content || "New Chat";

    return title
      .toLowerCase()
      .includes(search.toLowerCase());
  });

  return (
    <aside
      className={`
        h-full
        flex
        flex-col

        bg-[#0f172a]

        border-r
        border-white/10

        transition-all
        duration-300

        overflow-hidden

        ${
          isMin
            ? "w-[78px]"
            : "w-[320px]"
        }

        ${
          showSidebar
            ? "block"
            : "hidden md:flex"
        }
      `}
    >
      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <div
        className="
          px-5
          py-5

          border-b
          border-white/10

          shrink-0
        "
      >
        {!isMin && (
          <>
            <div className="flex items-center gap-3 mb-5">
              <div
                className="
                  h-11
                  w-11

                  rounded-2xl

                  bg-violet-600/20

                  flex
                  items-center
                  justify-center
                "
              >
                <Sparkles
                  size={20}
                  className="text-violet-400"
                />
              </div>

              <div>
                <h2 className="font-semibold text-lg text-white">
                  WayPoint AI
                </h2>

                <p className="text-xs text-gray-400">
                  Travel Assistant
                </p>
              </div>
            </div>
          </>
        )}

        <div
          className={`
            flex
            gap-2

            ${
              isMin
                ? "flex-col items-center"
                : ""
            }
          `}
        >
          {/* NEW CHAT */}

          <button
            onClick={() => {
              setNewChat(true);
              setActiveId(null);
            }}
            className={`
              flex
              items-center
              justify-center
              gap-2

              rounded-xl

              bg-violet-600

              hover:bg-violet-700

              active:scale-95

              transition-all

              shadow-lg

              ${
                isMin
                  ? "h-11 w-11"
                  : "flex-1 py-3"
              }
            `}
          >
            <Plus size={18} />

            {!isMin && (
              <span className="font-medium">
                New Chat
              </span>
            )}
          </button>

          {/* COLLAPSE */}

          <button
            onClick={() =>
              setIsMin(!isMin)
            }
            className="
              h-11
              w-11

              rounded-xl

              bg-white/5

              hover:bg-white/10

              transition

              flex
              items-center
              justify-center
            "
          >
            {isMin ? (
              <ChevronsRight size={18} />
            ) : (
              <ChevronsLeft size={18} />
            )}
          </button>
        </div>
      </div>

      {/* ========================================= */}
      {/* SEARCH */}
      {/* ========================================= */}

      {!isMin && (
        <div
          className="
            px-5
            py-4

            border-b
            border-white/10
          "
        >
          <div
            className="
              flex
              items-center
              gap-3

              bg-white/5

              rounded-xl

              px-4
              py-3

              border
              border-white/5

              focus-within:border-violet-500
              transition
            "
          >
            <Search
              size={17}
              className="text-gray-400"
            />

            <input
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              placeholder="Search conversations..."

              className="
                flex-1

                bg-transparent

                outline-none

                text-sm

                text-white

                placeholder-gray-500
              "
            />
          </div>
        </div>
      )}

      {/* ========================================= */}
      {/* HISTORY */}
      {/* ========================================= */}

      {!isMin && (
        <div
          className="
            flex-1

            overflow-y-auto

            px-3
            py-4
          "
        >
          <p
            className="
              px-3

              mb-3

              text-[11px]

              uppercase

              tracking-[0.3em]

              text-gray-500
            "
          >
            Conversations
          </p>

          {/* Part 2 starts here */}

                    {filteredConversations.length === 0 ? (
            <div
              className="
                mt-20

                flex
                flex-col
                items-center
                justify-center

                text-center

                text-gray-500

                gap-4
              "
            >
              <div
                className="
                  h-16
                  w-16

                  rounded-2xl

                  bg-white/5

                  flex
                  items-center
                  justify-center
                "
              >
                <MessageSquare size={28} />
              </div>

              <div>
                <h3 className="text-white font-medium">
                  No Conversations
                </h3>

                <p className="text-sm text-gray-400 mt-1">
                  Start a new chat to begin.
                </p>
              </div>
            </div>
          ) : (
            filteredConversations.map((conv) => {
              const isActive =
                activeId === conv._id;

              return (
                <div
                  key={conv._id}
                  onClick={() => {
                    loadConversation(conv._id);
                    setActiveId(conv._id);
                  }}
                  className={`
                    group

                    flex
                    items-center
                    justify-between

                    gap-3

                    px-3
                    py-3

                    mb-2

                    rounded-xl

                    cursor-pointer

                    transition-all
                    duration-200

                    ${
                      isActive
                        ? `
                          bg-violet-600/20
                          border
                          border-violet-500/40
                        `
                        : `
                          hover:bg-white/5
                        `
                    }
                  `}
                >
                  {/* LEFT */}

                  <div
                    className="
                      flex
                      items-center

                      gap-3

                      min-w-0

                      flex-1
                    "
                  >
                    <div
                      className={`
                        h-10
                        w-10

                        rounded-xl

                        flex
                        items-center
                        justify-center

                        ${
                          isActive
                            ? "bg-violet-500/20 text-violet-300"
                            : "bg-white/5 text-gray-400"
                        }
                      `}
                    >
                      <MessageSquare size={17} />
                    </div>

                    <div className="min-w-0">
                      <p
                        className="
                          truncate

                          text-sm

                          text-white

                          font-medium
                        "
                      >
                        {conv.messages?.[0]?.content ||
                          "New Chat"}
                      </p>

                      <p
                        className="
                          text-xs

                          text-gray-500
                        "
                      >
                        {conv.messages?.length || 0} messages
                      </p>
                    </div>
                  </div>

                  {/* MENU */}

                  <Menu
                    as="div"
                    className="relative"
                  >
                    <MenuButton
                      onClick={(e) =>
                        e.stopPropagation()
                      }
                      className="
                        opacity-0

                        group-hover:opacity-100

                        transition

                        p-2

                        rounded-lg

                        hover:bg-white/10
                      "
                    >
                      <MoreVertical size={16} />
                    </MenuButton>

                    <MenuItems
                      anchor="bottom end"
                      className="
                        z-50

                        w-40

                        origin-top-right

                        rounded-xl

                        border
                        border-white/10

                        bg-[#111827]

                        shadow-xl

                        p-1

                        focus:outline-none
                      "
                    >
                      <MenuItem>
                        {({ focus }) => (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteConversation(
                                conv._id
                              );
                            }}
                            className={`
                              flex
                              w-full
                              items-center

                              gap-2

                              rounded-lg

                              px-3
                              py-2

                              text-sm

                              text-red-400

                              ${
                                focus
                                  ? "bg-red-500/10"
                                  : ""
                              }
                            `}
                          >
                            <Trash2 size={15} />

                            Delete Chat
                          </button>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Menu>
                </div>
              );
            })
          )}
        </div>
      )}
    </aside>
  );
};

export default SideBar;