import React, { useContext, useEffect, useMemo, useRef, useState } from "react";

import { Link, useLocation, useNavigate } from "react-router-dom";

import {
  Compass,
  Map,
  Bot,
  PlusCircle,
  Search,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown,
} from "lucide-react";

import { motion, AnimatePresence } from "framer-motion";

import { AuthContext } from "../../Context/authContext";

const Navbar = ({ onSearch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const { authUser, logout } = useContext(AuthContext);

  const [query, setQuery] = useState("");

  const [mobileOpen, setMobileOpen] = useState(false);

  const [profileOpen, setProfileOpen] = useState(false);

  const dropdownRef = useRef(null);

  const searchRef = useRef(null);

  const isExplore = location.pathname === "/explore";

  const links = useMemo(
    () => [
      {
        title: "Explore",
        icon: Compass,
        path: "/explore",
      },
      {
        title: "Map",
        icon: Map,
        path: "/map",
      },
      {
        title: "Create",
        icon: PlusCircle,
        path: "/create-post",
      },
      {
        title: "AI Chat",
        icon: Bot,
        path: "/chatAI",
      },
    ],
    [],
  );

  const handleSearch = (e) => {
    const value = e.target.value;

    setQuery(value);

    if (onSearch) {
      onSearch(value);
    }
  };

  const handleLogout = () => {
    logout();

    navigate("/");
  };

  useEffect(() => {
    const closeDropdown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };

    window.addEventListener("mousedown", closeDropdown);

    return () => window.removeEventListener("mousedown", closeDropdown);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const menuVariants = {
    hidden: {
      opacity: 0,
      y: -30,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
      },
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  };

  return (
    <>
      <header
        className="
        fixed
        top-0
        left-0
        right-0
        z-50
        h-20
        border-b
       border-zinc-800
        bg-zinc-950/90
        backdrop-blur-xl
        shadow-lg
      "
      >
        <div
          className="
          max-w-[1700px]
          mx-auto
          h-full
          px-8
          flex
          items-center
          justify-between
        "
        >
          {/* ===========================
        LOGO
=========================== */}

          <motion.div
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate(authUser ? "/explore" : "/")}
            className="flex items-center gap-3 cursor-pointer select-none"
          >
            <div className="relative">
              <div className="h-12 w-12 rounded-full overflow-hidden ring-2 ring-amber-400 shadow-xl">
                <img
                  src="https://www.shutterstock.com/image-vector/north-waypoint-logo-vector-stock-260nw-2093364898.jpg"
                  alt="WayPoint"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border-2 border-slate-950" />
            </div>

            <div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-100">
  WayPoint
</h1>

              <p className="text-xs text-slate-400">
                Discover • Share • Explore
              </p>
            </div>
          </motion.div>

          {/* ===========================
      DESKTOP NAVIGATION
=========================== */}

          <div className="hidden lg:flex items-center gap-2">
            {links.map((item) => {
              const Icon = item.icon;

              const active = location.pathname === item.path;

              return (
                <motion.div
                  key={item.path}
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={item.path}
                    className={`
            relative
            flex
            items-center
            gap-2
            px-5
            py-3
            rounded-xl
            transition-all
            duration-300
            ${
              active
                ? "bg-sky-500 text-white shadow-lg"
                : "text-slate-300 hover:bg-slate-800 hover:text-white"
            }
          `}
                  >
                    <Icon size={18} />

                    <span className="font-medium">{item.title}</span>
                  </Link>
                </motion.div>
              );
            })}
          </div>

          {/* ===========================
        SEARCH BAR
=========================== */}

          <div className="hidden xl:flex flex-1 justify-center px-10">
            {isExplore && (
              <div className="relative w-full max-w-xl">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  ref={searchRef}
                  value={query}
                  onChange={handleSearch}
                  type="text"
                  placeholder="Search places, users, categories..."
                  className="
          w-full
          rounded-2xl
          bg-slate-900
          border
          border-slate-700
          pl-12
          pr-5
          py-3
          text-white
          placeholder:text-slate-500
          outline-none
          focus:border-amber-400
          focus:ring-2
          focus:ring-amber-500/20
          transition
        "
                />
              </div>
            )}
          </div>
          {/* ===========================
      RIGHT SECTION
=========================== */}

          <div className="flex items-center gap-4">
            {/* ---------- Desktop Auth ---------- */}

            {authUser ? (
              <div className="relative hidden lg:block" ref={dropdownRef}>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="
          flex
          items-center
          gap-3
          px-4
          py-2
          rounded-xl
          bg-slate-900
          hover:bg-slate-800
          border
          border-slate-700
          transition
        "
                >
<div
  className="
    h-10
    w-10
    rounded-full
    bg-sky-500
    border-2
    border-sky-400
    flex
    items-center
    justify-center
    text-white
    font-bold
    shadow-lg
    shadow-sky-500/30
  "
>
  {authUser?.username?.charAt(0)?.toUpperCase() || "U"}
</div>

                  <div className="text-left">
                    <p className="text-white font-semibold">
                      {authUser?.username}
                    </p>

                    <p className="text-xs text-slate-400">Explorer</p>
                  </div>

                  <ChevronDown
                    size={18}
                    className={`transition ${profileOpen ? "rotate-180" : ""}`}
                  />
                </motion.button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      variants={menuVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="
              absolute
              right-0
              mt-3
              w-64
              rounded-2xl
              border
              border-slate-700
              bg-slate-900
              shadow-2xl
              overflow-hidden
            "
                    >
                      <button
                        onClick={() => {
                          navigate("/profile");
                          setProfileOpen(false);
                        }}
                        className="
                w-full
                flex
                items-center
                gap-3
                px-5
                py-4
                text-left
                text-slate-300
                hover:bg-slate-800
              "
                      >
                        <User size={18} />
                        My Profile
                      </button>

                      <button
                        onClick={handleLogout}
                        className="
                w-full
                flex
                items-center
                gap-3
                px-5
                py-4
                text-left
                text-red-400
                hover:bg-red-500/10
              "
                      >
                        <LogOut size={18} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden lg:flex gap-3">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => navigate("/login")}
                  className="
          px-5
          py-2.5
          rounded-xl
          border
          border-slate-700
          text-slate-300
          hover:bg-slate-800
        "
                >
                  Login
                </motion.button>

              
              </div>
            )}

            {/* ---------- Mobile Menu Button ---------- */}

            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileOpen(!mobileOpen)}
              className="
      lg:hidden
      h-12
      w-12
      rounded-xl
      bg-slate-900
      border
      border-slate-700
      flex
      items-center
      justify-center
      text-white
    "
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
          </div>
        </div>

        {/* ===========================
      MOBILE MENU
=========================== */}

        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="
        lg:hidden
        border-t
        border-slate-800
        bg-slate-950/95
        backdrop-blur-xl
        px-6
        py-6
      "
            >
              {/* Mobile Search */}

              {isExplore && (
                <div className="relative mb-6">
                  <Search
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search..."
                    className="
              w-full
              rounded-xl
              bg-slate-900
              border
              border-slate-700
              pl-12
              pr-4
              py-3
              text-white
              outline-none
              focus:border-amber-400
            "
                  />
                </div>
              )}

              {/* Navigation */}

              <div className="space-y-2">
                {links.map((item) => {
                  const Icon = item.icon;

                  const active = location.pathname === item.path;

                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`
                flex
                items-center
                gap-3
                rounded-xl
                px-4
                py-4
                transition
                ${
                  active
                    ? "bg-amber-500 text-black"
                    : "text-slate-300 hover:bg-slate-800"
                }
              `}
                    >
                      <Icon size={20} />

                      {item.title}
                    </Link>
                  );
                })}
              </div>

              {/* User */}

              {authUser ? (
                <div className="mt-6 border-t border-slate-800 pt-5">
                  <div className="flex items-center gap-3 mb-5">
                    <div
                      className="
                h-12
                w-12
                rounded-full
                bg-gradient-to-r
                from-amber-400
                to-orange-500
                flex
                items-center
                justify-center
                text-black
                font-bold
              "
                    >
                      {authUser?.username?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div>
                      <p className="text-white font-semibold">
                        {authUser.username}
                      </p>

                      <p className="text-slate-400 text-sm">Explorer</p>
                    </div>
                  </div>

                  <button
                    onClick={() => navigate("/profile")}
                    className="
              w-full
              rounded-xl
              bg-slate-900
              py-3
              mb-3
              text-white
            "
                  >
                    My Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="
              w-full
              rounded-xl
              bg-red-500
              py-3
              text-white
              font-semibold
            "
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => navigate("/login")}
                    className="
              w-full
              rounded-xl
              border
              border-slate-700
              py-3
              text-white
            "
                  >
                    Login
                  </button>

                  <button
                    onClick={() => navigate("/signup")}
                    className="
              w-full
              rounded-xl
              bg-gradient-to-r
              from-amber-400
              to-orange-500
              py-3
              text-black
              font-semibold
            "
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Navbar;
