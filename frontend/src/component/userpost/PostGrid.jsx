import Masonry from "react-masonry-css";
import { motion } from "framer-motion";
import PostCard from "./PostCard";

const breakpointColumnsObj = {
  default: 4,
  1536: 4,
  1280: 3,
  1024: 3,
  768: 2,
  640: 2,
  0: 1,
};

export default function PostGrid({ posts }) {
  if (!posts?.length) {
    return (
      <div className="flex justify-center items-center py-40">
        <div className="text-center">

          <div className="text-7xl mb-6">
            📷
          </div>

          <h2 className="text-3xl font-bold text-white">
            No Places Found
          </h2>

          <p className="text-slate-400 mt-3">
            Try another search or category.
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
            staggerChildren: 0.08,
          },
        },
      }}
    >
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-5"
        columnClassName="space-y-5"
      >
        {posts.map((post, index) => (
          <motion.div
            key={post._id}
            variants={{
              hidden: {
                opacity: 0,
                y: 50,
              },
              show: {
                opacity: 1,
                y: 0,
              },
            }}
            transition={{
              duration: .5,
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