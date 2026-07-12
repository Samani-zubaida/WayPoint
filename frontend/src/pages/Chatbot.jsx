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
      h-[calc(100vh)]
      overflow-hidden
      bg-[#060B14]
      "
    >
      {/* ========================================= */}
      {/* Cursor Glow */}
      {/* ========================================= */}

      <div className="hidden lg:block">
        <motion.div
          animate={{
            x: mouse.x - 220,
            y: mouse.y - 220,
          }}
          transition={{
            type: "spring",
            stiffness: 140,
            damping: 18,
          }}
          className="
          fixed
          h-[440px]
          w-[440px]
          rounded-full
          bg-cyan-400/10
          blur-[170px]
          pointer-events-none
          z-0
          "
        />
      </div>

      {/* ========================================= */}
      {/* Aurora */}
      {/* ========================================= */}

      <motion.div
        animate={{
          x: [0, 180, 0],
          y: [0, -100, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 20,
          ease: "easeInOut",
        }}
        className="
        absolute
        -top-72
        -left-60
        h-[900px]
        w-[900px]
        rounded-full
        bg-cyan-500/10
        blur-[180px]
        "
      />

      <motion.div
        animate={{
          x: [0, -160, 0],
          y: [0, 140, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 24,
          ease: "easeInOut",
        }}
        className="
        absolute
        -bottom-80
        -right-80
        h-[900px]
        w-[900px]
        rounded-full
        bg-indigo-500/10
        blur-[180px]
        "
      />

      {/* ========================================= */}
      {/* Grid */}
      {/* ========================================= */}

      <div
        className="
        absolute
        inset-0
        opacity-[0.05]
        bg-[linear-gradient(#ffffff08_1px,transparent_1px),linear-gradient(90deg,#ffffff08_1px,transparent_1px)]
        bg-[size:42px_42px]
        "
      />

      {/* ========================================= */}
      {/* Layout */}
      {/* ========================================= */}

      <div
        className="
        relative
        z-10
        flex
        h-full
        "
      >
        <SideBar
          showSidebar={showSidebar}
          setShowSidebar={setShowSidebar}
          isMin={isMin}
          setIsMin={setIsMin}
          loading={loading}
          setLoading={setLoading}
        />

        <ChatWindow
          showSidebar={showSidebar}
          isMin={isMin}
          setShowSidebar={setShowSidebar}
          loading={loading}
          setLoading={setLoading}
        />
      </div>
    </div>
  );
}