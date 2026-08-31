import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useContext } from "react";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login.jsx";
import Chatbot from "./pages/Chatbot.jsx";
import MapPage from "./pages/MapPage.jsx";
import Navbar from "./component/Navbar/Navbar.jsx";
import { AuthContext } from "./Context/authContext.jsx";

import Post from "./pages/CreatePost.jsx";
import ViewPost from "./component/userpost/ViewPost.jsx";
import Profile from "./component/userpost/profile.jsx";
import InPost from "./pages/inPost.jsx";
import EditPost from "./pages/EditPost.jsx";
import Intro from "./pages/Intro.jsx";

function App() {
  const { authUser, isLoading } = useContext(AuthContext);
  const location = useLocation();

  const navbarRoutes = ["/map", "/create-post", "/explore", "/chatAI"];
  const showNavbar = navbarRoutes.includes(location.pathname);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden">
      <Toaster position="top-right" />

      {showNavbar && <Navbar authUser={authUser} />}

      <Routes>
        <Route
          path="/"
          element={<Intro />}
        />

        <Route
          path="/login"
          element={!authUser ? <Login /> : <Navigate to="/create-post" replace />}
        />

        <Route
          path="/create-post"
          element={authUser ? <Post /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/explore"
          element={authUser ? <ViewPost /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/chatAI"
          element={authUser ? <Chatbot /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/map"
          element={authUser ? <MapPage /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/profile/:id"
          element={
            authUser ? (
              <Profile authUser={authUser} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        <Route
          path="/post/:id"
          element={authUser ? <InPost /> : <Navigate to="/login" replace />}
        />

        <Route
          path="/post/edit/:id"
          element={authUser ? <EditPost /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;