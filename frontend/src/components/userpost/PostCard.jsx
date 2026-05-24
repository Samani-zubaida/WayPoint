import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { MdLocationOn } from "react-icons/md";
import { FiHeart, FiMessageCircle } from "react-icons/fi";

const PostCard = ({ post }) => {

  const navigate = useNavigate();
  const [showFullDesc, setShowFullDesc] = useState(false);

  const openPost = () => {
    navigate(`/post/${post._id}`);
  };

  const image = post.images?.[0];
  const isLongText = post.description?.length > 120;

  return (
    <>
      <div
        onClick={openPost}
        className="
        cursor-pointer
        bg-white
        rounded-2xl
        shadow-md
        hover:shadow-xl
        transition
        flex
        flex-col
        h-[420px]
        overflow-hidden
        "
      >

        {/* LOCATION */}
        <div className="flex items-center justify-between px-3 py-2 bg-gray-50 text-sm">

          <div className="flex items-center gap-1 text-gray-700">
            <MdLocationOn className="text-orange-500 text-lg" />
            <span className="truncate">{post.title}</span>
          </div>

          <span className="text-xs text-gray-500 truncate">
            {post.user?.name}
          </span>

        </div>

        {/* IMAGE */}
        {image && (
          <img
            src={image}
            alt={post.title}
            className="w-full h-[200px] object-cover"
          />
        )}

        {/* CONTENT */}
        <div className="flex flex-col justify-between flex-1 p-4">

          {/* DESCRIPTION */}
          <div className="text-sm text-gray-600">

            <p className="line-clamp-3">
              {post.description}
            </p>

            {isLongText && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowFullDesc(true);
                }}
                className="text-blue-600 text-xs font-medium mt-1 hover:underline"
              >
                Read more
              </button>
            )}

          </div>

          {/* STATS */}
          <div className="flex items-center justify-between mt-3 text-sm text-gray-600">

            <div className="flex items-center gap-4">

              <div className="flex items-center gap-1">
                <FiHeart />
                <span>{post.likes?.length || 0}</span>
              </div>

              <div className="flex items-center gap-1">
                <FiMessageCircle />
                <span>{post.comments?.length || 0}</span>
              </div>

            </div>

            <span className="text-xs text-gray-400">
              {new Date(post.createdAt).toLocaleDateString()}
            </span>

          </div>

        </div>

      </div>

      {/* FULL DESCRIPTION MODAL */}
      {showFullDesc && (

        <div
          onClick={() => setShowFullDesc(false)}
          className="
          fixed
          inset-0
          bg-black/40
          flex
          items-center
          justify-center
          z-50
          p-4
          "
        >

          <div
            onClick={(e) => e.stopPropagation()}
            className="
            bg-white
            rounded-2xl
            max-w-lg
            w-full
            p-6
            shadow-xl
            "
          >

            <h2 className="text-lg font-semibold mb-3">
              {post.title}
            </h2>

            <p className="text-gray-700 leading-relaxed">
              {post.description}
            </p>

            <button
              onClick={() => setShowFullDesc(false)}
              className="
              mt-5
              px-4
              py-2
              bg-black
              text-white
              rounded-lg
              text-sm
              "
            >
              Close
            </button>

          </div>

        </div>

      )}
    </>
  );
};

export default PostCard;