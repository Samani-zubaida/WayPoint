// import "./App.css";
import { Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login.jsx";
import { Toaster } from "react-hot-toast";
import { ChatProvider } from "./Context/chatContext.jsx";
import MapPage from "./pages/MapPage.jsx";
import "../src/utils/fixLeafletIcons.js";
import Navbar from "./component/Navbar/Navbar.jsx";
function App() {
  return (
    <>
      <div className="h-[64px] shrink-0">
        <Navbar />
      </div>
      <ChatProvider>
        <div className="fixed inset-0 w-full h-screen bg-[url('/bgImage.svg')] bg-cover bg-no-repeat">
          <Toaster />
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<Login />} />

            {/* AI Chat Route */}
            <Route path="/map" element={<MapPage />} />
          </Routes>
        </div>
      </ChatProvider>
    </>
  );
}

export default App;
