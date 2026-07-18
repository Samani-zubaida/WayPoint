import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaImages } from "react-icons/fa";

const PostCard = ({ post }) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const image = post.images?.[0];

  const isVideo =
    post.video &&
    (!post.images || post.images.length === 0);

  const openPost = () => {
    navigate(`/post/${post._id}`);
  };

  useEffect(() => {
    if (!videoRef.current || !isVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!videoRef.current) return;

        if (entry.isIntersecting) {
          videoRef.current.play().catch(() => {});
        } else {
          videoRef.current.pause();
        }
      },
      {
        threshold: 0.4,
      }
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, [isVideo]);

  return (
    <motion.article
      layout
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.25,
      }}
      onClick={openPost}
      className="cursor-pointer mb-4 break-inside-avoid"
    >
      <div
        className="
        relative
        overflow-hidden
        rounded-2xl
        bg-[#111111]
        border
        border-white/10
        hover:border-white/20
        transition-all
        duration-300
        "
      >
        {/* ================= IMAGE ================= */}

        {!isVideo && image && (
          <img
            src={image}
            alt={post.title}
            className="
              w-full
              h-auto
              object-cover
            "
          />
        )}

        {/* ================= VIDEO ================= */}

        {isVideo && (
          <video
            ref={videoRef}
            src={post.video}
            muted
            loop
            playsInline
            className="
              w-full
              h-auto
              object-cover
            "
          />
        )}

        {/* ================= CATEGORY ================= */}

        <div
          className="
          absolute
          top-3
          left-3
          bg-black/70
          backdrop-blur-sm
          text-white
          text-[11px]
          px-3
          py-1
          rounded-full
          "
        >
          {post.category}
        </div>

        {/* ================= MULTIPLE IMAGES ================= */}

        {post.images?.length > 1 && (
          <div
            className="
            absolute
            top-3
            right-3
            h-8
            w-8
            rounded-full
            bg-black/70
            flex
            items-center
            justify-center
            text-white
            "
          >
            <FaImages size={12} />
          </div>
        )}

        {/* ================= VIDEO BADGE ================= */}

        {isVideo && (
          <div
            className="
            absolute
            top-3
            right-3
            h-8
            w-8
            rounded-full
            bg-black/70
            flex
            items-center
            justify-center
            text-white
            "
          >
            <FaPlay size={11} />
          </div>
        )}

        {/* ================= TITLE ================= */}

        <div
          className="
          absolute
          bottom-0
          left-0
          right-0
          bg-black/60
          backdrop-blur-sm
          p-4
          "
        >
          <h2
            className="
            text-white
            font-semibold
            text-sm
            md:text-base
            line-clamp-2
            "
          >
            {post.title}
          </h2>

          {post.location?.placeName && (
            <p
              className="
              text-gray-300
              text-xs
              mt-1
              line-clamp-1
              "
            >
              📍 {post.location.placeName}
            </p>
          )}
        </div>
      </div>

      {/* ==========================================================
          DESKTOP ONLY
          Hide profile, likes & comments on mobile
      =========================================================== */}

      <div
        className="
        hidden
        md:flex
        items-center
        justify-between
        mt-3
        px-1
        "
      >
        <div>
          <p className="text-white text-sm font-medium">
            {post.user?.username || "Anonymous"}
          </p>

          <p className="text-xs text-gray-500">
            {new Date(post.createdAt).toLocaleDateString()}
          </p>
        </div>

        <div className="flex items-center gap-4 text-gray-400 text-sm">
          <span>❤️ {post.likes?.length || 0}</span>

          <span>💬 {post.comments?.length || 0}</span>
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;