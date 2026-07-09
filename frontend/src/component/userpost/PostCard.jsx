import { useNavigate } from "react-router-dom";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaImages, FaHeart, FaComment } from "react-icons/fa";
import { FiUser } from "react-icons/fi";

const PostCard = ({ post, index }) => {
  const navigate = useNavigate();
  const videoRef = useRef(null);

  const openPost = () => {
    navigate(`/post/${post._id}`);
  };

  const image = post.images?.[0];

  const isVideo = !!post.video && (!post.images || post.images.length === 0);

  const likes = post.likes?.length || 0;
  const comments = post.comments?.length || 0;
  const username = post.user?.name || "Anonymous";

  useEffect(() => {
    if (!videoRef.current) return;

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
        threshold: 0.5,
      },
    );

    observer.observe(videoRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <motion.article
      layout
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.3,
      }}
      onClick={openPost}
      className="group cursor-pointer mb-6"
    >
      <div
        className="
        rounded-[28px]
        overflow-hidden
        bg-[#10131c]
        border
        border-white/5
        hover:border-cyan-400/20
        transition-all
        duration-500
        shadow-xl
        hover:shadow-cyan-500/20
      "
      >
        {/* MEDIA */}

        <div className="relative overflow-hidden">
          {!isVideo && image && (
            <img
              src={image}
              alt={post.title}
              className="
              w-full
              h-auto
              object-cover
              transition-all
              duration-700
              group-hover:scale-105
            "
            />
          )}

          {isVideo && (
            <video
              ref={videoRef}
              src={post.video}
              muted
              autoPlay
              loop
              playsInline
              className="
              w-full
              h-auto
              object-cover
              transition-all
              duration-700
              group-hover:scale-105
            "
            />
          )}

          {/* Gradient */}

          <div
            className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/60
            via-transparent
            to-transparent
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-500
          "
          />

          {/* Category */}

          <div
            className="
            absolute
            top-4
            left-4
            bg-black/50
            backdrop-blur-xl
            rounded-full
            px-4
            py-1.5
            text-xs
            font-semibold
            tracking-wide
          "
          >
            {post.category}
          </div>

          {/* Media Badge */}

          {post.images?.length > 1 && (
            <div
              className="
              absolute
              top-4
              right-4
              bg-black/60
              backdrop-blur-xl
              p-2.5
              rounded-full
            "
            >
              <FaImages size={13} />
            </div>
          )}

          {isVideo && (
            <div
              className="
              absolute
              top-4
              right-4
              bg-black/60
              backdrop-blur-xl
              p-2.5
              rounded-full
            "
            >
              <FaPlay size={13} />
            </div>
          )}
        </div>

        {/* CONTENT STARTS HERE */}
        <div className="p-5">
          {/* Category */}

          <div className="mb-3">
            <span
              className="
              inline-flex
              items-center
              rounded-full
              bg-cyan-500/10
              border
              border-cyan-400/20
              px-3
              py-1
              text-xs
              font-semibold
              uppercase
              tracking-wider
              text-cyan-300
            "
            >
              {post.category}
            </span>
          </div>

          {/* Title */}

          <h2
            className="
            text-xl
            font-bold
            text-white
            line-clamp-2
            leading-tight
            transition-colors
            duration-300
            group-hover:text-cyan-300
          "
          >
            {post.title}
          </h2>

          {/* Description */}

          <p
            className="
            mt-3
            text-sm
            text-slate-400
            line-clamp-2
            leading-6
          "
          >
            {post.description}
          </p>

          {/* Divider */}

          <div className="my-5 h-px bg-white/5" />

          {/* Footer */}

          <div className="flex items-center justify-between">
            {/* User */}

            <div className="flex items-center gap-3">
              <div
                className="
                h-11
                w-11
                rounded-full
                bg-gradient-to-br
                from-cyan-400
                to-blue-600
                flex
                items-center
                justify-center
                text-white
                font-bold
                shadow-lg
              "
              >
                {username.charAt(0).toUpperCase()}
              </div>

              <div>
                <p className="text-sm font-semibold text-white">{username}</p>

                <p className="text-xs text-slate-500">
                  {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>

            {/* Stats */}

            <div className="flex items-center gap-5">
              <div
                className="
                flex
                items-center
                gap-2
                text-rose-400
              "
              >
                <FaHeart />

                <span className="text-sm">{likes}</span>
              </div>

              <div
                className="
                flex
                items-center
                gap-2
                text-slate-300
              "
              >
                <FaComment />

                <span className="text-sm">{comments}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default PostCard;
