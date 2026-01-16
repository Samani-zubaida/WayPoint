import { useState } from "react";
import SideBar from "../component/chatbot/Sidebar.jsx";
import ChatWindow from "../component/chatbot/ChatWindow.jsx";

export default function Chatbot() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMin, setIsMin] = useState(false);
  const [loading,setLoading] = useState(false);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <SideBar
        showSidebar={showSidebar}
        setShowSidebar={setShowSidebar}
        isMin={isMin}
        setIsMin={setIsMin}
        loading={loading}
        setLoading={setLoading}
      />

      {/* Chat Window */}
      <ChatWindow
        showSidebar={showSidebar}
        isMin={isMin}
        setShowSidebar={setShowSidebar}
        setLoading={setLoading}
        loading={loading}
      />
    </div>
  );
}
