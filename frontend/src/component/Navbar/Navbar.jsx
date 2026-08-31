import React, {
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

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
        title: "AI",
        icon: Bot,
        path: "/chatAI",
      },
    ],
    []
  );

  const handleSearch = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch?.(value);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  useEffect(() => {
    const close = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target)
      ) {
        setProfileOpen(false);
      }
    };

    window.addEventListener("mousedown", close);

    return () =>
      window.removeEventListener("mousedown", close);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  return (
    <header
      className="
      fixed
      top-4
      left-1/2
      -translate-x-1/2
      z-50
      w-[95%]
      max-w-7xl
      "
    >
      <div
        className="
        h-16
        rounded-2xl
        border
        border-zinc-800
        bg-[#111318]
        shadow-[0_15px_40px_rgba(0,0,0,0.45)]
        px-6
        flex
        items-center
        justify-between
        "
      >
        {/* LOGO */}

        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={() =>
            navigate(authUser ? "/explore" : "/")
          }
          className="
          flex
          items-center
          gap-3
          cursor-pointer
          "
        >
          <div
            className="
            h-11
            w-11
            rounded-xl
            overflow-hidden
            border
            border-zinc-700
            "
          >
            <img
              src="https://www.shutterstock.com/image-vector/north-waypoint-logo-vector-stock-260nw-2093364898.jpg"
              alt="WayPoint"
              className="
              w-full
              h-full
              object-cover
              "
            />
          </div>

          <div className="hidden sm:block">
            <h1
              className="
              text-xl
              font-extrabold
              tracking-tight
              text-white
              "
            >
              WayPoint
            </h1>

            <p
              className="
              text-[11px]
              text-zinc-500
              "
            >
              Discover • Share • Explore
            </p>
          </div>
        </motion.div>

        {/* ================= DESKTOP NAVIGATION ================= */}

<nav
  className="
  hidden
  lg:flex
  items-center
  gap-2
  bg-[#181B22]
  border
  border-zinc-800
  rounded-2xl
  p-1
  "
>
  {links.map((item) => {
    const Icon = item.icon;

    const active = location.pathname === item.path;

    return (
      <Link
        key={item.path}
        to={item.path}
        className={`
        relative
        flex
        items-center
        gap-2
        px-4
        py-2.5
        rounded-xl
        text-sm
        font-medium
        transition-all
        duration-300

        ${
          active
            ? "text-white"
            : "text-zinc-400 hover:text-white"
        }
        `}
      >
        {active && (
          <motion.div
            layoutId="navbar-active"
            transition={{
              type: "spring",
              stiffness: 350,
              damping: 28,
            }}
            className="
            absolute
            inset-0
            rounded-xl
            bg-[#242833]
            border
            border-zinc-700
            "
          />
        )}

        <span
          className="
          relative
          z-10
          flex
          items-center
          gap-2
          "
        >
          <Icon size={17} />

          {item.title}
        </span>
      </Link>
    );
  })}
</nav>

{/* ================= SEARCH ================= */}

{isExplore && (
  <div
    className="
    hidden
    xl:block
    w-80
    "
  >
    <div className="relative">
      <Search
        size={17}
        className="
        absolute
        left-4
        top-1/2
        -translate-y-1/2
        text-zinc-500
        "
      />

      <input
        value={query}
        onChange={handleSearch}
        placeholder="Search places, users..."
        className="
        w-full
        h-11
        rounded-2xl
        bg-[#181B22]
        border
        border-zinc-800
        pl-11
        pr-4
        text-sm
        text-white
        placeholder:text-zinc-500
        outline-none
        transition-all
        duration-300

        hover:border-zinc-700

        focus:border-amber-500
        focus:ring-2
        focus:ring-amber-500/10
        "
      />
    </div>
  </div>

)}

{/* ================= USER ================= */}

<div
  className="
  flex
  items-center
  gap-3
  "
>
  {authUser ? (
    <div
      className="relative hidden md:block"
      ref={dropdownRef}
    >
      <button
        onClick={() => setProfileOpen(!profileOpen)}
        className="
        flex
        items-center
        gap-3
        px-2
        py-2
        rounded-2xl
        bg-[#181B22]
        border
        border-zinc-800
        hover:border-zinc-700
        hover:bg-[#1E222B]
        transition-all
        duration-300
        "
      >
        <div
          className="
          h-10
          w-10
          rounded-xl
          bg-amber-500
          text-black
          font-bold
          flex
          items-center
          justify-center
          shadow-lg
          "
        >
          {authUser.username
            ?.charAt(0)
            .toUpperCase()}
        </div>

        <div className="text-left">
          <p
            className="
            text-sm
            font-semibold
            text-white
            "
          >
            {authUser.username}
          </p>

          <p
            className="
            text-xs
            text-zinc-500
            "
          >
            View Profile
          </p>
        </div>

        <ChevronDown
          size={18}
          className={`
          text-zinc-400
          transition-transform
          duration-300

          ${
            profileOpen
              ? "rotate-180"
              : ""
          }
          `}
        />
      </button>

      <AnimatePresence>
        {profileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -12,
              scale: 0.96,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -12,
              scale: 0.96,
            }}
            transition={{
              duration: 0.18,
            }}
            className="
            absolute
            right-0
            mt-3
            w-64
            rounded-2xl
            bg-[#181B22]
            border
            border-zinc-800
            overflow-hidden
            shadow-2xl
            "
          >
            <div
              className="
              px-5
              py-4
              border-b
              border-zinc-800
              "
            >
              <h3
                className="
                text-white
                font-semibold
                "
              >
                {authUser.username}
              </h3>

              <p
                className="
                text-xs
                text-zinc-500
                "
              >
                Welcome back 👋
              </p>
            </div>

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
              py-3
              text-zinc-300
              hover:bg-[#232833]
              transition
              "
            >
              <User size={18} />
              Profile
            </button>

            <button
              onClick={handleLogout}
              className="
              w-full
              flex
              items-center
              gap-3
              px-5
              py-3
              text-red-400
              hover:bg-red-500/10
              transition
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
    <button
      onClick={() => navigate("/login")}
      className="
      hidden
      md:block
      px-5
      py-2.5
      rounded-xl
      bg-amber-500
      hover:bg-amber-400
      text-black
      font-semibold
      transition-all
      duration-300
      shadow-lg
      "
    >
      Login
    </button>
  )}

  <button
    onClick={() =>
      setMobileOpen(!mobileOpen)
    }
    className="
    lg:hidden
    h-11
    w-11
    rounded-xl
    bg-[#181B22]
    border
    border-zinc-800
    hover:bg-[#232833]
    hover:border-zinc-700
    text-white
    flex
    items-center
    justify-center
    transition-all
    duration-300
    "
  >
    {mobileOpen ? <X /> : <Menu />}
  </button>
</div>

      {/* ================= MOBILE MENU ================= */}

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{
              opacity: 0,
              y: -15,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -15,
              scale: 0.98,
            }}
            transition={{
              duration: 0.25,
            }}
            className="
            lg:hidden
            mt-4
            rounded-3xl
            bg-[#111318]
            border
            border-zinc-800
            shadow-[0_20px_60px_rgba(0,0,0,0.45)]
            overflow-hidden
            "
          >
            {/* Search */}

            {isExplore && (
              <div className="p-5 border-b border-zinc-800">
                <div className="relative">
                  <Search
                    size={17}
                    className="
                    absolute
                    left-4
                    top-1/2
                    -translate-y-1/2
                    text-zinc-500
                    "
                  />

                  <input
                    value={query}
                    onChange={handleSearch}
                    placeholder="Search..."
                    className="
                    w-full
                    h-11
                    rounded-xl
                    bg-[#181B22]
                    border
                    border-zinc-800
                    pl-11
                    pr-4
                    text-sm
                    text-white
                    placeholder:text-zinc-500
                    outline-none
                    focus:border-amber-500
                    transition
                    "
                  />
                </div>
              </div>
            )}

            {/* Navigation */}

            <div className="p-3">
              {links.map((item) => {
                const Icon = item.icon;

                const active =
                  location.pathname === item.path;

                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`
                    flex
                    items-center
                    gap-4
                    px-4
                    py-3
                    rounded-2xl
                    mb-2
                    transition-all
                    duration-300

                    ${
                      active
                        ? "bg-[#242833] text-white border border-zinc-700"
                        : "text-zinc-400 hover:bg-[#1C2028] hover:text-white"
                    }
                    `}
                  >
                    <Icon size={19} />

                    <span className="font-medium">
                      {item.title}
                    </span>
                  </Link>
                );
              })}
            </div>

            {/* User */}

            {authUser && (
              <>
                <div className="border-t border-zinc-800" />

                <div className="p-4 space-y-2">
                  <button
                    onClick={() => {
                      navigate("/profile");
                      setMobileOpen(false);
                    }}
                    className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-2xl
                    text-zinc-300
                    hover:bg-[#1C2028]
                    transition
                    "
                  >
                    <User size={18} />

                    Profile
                  </button>

                  <button
                    onClick={handleLogout}
                    className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-4
                    py-3
                    rounded-2xl
                    text-red-400
                    hover:bg-red-500/10
                    transition
                    "
                  >
                    <LogOut size={18} />

                    Logout
                  </button>
                </div>
              </>
            )}

            {/* Footer */}

            <div
              className="
              border-t
              border-zinc-800
              px-6
              py-4
              text-center
              "
            >
              <p className="text-xs text-zinc-500">
                WayPoint © 2026
              </p>

              <p className="text-[11px] text-zinc-600 mt-1">
                Discover • Share • Explore
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;