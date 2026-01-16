import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import MapPage from "./pages/MapPage.jsx";
import Navbar from "./component/Navbar/Navbar.jsx";
import { AuthContext } from "./Context/authContext.jsx";

function App() {
  const { authUser } = useContext(AuthContext);
  const location = useLocation();

  const [showNavbar, setShowNavbar] = useState(false);

  // Control navbar visibility based on route
  useEffect(() => {
    if (location.pathname === "/map"  &&  "/create-post") {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  }, [location.pathname]);

  return (
    <div className="fixed inset-0 w-full h-screen bg-[url('/bgImage.svg')] bg-cover bg-no-repeat">
      <Toaster />

      {showNavbar && <Navbar />}

      <Routes>
        {/* Root redirect */}
        <Route
          path="/"
          element={<Navigate to={authUser ? "/chatAI" : "/login"} />}
        />

        {/* Login */}
        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/chatAI" />}
        />

        {/* Protected Chatbot */}
        <Route
          path="/chatAI"
          element={ <Chatbot />}
        />

        {/* Map */}
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </div>
  );
}

export default App;
