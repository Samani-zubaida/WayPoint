import { useState } from "react";
import { motion } from "framer-motion";

import SideBar from "../component/chatbot/Sidebar";
import ChatWindow from "../component/chatbot/ChatWindow";

export default function Chatbot() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMin, setIsMin] = useState(false);
  const [loading, setLoading] = useState(false);

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  return (
    <div
      onMouseMove={(e) =>
        setMouse({
          x: e.clientX,
          y: e.clientY,
        })
      }
      className="
      relative
      h-screen
      overflow-hidden

      bg-[#060B14]
      text-white
      "
    >
      {/* ================= Cursor Glow ================= */}

      <div className="hidden lg:block pointer-events-none">
        <motion.div
          animate={{
            x: mouse.x - 220,
            y: mouse.y - 220,
          }}
          transition={{
            type: "spring",
            stiffness: 120,
            damping: 18,
          }}
          className="
          fixed
          w-[450px]
          h-[450px]
          rounded-full

          bg-violet-500/10

          blur-[170px]

          z-0
          "
        />
      </div>

      {/* ================= Aurora ================= */}

      <motion.div
        animate={{
          x: [0, 150, 0],
          y: [0, -120, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        -top-80
        -left-80

        w-[900px]
        h-[900px]

        rounded-full

        bg-purple-500/10

        blur-[180px]
        "
      />

      <motion.div
        animate={{
          x: [0, -160, 0],
          y: [0, 140, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        -bottom-96
        -right-96

        w-[900px]
        h-[900px]

        rounded-full

        bg-cyan-500/10

        blur-[180px]
        "
      />

      {/* ================= Grid ================= */}

      <div
        className="
        absolute
        inset-0

        opacity-[0.04]

        bg-[linear-gradient(#ffffff08_1px,transparent_1px),linear-gradient(90deg,#ffffff08_1px,transparent_1px)]

        bg-[size:42px_42px]
        "
      />

      {/* ================= Workspace ================= */}

      <div
        className="
        relative
        z-10

        flex

        h-full
        min-h-0
        "
      >
        {/* Sidebar */}

        <SideBar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          isMin={isMin}
          setIsMin={setIsMin}
          loading={loading}
          setLoading={setLoading}
        />

        {/* Main Workspace */}

        <main
          className="
          flex-1

          flex
          flex-col

          min-w-0
          min-h-0
          h-full
          "
        >
          {/* Top Header */}

          <header
            className="
            h-16
            shrink-0

            flex
            items-center
            justify-between

            px-8

            border-b
            border-white/5

            backdrop-blur-xl

            bg-[#060B14]/60
            "
          >
            <div>
              <h1 className="text-lg font-semibold">
                WayPoint AI
              </h1>

              <p className="text-xs text-gray-400">
                Your intelligent travel assistant
              </p>
            </div>

            <div
              className="
              flex
              items-center
              gap-2

              text-xs
              text-emerald-400
              "
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              Online
            </div>
          </header>

          {/* Chat */}

          <ChatWindow
            showSidebar={showSidebar}
            isMin={isMin}
            setShowSidebar={setShowSidebar}
            loading={loading}
            setLoading={setLoading}
          />
        </main>
      </div>
    </div>
  );
}