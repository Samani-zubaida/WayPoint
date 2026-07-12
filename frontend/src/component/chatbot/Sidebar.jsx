import { useState } from "react";
import { useChat } from "../../Context/ChatContext.jsx";
import {
  Plus,
  ChevronsLeft,
  ChevronsRight,
  MoreVertical,
  MessageSquare,
  Trash2,
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


  return (
    <aside
      className={`
        h-full
        flex flex-col
        bg-[#111827]
        border-r border-white/10
        shadow-2xl
        transition-all duration-300 ease-in-out
        overflow-hidden
        
        ${isMin ? "w-[70px]" : "w-[290px]"}
        ${showSidebar ? "block" : "hidden md:flex"}
      `}
    >


      {/* ================= HEADER ================= */}

      <div
        className={`
          flex items-center
          px-4 py-4
          border-b border-white/10
          shrink-0

          ${
            isMin
              ? "flex-col gap-5"
              : "justify-between"
          }
        `}
      >


        {/* NEW CHAT BUTTON */}

        <button
          onClick={() => {
            setNewChat(true);
            setActiveId(null);
          }}
          className={`
            flex items-center justify-center gap-2
            rounded-xl
            bg-purple-600
            hover:bg-purple-700
            text-white
            shadow-lg
            transition-all
            active:scale-95

            ${
              isMin
                ? "p-3"
                : "px-4 py-2.5 w-full"
            }
          `}
        >

          <Plus size={18}/>

          {!isMin && (
            <span className="text-sm font-medium">
              New Chat
            </span>
          )}

        </button>



        {/* COLLAPSE BUTTON */}

        <button
          onClick={() => setIsMin(!isMin)}
          className="
            p-2
            rounded-lg
            text-gray-300
            hover:bg-white/10
            hover:text-white
            transition
          "
        >

          {
            isMin
            ?
            <ChevronsRight size={18}/>
            :
            <ChevronsLeft size={18}/>
          }

        </button>

      </div>






      {/* ================= CHAT LIST ================= */}


      {!isMin && (

        <div
          className="
            flex-1
            overflow-y-auto
            px-3
            py-4
            space-y-2

            scrollbar-thin
            scrollbar-thumb-gray-700
          "
        >


          <p
            className="
              text-xs
              text-gray-500
              uppercase
              tracking-wider
              px-2
              mb-3
            "
          >
            Conversations
          </p>



          {
            conversations.length === 0
            ?

            (
              <div
                className="
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-gray-500
                  mt-10
                  gap-2
                "
              >

                <MessageSquare size={28}/>

                <p className="text-sm">
                  No chats yet
                </p>

              </div>
            )


            :

            conversations.map((conv)=>{


              const isActive =
                activeId === conv._id;



              return (

                <div
                  key={conv._id}

                  onClick={()=>{
                    loadConversation(conv._id);
                    setActiveId(conv._id);
                  }}

                  className={`
                    group
                    flex
                    items-center
                    justify-between
                    gap-2

                    px-3
                    py-3

                    rounded-xl
                    cursor-pointer

                    transition-all
                    duration-200


                    ${
                      isActive

                      ?

                      `
                      bg-purple-600/20
                      border
                      border-purple-500/40
                      text-white
                      `

                      :

                      `
                      bg-white/5
                      text-gray-300
                      hover:bg-white/10
                      `
                    }

                  `}
                >



                  {/* TITLE */}


                  <div
                    className="
                      flex
                      items-center
                      gap-3
                      min-w-0
                    "
                  >

                    <div
                      className="
                        p-2
                        rounded-lg
                        bg-white/10
                      "
                    >
                      <MessageSquare
                        size={15}
                      />
                    </div>


                    <span
                      className="
                        truncate
                        text-sm
                      "
                    >
                      {
                        conv.messages?.[0]?.content
                        ||
                        "Chit Chat"
                      }

                    </span>


                  </div>





                  {/* MENU */}


                  <Menu
                    as="div"
                    className="relative"
                  >

                    <MenuButton

                      onClick={(e)=>
                        e.stopPropagation()
                      }

                      className="
                        opacity-0
                        group-hover:opacity-100

                        p-1.5

                        rounded-lg

                        hover:bg-white/10

                        transition
                      "
                    >

                      <MoreVertical
                        size={16}
                      />

                    </MenuButton>





                    <MenuItems

                      className="
                        absolute
                        right-0
                        top-8
                        z-50

                        w-32

                        rounded-xl

                        bg-[#1f2937]

                        border
                        border-white/10

                        shadow-xl

                        overflow-hidden

                        focus:outline-none
                      "
                    >


                      <MenuItem>

                        {
                          ({active})=>(

                            <button

                              onClick={(e)=>{

                                e.stopPropagation();

                                deleteConversation(
                                  conv._id
                                );

                              }}

                              className={`
                                w-full

                                flex
                                items-center
                                gap-2

                                px-3
                                py-2

                                text-sm

                                text-red-400

                                ${
                                  active
                                  ?
                                  "bg-red-500/10"
                                  :
                                  ""
                                }

                              `}
                            >

                              <Trash2
                                size={15}
                              />

                              Delete


                            </button>

                          )
                        }

                      </MenuItem>


                    </MenuItems>


                  </Menu>


                </div>

              )


            })

          }


        </div>

      )}



    </aside>
  );
};


export default SideBar;