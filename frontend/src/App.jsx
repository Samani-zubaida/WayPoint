import { Navigate, Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import MapPage from "./pages/MapPage.jsx";

import { AuthContext } from "./Context/authContext.jsx";

import Post from "./pages/CreatePost.jsx";
import ViewPost from "./components/userpost/ViewPost.jsx";
import Navbar from "./component/Navbar/Navbar.jsx";
import Profile from "./components/userpost/profile.jsx";
import InPost from "./pages/inPost.jsx";
import EditPost from "./pages/EditPost.jsx";

function App() {
  const { authUser } = useContext(AuthContext);

  return (
    <div className="min-h-screen overflow-y-auto overflow-x-hidden fixed inset-0 w-full h-screen bg-[url('/bgImage.svg')] bg-cover bg-no-repeat">
      
      {/* Toast Notifications */}
      <Toaster position="top-right" />

      {/* Navbar */}
      <Navbar authUser={authUser} />

      {/* Main Content */}
      <div className="pt-24 px-4">
        <Routes>

          {/* Root */}
          <Route
            path="/"
            element={!authUser ? <Login /> : <Navigate to="/explore" />}
          />

          {/* Login */}
          <Route
            path="/login"
            element={!authUser ? <Login /> : <Navigate to="/create-post" />}
          />

          {/* Create Post */}
          <Route
            path="/create-post"
            element={authUser ? <Post /> : <Navigate to="/login" />}
          />

          {/* Explore */}
          <Route
            path="/explore"
            element={authUser ? <ViewPost /> : <Navigate to="/login" />}
          />

          {/* Chatbot */}
          <Route
            path="/chatAI"
            element={authUser ? <Chatbot /> : <Navigate to="/login" />}
          />

          {/* Map */}
          <Route
            path="/map"
            element={authUser ? <MapPage /> : <Navigate to="/login" />}
          />

          {/* Profile */}
          <Route
            path="/profile/:id"
            element={authUser ? <Profile authUser={authUser} /> : <Navigate to="/login" />}
          />

          {/* Single Post */}
          <Route
            path="/post/:id"
            element={authUser ? <InPost /> : <Navigate to="/login" />}
          />

          {/* Edit Post */}
          <Route
            path="/post/edit/:id"
            element={authUser ? <EditPost /> : <Navigate to="/login" />}
          />

        </Routes>
      </div>
    </div>
  );
}

export default App;