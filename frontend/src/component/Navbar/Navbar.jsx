import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Navbar = ({ authUser, onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isExplore = location.pathname === "/explore";
  const isCreate = location.pathname === "/create-post";
  const isChat = location.pathname === "/chatAI";

  const [query, setQuery] = useState("");

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-200 shadow-sm">
      
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* LOGO */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/explore")}
        >
          <img
            src="/logo(3).png"
            alt="WayPoint Logo"
            className="h-9 w-auto rounded-full"
          />
          <span className="text-xl font-bold text-gray-800 tracking-wide">
            WayPoint
          </span>
        </div>

        {/* SEARCH */}
        {authUser && isExplore && (
          <div className="hidden md:flex flex-1 justify-center px-8">
            <input
              type="text"
              value={query}
              onChange={handleSearch}
              placeholder="Search places..."
              className="
              w-full max-w-md
              px-4 py-2
              rounded-full
              border border-gray-300
              bg-white
              focus:outline-none
              focus:ring-2
              focus:ring-blue-400
              shadow-sm
              transition
              "
            />
          </div>
        )}

        {/* MENU */}
        <div className="flex items-center gap-6 text-gray-700 font-medium">

          {!authUser && (
            <button
              onClick={() => navigate("/login")}
              className="
              px-5 py-2
              rounded-full
              bg-blue-600
              text-white
              hover:bg-blue-700
              transition
              shadow-sm
              "
            >
              Login
            </button>
          )}

          {authUser && (
            <>
              <button
                onClick={() => navigate("/explore")}
                className={`transition ${
                  isExplore ? "text-blue-600 font-semibold" : "hover:text-blue-600"
                }`}
              >
                Explore
              </button>

              <button
                onClick={() => navigate("/create-post")}
                className={`transition ${
                  isCreate ? "text-blue-600 font-semibold" : "hover:text-blue-600"
                }`}
              >
                Create Post
              </button>

              <button
                onClick={() => navigate("/chatAI")}
                className={`transition ${
                  isChat ? "text-blue-600 font-semibold" : "hover:text-blue-600"
                }`}
              >
                Chatbot
              </button>

              {/* PROFILE */}
              <button
                onClick={() => navigate(`/profile/${authUser?._id}`)}
                className="
                w-10 h-10
                rounded-full
                bg-gradient-to-br from-blue-500 to-indigo-600
                text-white
                flex items-center justify-center
                font-semibold
                hover:scale-105
                transition
                shadow
                "
              >
                {authUser?.username
                  ? authUser.username.charAt(0).toUpperCase()
                  : "U"}
              </button>
            </>
          )}
        </div>

      </div>
    </header>
  );
};

export default Navbar;