import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  FiSearch,
  FiCompass,
  FiMapPin,
  FiCamera,
  FiCoffee,
  FiSun,
  FiHome,
} from "react-icons/fi";

import Navbar from "../../component/Navbar/Navbar";
import PostGrid from "../userpost/PostGrid";

const filters = [
  {
    label: "All",
    icon: <FiCompass />,
  },
  {
    label: "Mountains",
    icon: <FiMapPin />,
  },
  {
    label: "Beaches",
    icon: <FiSun />,
  },
  {
    label: "Nature",
    icon: <FiCamera />,
  },
  {
    label: "Cities",
    icon: <FiHome />,
  },
  {
    label: "Food",
    icon: <FiCoffee />,
  },
  {
    label: "Historical",
    icon: <FiCompass />,
  },
];

export default function ViewPost() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");

  const [activeFilter, setActiveFilter] = useState("All");

  const [mouse, setMouse] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const move = (e) => {
      setMouse({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", move);

    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/api/posts/all");

        setPosts(res.data);
        setFilteredPosts(res.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);
  const applyFilters = (query, category) => {
    let result = [...posts];

    if (query.trim()) {
      const q = query.toLowerCase();

      result = result.filter((post) => {
        const searchableText = [
          post.title,
          post.description,
          post.category,
          post.location?.placeName,
          post.location?.city,
          post.location?.state,
          post.location?.country,
          post.user?.name,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchableText.includes(q);
      });
    }

    if (category !== "All") {
      result = result.filter(
        (post) => post.category?.toLowerCase() === category.toLowerCase(),
      );
    }

    setFilteredPosts(result);
  };

  const handleSearch = (value) => {
    setSearchQuery(value);

    applyFilters(value, activeFilter);
  };

  const handleFilter = (category) => {
    setActiveFilter(category);

    applyFilters(searchQuery, category);
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#070B14] text-white">
      {/* Cursor Glow */}

      <motion.div
        className="fixed w-80 h-80 rounded-full bg-cyan-400/10 blur-[120px] pointer-events-none z-0"
        animate={{
          x: mouse.x - 150,
          y: mouse.y - 150,
        }}
        transition={{
          type: "spring",
          stiffness: 120,
          damping: 20,
        }}
      />

      {/* Aurora */}

      <motion.div
        animate={{
          x: [0, 120, 0],
          y: [0, -80, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 18,
          ease: "easeInOut",
        }}
        className="fixed -top-60 -left-40 w-[700px] h-[700px] rounded-full bg-cyan-500/10 blur-[180px]"
      />

      <motion.div
        animate={{
          x: [0, -120, 0],
          y: [0, 60, 0],
        }}
        transition={{
          repeat: Infinity,
          duration: 22,
          ease: "easeInOut",
        }}
        className="fixed -bottom-60 -right-60 w-[800px] h-[800px] rounded-full bg-indigo-500/10 blur-[180px]"
      />

      <div
        className="
fixed
inset-0
bg-[radial-gradient(circle_at_top,#1e293b20,transparent_55%)]
"
      />

      <Navbar />

      <main className="relative z-10">
        {/* Sticky Search Area */}
        <section className="relative h-[65vh] min-h-[520px] overflow-hidden">
          {/* Background Image */}

          <img
            src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=2000&q=80"
            alt=""
            className="
      absolute
      inset-0
      w-full
      h-full
      object-cover
      scale-110
    "
          />

          {/* Dark Overlay */}

          <div
            className="
      absolute
      inset-0
      bg-gradient-to-b
      from-black/20
      via-black/40
      to-[#070B14]
    "
          />

          {/* Extra Glow */}

          <div
            className="
      absolute
      inset-0
      bg-[radial-gradient(circle_at_center,rgba(34,211,238,.15),transparent_60%)]
    "
          />

          {/* Content */}

          <div
            className="
      relative
      h-full
      flex
      flex-col
      justify-center
      items-center
      text-center
      px-6
    "
          >
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="
        uppercase
        tracking-[0.35em]
        text-cyan-300
        text-sm
        font-semibold
        mb-6
      "
            >
              SNAP • DISCOVER • EXPLORE
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="
        text-5xl
        md:text-7xl
        xl:text-8xl
        font-black
        leading-none
        max-w-6xl
      "
            >
              Find Beautiful
              <br />
              <span
                className="
          bg-gradient-to-r
          from-cyan-300
          via-white
          to-blue-400
          bg-clip-text
          text-transparent
        "
              >
                Hidden Places
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="
        mt-8
        text-slate-300
        text-lg
        max-w-3xl
        leading-8
      "
            >
              Explore destinations shared by travellers around the world. Every
              photo tells a story waiting to be discovered.
            </motion.p>
          </div>
        </section>
        <section className="sticky top-20 z-40 -mt-14">
          <div
            className="
      backdrop-blur-2xl
      bg-[#070B14]/70
      border-b
      border-white/5
      "
          >
            <div className="max-w-[1700px] mx-auto px-4 md:px-8 py-5">
              {/* Search */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: -30,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.6,
                }}
                className="
          mx-auto
          max-w-4xl
          "
              >
                <div
                  className="
            group
            relative
            rounded-full
            border
            border-white/10
            bg-white/5
            backdrop-blur-xl
            overflow-hidden
            transition-all
            duration-500
            hover:border-cyan-400/30
            hover:bg-white/[0.07]
            "
                >
                  {/* Glow */}

                  <div
                    className="
              absolute
              inset-0
              opacity-0
              group-hover:opacity-100
              transition
              duration-700
              bg-gradient-to-r
              from-cyan-500/5
              via-transparent
              to-indigo-500/5
              "
                  />

                  <div
                    className="
              relative
              flex
              items-center
              px-7
              py-4
              "
                  >
                    <FiSearch
                      className="
                text-cyan-300
                text-xl
                "
                    />

                    <input
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      placeholder="Search places, mountains, beaches..."
                      className="
                flex-1
                bg-transparent
                px-5
                text-white
                text-lg
                outline-none
                placeholder:text-slate-500
                "
                    />

                    <div
                      className="
                hidden
                md:flex
                px-3
                py-1
                rounded-full
                bg-white/5
                text-xs
                text-slate-400
                border
                border-white/10
                "
                    >
                      ⌘ K
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Filters */}

              <motion.div
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: 0.2,
                }}
                className="
          mt-6
          flex
          gap-4
          overflow-x-auto
          pb-2
          no-scrollbar
          "
              >
                {filters.map((item) => {
                  const active = activeFilter === item.label;

                  return (
                    <button
                      key={item.label}
                      onClick={() => handleFilter(item.label)}
                      className={`
                group
                relative
                flex
                items-center
                gap-2
                whitespace-nowrap
                rounded-full
                px-6
                py-3
                transition-all
                duration-300
                border

                ${
                  active
                    ? "bg-gradient-to-r from-cyan-400 to-sky-500 text-black border-transparent shadow-[0_10px_35px_rgba(34,211,238,.35)]"
                    : "bg-white/5 border-white/10 text-slate-300 hover:border-cyan-400/30 hover:bg-white/10"
                }

                `}
                    >
                      <span className="text-lg">{item.icon}</span>

                      <span
                        className="
                  font-medium
                  "
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </motion.div>
            </div>
          </div>
        </section>

        <section
          className="
relative
max-w-[1700px]
mx-auto
px-4
md:px-8
pt-8
"
        >
          <div
            className="
flex
items-center
justify-between
mb-8
"
          >
            <div>
              <h2
                className="
text-2xl
font-bold
"
              >
                {filteredPosts.length}

                <span
                  className="
text-slate-400
ml-2
font-normal
"
                >
                  Places
                </span>
              </h2>
            </div>

            <div
              className="
hidden
md:flex
items-center
gap-3
text-slate-500
text-sm
"
            >
              Showing
              <span
                className="
text-white
"
              >
                {activeFilter}
              </span>
            </div>
          </div>
        </section>

        <section
          className="
    relative
    max-w-[1700px]
    mx-auto
    px-4
    md:px-8
    pb-20
  "
        >
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="
            h-[420px]
            rounded-[30px]
            bg-white/5
            animate-pulse
          "
                />
              ))}
            </div>
          ) : filteredPosts.length > 0 ? (
            <PostGrid posts={filteredPosts} />
          ) : (
            <div className="flex justify-center py-28">
              <div
                className="
          max-w-lg
          text-center
          rounded-[32px]
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          px-10
          py-16
        "
              >
                <div className="text-7xl mb-6">🧭</div>

                <h2 className="text-3xl font-bold mb-3">No Places Found</h2>

                <p className="text-slate-400">
                  Try another search or choose another category.
                </p>
              </div>
            </div>
          )}
        </section>

        <section
          className="
            relative
            max-w-[1700px]
            mx-auto
            px-4
            md:px-8
            pb-20
          "
        >
          {/* Paste the code above here */}
        </section>
      </main>
    </div>
  );
}
