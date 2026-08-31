import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import PostCard from "./PostCard";

const breakpointColumnsObj = {
  default: 5,
  1600: 5,
  1400: 4,
  1200: 4,
  1024: 3,
  768: 3,
  640: 3,
  0: 3,
};
export default function PostGrid({ posts }) {
  if (!posts?.length) {
    return (
      <div className="flex justify-center py-20">
        <div className="text-center">
          <div className="text-6xl mb-4">📷</div>

          <h2 className="text-white text-2xl font-bold">
            No Posts Found
          </h2>

          <p className="text-slate-400 mt-2">
            Try another search.
          </p>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: 0.05,
          },
        },
      }}
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-2 md:-ml-3 w-auto"
        columnClassName="pl-2 md:pl-3 bg-clip-padding"
      >
        {posts.map((post, index) => (
          <motion.div
            key={post._id}
            variants={{
              hidden: {
                opacity: 0,
                y: 20,
              },
              show: {
                opacity: 1,
                y: 0,
              },
            }}
            transition={{
              duration: 0.35,
            }}
          >
            <PostCard
              post={post}
              index={index}
            />
          </motion.div>
        ))}
      </Masonry>
    </motion.div>
  );
}