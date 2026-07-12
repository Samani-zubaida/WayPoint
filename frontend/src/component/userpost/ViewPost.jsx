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
  FiTrendingUp,
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

    return () =>
      window.removeEventListener("mousemove", move);

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


const fadeUp = {

  hidden: {
    opacity: 0,
    y: 30,
  },

  show: {
    opacity: 1,
    y: 0,

    transition: {
      duration: .6,
    },
  },

};

const stagger = {

  hidden: {},

  show: {

    transition: {

      staggerChildren: .08,

    },

  },

};

return (

<div className="relative min-h-screen overflow-hidden bg-[#070B14] text-white">
 <div className="hidden lg:block">

<motion.div

className="
fixed
w-[420px]
h-[420px]
rounded-full
pointer-events-none
blur-[180px]
bg-cyan-400/10
mix-blend-screen
z-0
"

animate={{
x:mouse.x-210,
y:mouse.y-210,
}}

transition={{
type:"spring",
stiffness:120,
damping:20,
}}

/>

</div>

<motion.div

animate={{
x:[0,140,0],
y:[0,-100,0],
}}

transition={{
repeat:Infinity,
duration:20,
ease:"easeInOut",
}}

className="
fixed
-top-80
-left-52
w-[600px]
lg:w-[900px]
h-[600px]
lg:h-[900px]
rounded-full
bg-cyan-500/10
blur-[180px]
"
/>

<motion.div

animate={{
x:[0,-140,0],
y:[0,120,0],
}}

transition={{
repeat:Infinity,
duration:22,
ease:"easeInOut",
}}

className="
fixed
-bottom-80
-right-60
w-[650px]
lg:w-[950px]
h-[650px]
lg:h-[950px]
rounded-full
bg-indigo-500/10
blur-[180px]
"
/>

<div

className="
fixed
inset-0
bg-[radial-gradient(circle_at_top,rgba(255,255,255,.04),transparent_60%)]
"
/>

<main className="relative z-10">

<div
className="
max-w-[1700px]
mx-auto

px-4
sm:px-6
lg:px-10
xl:px-12

pt-8
lg:pt-12
"
>
  {/* =======================================================
    TOP DASHBOARD
======================================================= */}

<motion.div
    variants={stagger}
    initial="hidden"
    animate="show"
    className="
    grid
    lg:grid-cols-[1.4fr_.9fr]
    gap-6
    items-stretch
"
>

    {/* ================= LEFT ================= */}

    <motion.div
        variants={fadeUp}
        className="
        relative
        overflow-hidden
        rounded-[34px]
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-2xl
        p-8
        lg:p-10
"
    >

        {/* floating gradient */}

        <div
            className="
            absolute
            -top-20
            -right-20
            h-72
            w-72
            rounded-full
            bg-cyan-500/10
            blur-[120px]
"
        />

        <p
            className="
            uppercase
            tracking-[.35em]
            text-cyan-300
            text-xs
            font-semibold
"
        >
            DISCOVER • SHARE • EXPLORE
        </p>

        <h1
            className="
            mt-4
            text-4xl
            md:text-5xl
            xl:text-6xl
            font-black
            leading-tight
"
        >
            Explore Amazing
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
                Travel Stories
            </span>
        </h1>

        <p
            className="
            mt-6
            max-w-2xl
            text-slate-400
            leading-8
"
        >
            Discover breathtaking destinations shared by travelers around
            the world. Search locations, browse categories and find your
            next adventure.
        </p>

        {/* SEARCH */}

        <div
            className="
            mt-10
            relative
"
        >

            <FiSearch
                className="
                absolute
                left-6
                top-1/2
                -translate-y-1/2
                text-cyan-300
                text-xl
"
            />

            <input
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search mountains, beaches, cities..."
                className="
                w-full
                rounded-full
                bg-white/5
                border
                border-white/10
                py-5
                pl-16
                pr-6
                text-white
                outline-none
                placeholder:text-slate-500
                transition
                focus:border-cyan-400
                focus:bg-white/[0.07]
"
            />

        </div>

    </motion.div>

    {/* ================= RIGHT ================= */}

    <motion.div
        variants={fadeUp}
        className="
        grid
        grid-cols-2
        gap-5
"
    >

        <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            backdrop-blur-xl
            p-6
"
        >

            <div
                className="
                h-14
                w-14
                rounded-2xl
                bg-cyan-500/20
                flex
                items-center
                justify-center
                text-cyan-300
                text-2xl
"
            >
                <FiCompass />
            </div>

            <h2 className="mt-5 text-3xl font-black">
                {posts.length}
            </h2>

            <p className="mt-2 text-slate-400">
                Total Places
            </p>

        </div>

        <div
            className="
            rounded-3xl
            border
            border-white/10
            bg-white/[0.04]
            backdrop-blur-xl
            p-6
"
        >

            <div
                className="
                h-14
                w-14
                rounded-2xl
                bg-purple-500/20
                flex
                items-center
                justify-center
                text-purple-300
                text-2xl
"
            >
                <FiTrendingUp />
            </div>

            <h2 className="mt-5 text-3xl font-black">
                {filteredPosts.length}
            </h2>

            <p className="mt-2 text-slate-400">
                Showing
            </p>

        </div>

        <div
            className="
            col-span-2
            rounded-3xl
            border
            border-white/10
            bg-gradient-to-r
            from-cyan-500/10
            to-indigo-500/10
            backdrop-blur-xl
            p-6
"
        >

            <p className="text-slate-400">
                Active Category
            </p>

            <h2
                className="
                mt-2
                text-3xl
                font-black
"
            >
                {activeFilter}
            </h2>

        </div>

    </motion.div>

</motion.div>

{/* =======================================================
    FILTER BAR
======================================================= */}

<motion.section
    variants={fadeUp}
    initial="hidden"
    animate="show"
    className="mt-10"
>

    <div
        className="
        flex
        flex-col
        lg:flex-row
        lg:items-center
        lg:justify-between
        gap-6
        "
    >

        <div>

            <h2
                className="
                text-3xl
                font-black
                "
            >
                Discover Places
            </h2>

            <p
                className="
                mt-2
                text-slate-400
                "
            >
                Browse destinations shared by explorers around the world.
            </p>

        </div>

        <div
            className="
            rounded-full
            border
            border-white/10
            bg-white/5
            px-5
            py-3
            text-sm
            text-slate-400
            "
        >
            Showing
            <span className="ml-2 font-semibold text-white">
                {filteredPosts.length}
            </span>
            {" "}results
        </div>

    </div>

    {/* FILTERS */}

    <div
        className="
        mt-8
        flex
        gap-3
        overflow-x-auto
        pb-2
        no-scrollbar
        "
    >

        {filters.map((item) => {

            const active =
                activeFilter === item.label;

            return (

                <motion.button

                    whileHover={{
                        y: -3,
                        scale: 1.03,
                    }}

                    whileTap={{
                        scale: .96,
                    }}

                    key={item.label}

                    onClick={() =>
                        handleFilter(item.label)
                    }

                    className={`
                    flex
                    items-center
                    gap-3
                    whitespace-nowrap
                    rounded-full
                    px-6
                    py-3
                    border
                    transition-all
                    duration-300

                    ${
                        active
                            ? `
                            bg-gradient-to-r
                            from-cyan-400
                            to-sky-500
                            text-black
                            border-transparent
                            shadow-[0_15px_45px_rgba(34,211,238,.35)]
                            `
                            : `
                            bg-white/[0.05]
                            border-white/10
                            text-slate-300
                            hover:bg-white/[0.08]
                            hover:border-cyan-500/30
                            `
                    }
                    `}
                >

                    <span className="text-lg">
                        {item.icon}
                    </span>

                    <span className="font-medium">
                        {item.label}
                    </span>

                </motion.button>

            );

        })}

    </div>

</motion.section>

{/* =======================================================
    POSTS SECTION
======================================================= */}

<motion.section
    variants={stagger}
    initial="hidden"
    animate="show"
    className="
    mt-10
    pb-24
"
>

    {/* Decorative Background */}

    <div
        className="
        absolute
        left-0
        right-0
        h-full
        pointer-events-none
        -z-10
    "
    >
        <div
            className="
            absolute
            top-40
            left-1/4
            h-72
            w-72
            rounded-full
            bg-cyan-500/5
            blur-[120px]
        "
        />

        <div
            className="
            absolute
            bottom-0
            right-1/4
            h-80
            w-80
            rounded-full
            bg-indigo-500/5
            blur-[140px]
        "
        />
    </div>

    {/* Loading */}

    {loading ? (

        <div
            className="
            grid
            grid-cols-1
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
            gap-8
        "
        >

            {[...Array(8)].map((_, i) => (

                <motion.div

                    key={i}

                    initial={{
                        opacity:0,
                        y:30,
                    }}

                    animate={{
                        opacity:1,
                        y:0,
                    }}

                    transition={{
                        delay:i*0.08,
                    }}

                    className="
                    h-[420px]
                    rounded-[30px]
                    bg-white/[0.04]
                    border
                    border-white/10
                    overflow-hidden
                    animate-pulse
                "
                >

                    <div className="h-64 bg-white/5" />

                    <div className="p-6 space-y-4">

                        <div className="h-6 rounded bg-white/10" />

                        <div className="h-4 rounded bg-white/10 w-2/3" />

                        <div className="h-4 rounded bg-white/10 w-1/2" />

                    </div>

                </motion.div>

            ))}

        </div>

    ) : filteredPosts.length > 0 ? (

        <motion.div
            variants={fadeUp}
        >

            <PostGrid posts={filteredPosts} />

        </motion.div>

    ) : (

        <motion.div

            initial={{
                opacity:0,
                scale:.95,
            }}

            animate={{
                opacity:1,
                scale:1,
            }}

            className="
            flex
            justify-center
            py-24
        "
        >

            <div
                className="
                max-w-xl
                w-full
                rounded-[36px]
                border
                border-white/10
                bg-white/[0.04]
                backdrop-blur-3xl
                p-12
                text-center
            "
            >

                <motion.div

                    animate={{
                        rotate:[0,10,-10,0],
                    }}

                    transition={{
                        repeat:Infinity,
                        duration:4,
                    }}

                    className="
                    mx-auto
                    mb-8
                    h-24
                    w-24
                    rounded-full
                    bg-cyan-500/10
                    flex
                    items-center
                    justify-center
                "
                >

                    <FiCompass
                        className="text-5xl text-cyan-300"
                    />

                </motion.div>

                <h2
                    className="
                    text-4xl
                    font-black
                "
                >
                    Nothing Found
                </h2>

                <p
                    className="
                    mt-5
                    text-slate-400
                    leading-8
                "
                >
                    We couldn't find any places matching your search.
                    Try changing the category or search for something else.
                </p>

            </div>

        </motion.div>

    )}

</motion.section>

</div>

</main>

</div>
)}