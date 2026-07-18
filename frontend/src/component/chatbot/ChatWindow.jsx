import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useChat } from "../../Context/ChatContext.jsx";

import {
  Bot,
  Send,
  Sparkles,
  Coffee,
  Utensils,
  Hotel,
  Mountain,
  Navigation,
  Compass,
} from "lucide-react";

const ChatWindow = ({ loading }) => {
  const { messages, sendMessage, sending } = useChat();

  const [input, setInput] = useState("");

  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
  }, [messages, loading, sending]);

  const handleSend = () => {
    if (!input.trim()) return;

    sendMessage(input);

    setInput("");
  };

  const promptCards = [
    {
      title: "Find Restaurants",
      desc: "Best places to eat nearby",
      icon: <Utensils size={22} />,
      prompt: "Find the best restaurants near me",
    },
    {
      title: "Coffee Time",
      desc: "Discover popular cafes",
      icon: <Coffee size={22} />,
      prompt: "Show nearby cafes",
    },
    {
      title: "Nearby Hotels",
      desc: "Affordable stays",
      icon: <Hotel size={22} />,
      prompt: "Find hotels nearby",
    },
    {
      title: "Hidden Gems",
      desc: "Explore unique places",
      icon: <Mountain size={22} />,
      prompt: "Show hidden places near me",
    },
    {
      title: "Navigation",
      desc: "Plan my route",
      icon: <Navigation size={22} />,
      prompt: "Plan a one day trip",
    },
    {
      title: "Tourist Spots",
      desc: "Must visit attractions",
      icon: <Compass size={22} />,
      prompt: "Top tourist attractions near me",
    },
  ];

  const BotLoader = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="
      flex
      items-center
      gap-3

      bg-[#111827]

      border
      border-white/10

      rounded-2xl

      px-5
      py-4

      w-fit
      "
    >
      <Bot size={18} className="text-blue-400" />

      <div className="flex gap-1">
        <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></span>

        <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.15s]"></span>

        <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce [animation-delay:0.3s]"></span>
      </div>

      <span className="text-sm text-gray-400">WayPoint AI is thinking...</span>
    </motion.div>
  );

  return (
    <div
      className="
      flex-1

      flex

      flex-col

      h-full
      min-h-0

      bg-[#070E18]

      overflow-hidden
      "
    >
      {/* ===================== CHAT AREA ===================== */}

      <div
        className="
        flex-1
        min-h-0

        overflow-y-auto

        px-6
        md:px-12

        py-8
        "
      >
        <>
          {messages.length === 0 ? (
            <motion.div
              key="empty"
              initial={{
                opacity: 0,
                y: 20,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
min-h-full
flex
flex-col
justify-center
items-center
max-w-6xl
mx-auto
py-20
"
            >
              <div
                className="
                h-24

                w-24

                rounded-3xl

                bg-blue-600/20

                flex

                items-center

                justify-center

                mb-8
                "
              >
                <Sparkles size={40} className="text-blue-400" />
              </div>

              <h1
                className="
                text-5xl

                font-bold

                text-white
                "
              >
                WayPoint AI
              </h1>

              <p
                className="
                mt-5

                text-gray-400

                text-lg

                text-center

                max-w-2xl
                "
              >
                Your intelligent travel assistant. Discover restaurants, hotels,
                routes, hidden gems and explore the world around you.
              </p>

              <div
                className="
                grid

                md:grid-cols-2
                lg:grid-cols-3

                gap-5

                w-full

                mt-14
                "
              >
                {promptCards.map((card) => (
                  <motion.button
                    key={card.title}
                    whileHover={{
                      y: -5,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                    onClick={() => setInput(card.prompt)}
                    className="
                    text-left

                    rounded-3xl

                    border

                    border-white/10

                    bg-[#111827]

                    p-6

                    hover:border-blue-500/50

                    transition-all
                    "
                  >
                    <div
                      className="
                      h-12

                      w-12

                      rounded-xl

                      bg-blue-600/20

                      flex

                      items-center

                      justify-center

                      text-blue-400

                      mb-4
                      "
                    >
                      {card.icon}
                    </div>

                    <h3
                      className="
                      text-white

                      font-semibold

                      text-lg
                      "
                    >
                      {card.title}
                    </h3>

                    <p
                      className="
                      text-gray-400

                      mt-2

                      text-sm
                      "
                    >
                      {card.desc}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          ) : (
            <div
              className="
w-full
max-w-6xl
mx-auto

flex
flex-col

gap-8

pb-10

min-h-full
"
            >
              {messages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{
                    duration: 0.2,
                  }}
                  className={`flex ${
                    msg.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* ================= USER ================= */}

                  {msg.sender === "user" ? (
                    <motion.div
                      whileHover={{
                        scale: 1.01,
                      }}
                      className="
                      max-w-[75%]

                      bg-gradient-to-r

                      from-blue-600

                      to-indigo-600

                      text-white

                      rounded-[28px]

                      rounded-br-lg

                      px-6

                      py-4

                      shadow-xl
                      "
                    >
                      <p
                        className="
                        whitespace-pre-wrap

                        leading-7

                        text-[15px]
                        "
                      >
                        {msg.content}
                      </p>

                      <div
                        className="
                        mt-3

                        flex

                        justify-end
                        "
                      >
                        <span
                          className="
                          text-[11px]

                          opacity-70
                          "
                        >
                          You
                        </span>
                      </div>
                    </motion.div>
                  ) : (
                    <div
                      className="
flex
gap-4

w-full

items-start

max-w-5xl
"
                    >
                      {/* Avatar */}

                      <div
                        className="
                        h-12

                        w-12

                        rounded-2xl

                        bg-blue-600/20

                        flex

                        items-center

                        justify-center

                        shrink-0
                        "
                      >
                        <Bot size={20} className="text-blue-400" />
                      </div>

                      {/* AI CARD */}

                      <motion.div
                        whileHover={{
                          y: -2,
                        }}
                        className="
                        flex-1

                        rounded-3xl

                        rounded-tl-lg

                        bg-[#111827]

                        border

                        border-white/10

                        shadow-xl

                        overflow-hidden
                        "
                      >
                        {/* Header */}

                        <div
                          className="
                          flex

                          items-center

                          justify-between

                          px-6

                          py-4

                          border-b

                          border-white/5
                          "
                        >
                          <div
                            className="
                            flex

                            items-center

                            gap-2
                            "
                          >
                            <Sparkles size={15} className="text-blue-400" />

                            <span
                              className="
                              text-xs

                              uppercase

                              tracking-widest

                              text-blue-300
                              "
                            >
                              WayPoint AI
                            </span>
                          </div>

                          <span
                            className="
                            text-xs

                            text-gray-500
                            "
                          >
                            AI Response
                          </span>
                        </div>

                        {/* CONTENT */}

                        <div
                          className="
                          px-6

                          py-6
                          "
                        >
                          <div
                            className="
                            prose

                            prose-invert

                            prose-sm

                            max-w-none

                            leading-8

                            text-gray-200
                            "
                            dangerouslySetInnerHTML={{
                              __html: msg.content,
                            }}
                          />
                        </div>

                        {/* ACTIONS */}

                        <div
                          className="
                          flex

                          flex-wrap

                          gap-3

                          px-6

                          pb-5
                          "
                        >
                          <button
                            className="
                            px-4

                            py-2

                            rounded-xl

                            bg-white/5

                            hover:bg-white/10

                            text-sm

                            transition
                            "
                          >
                            📍 Show on Map
                          </button>

                          <button
                            className="
                            px-4

                            py-2

                            rounded-xl

                            bg-white/5

                            hover:bg-white/10

                            text-sm

                            transition
                            "
                          >
                            🧭 Navigate
                          </button>

                          <button
                            className="
                            px-4

                            py-2

                            rounded-xl

                            bg-white/5

                            hover:bg-white/10

                            text-sm

                            transition
                            "
                          >
                            🏨 Nearby Hotels
                          </button>
                        </div>
                      </motion.div>
                    </div>
                  )}
                </motion.div>
              ))}

              {(loading || sending) && <BotLoader />}

              <div ref={scrollRef} />
            </div>
          )}
        </>
      </div>

      {/* ===================== INPUT ===================== */}

      <div
        className="
        sticky
        bottom-0
        shrink-0

        bg-[#070E18]/95

        backdrop-blur-xl

        border-t
        border-white/10

        px-6
        md:px-10

        py-5
        "
      >
        <div
          className="
          max-w-5xl

          mx-auto
          "
        >
          <motion.div
            whileFocus={{ scale: 1.01 }}
            className="
            flex

            items-end

            gap-3

            rounded-3xl

            bg-[#111827]

            border

            border-white/10

            p-3

            shadow-2xl
            "
          >
            {/* Attachment */}

            <button
              className="
              h-11

              w-11

              rounded-xl

              flex

              items-center

              justify-center

              hover:bg-white/5

              transition
              "
            >
              📎
            </button>

            {/* Input */}

            <textarea
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey && !sending) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              placeholder="Ask WayPoint AI anything..."
              className="
              flex-1

              bg-transparent

              resize-none

              outline-none

              text-white

              placeholder:text-gray-500

              leading-7

              max-h-40
              "
            />

            {/* Mic */}

            <button
              className="
              h-11

              w-11

              rounded-xl

              flex

              items-center

              justify-center

              hover:bg-white/5

              transition
              "
            >
              🎤
            </button>

            {/* Send */}

            <motion.button
              whileHover={{
                scale: 1.05,
              }}
              whileTap={{
                scale: 0.92,
              }}
              disabled={sending || !input.trim()}
              onClick={handleSend}
              className="
              h-12

              w-12

              rounded-2xl

              bg-blue-600

              hover:bg-blue-700

              disabled:bg-gray-700

              disabled:cursor-not-allowed

              flex

              items-center

              justify-center

              transition-all
              "
            >
              <Send size={18} />
            </motion.button>
          </motion.div>

          {/* Bottom Hint */}

          <div
            className="
            flex

            items-center

            justify-between

            mt-4

            text-xs

            text-gray-500
            "
          >
            <span>
              Press <b>Enter</b> to send • <b>Shift + Enter</b> for a new line
            </span>

            <span>Powered by WayPoint AI</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;