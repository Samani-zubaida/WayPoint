import { useEffect, useState } from "react";
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

import PostGrid from "../userpost/PostGrid";

const filters = [
  { label: "All", icon: <FiCompass /> },
  { label: "Mountains", icon: <FiMapPin /> },
  { label: "Beaches", icon: <FiSun /> },
  { label: "Nature", icon: <FiCamera /> },
  { label: "Cities", icon: <FiHome /> },
  { label: "Food", icon: <FiCoffee /> },
  { label: "Historical", icon: <FiCompass /> },
];

export default function ViewPost() {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

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
        const text = [
          post.title,
          post.description,
          post.category,
          post.location?.placeName,
          post.location?.city,
          post.location?.state,
          post.location?.country,
          post.user?.username,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return text.includes(q);
      });
    }

    if (category !== "All") {
      result = result.filter(
        (post) =>
          post.category?.toLowerCase() ===
          category.toLowerCase()
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
    <div className="min-h-screen bg-[#0b0b0b] text-white">
              <main className="w-full px-2 sm:px-3 lg:px-4 pt-20 pb-8">

        {/* Sticky Search + Filters */}

        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="
            sticky
            top-20
            z-30
            mb-5
            rounded-2xl
            border
            border-white/10
            bg-[#121212]/95
            backdrop-blur-xl
            p-3
          "
        >

          {/* Search */}

          <div className="relative">

            <FiSearch
              className="
                absolute
                left-4
                top-1/2
                -translate-y-1/2
                text-slate-500
                text-lg
              "
            />

            <input
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search places..."
              className="
                w-full
                rounded-xl
                border
                border-white/10
                bg-[#1a1a1a]
                py-3
                pl-11
                pr-4
                text-white
                placeholder:text-slate-500
                outline-none
                transition
                focus:border-white/30
              "
            />

          </div>

          {/* Filters */}

          <div
            className="
              mt-3
              flex
              gap-2
              overflow-x-auto
              scrollbar-hide
              pb-1
            "
          >

            {filters.map((item) => {

              const active =
                activeFilter === item.label;

              return (

                <button
                  key={item.label}
                  onClick={() => handleFilter(item.label)}
                  className={`
                    flex
                    items-center
                    gap-2
                    whitespace-nowrap
                    rounded-full
                    px-4
                    py-2
                    text-sm
                    transition

                    ${
                      active
                        ? "bg-white text-black font-semibold"
                        : "bg-[#1a1a1a] text-slate-300 border border-white/10 hover:bg-[#242424]"
                    }
                  `}
                >
                  {item.icon}
                  {item.label}
                </button>

              );

            })}

          </div>

        </motion.div>

        {/* Grid */}

        {loading ? (

          <div
            className="
              grid
              grid-cols-3
              sm:grid-cols-4
              lg:grid-cols-5
              xl:grid-cols-6
              gap-2
            "
          >

            {[...Array(18)].map((_, index) => (

              <div
                key={index}
                className="
                  aspect-square
                  rounded-2xl
                  bg-[#171717]
                  animate-pulse
                "
              />

            ))}

          </div>

        ) : (

          <PostGrid posts={filteredPosts} />

        )}


                {loading ? (

          <div
            className="
              grid
              grid-cols-3
              sm:grid-cols-4
              lg:grid-cols-5
              xl:grid-cols-6
              gap-2
            "
          >
            {[...Array(18)].map((_, index) => (
              <div
                key={index}
                className="
                  aspect-square
                  rounded-2xl
                  bg-[#171717]
                  animate-pulse
                "
              />
            ))}
          </div>

        ) : filteredPosts.length ? (

          <PostGrid posts={filteredPosts} />

        ) : (

          <div className="flex justify-center py-20">

            <div className="text-center">

              <div className="text-6xl mb-5">
                📷
              </div>

              <h2 className="text-2xl font-bold text-white">
                No Posts Found
              </h2>

              <p className="mt-3 text-slate-500">
                Try another search or filter.
              </p>

            </div>

          </div>

        )}

      </main>

    </div>

  );

}
