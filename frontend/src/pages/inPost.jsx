import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/authContext";
import Navbar from "../component/Navbar/Navbar.jsx";

const InPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { authUser } = useContext(AuthContext);
  const [currentImage, setCurrentImage] = useState(0);
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const [commentText, setCommentText] = useState("");

  const menuRef = useRef(null);

  /* FETCH POST */
  const minSwipeDistance = 50;

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;

    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      setCurrentImage((prev) => (prev + 1) % post.images.length);
    }

    if (isRightSwipe) {
      setCurrentImage(
        (prev) => (prev - 1 + post.images.length) % post.images.length,
      );
    }
  };
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/post/${id}`, {
          withCredentials: true,
        });

        setPost(res.data);
        setLikes(res.data.likes?.length || 0);
        setLiked(res.data.likes?.includes(authUser?._id));
      } catch (error) {
        console.error("Error fetching post", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, authUser]);

  /* CLOSE MENU */
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* DELETE POST */
  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;

    try {
      await axios.delete(`/api/posts/${post._id}`, {
        withCredentials: true,
      });

      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  /* LIKE */
  const handleLike = async () => {
    try {
      const res = await axios.put(
        `/api/posts/${post._id}/like`,
        {},
        { withCredentials: true },
      );

      const updated = res.data;

      setLikes(updated.likes.length);
      setLiked(updated.likes.includes(authUser?._id));
    } catch (error) {
      console.error(error);
    }
  };

  /* ADD COMMENT */
  const handleAddComment = async () => {
    if (!commentText.trim()) return;

    try {
      const res = await axios.post(
        `/api/comments/${post._id}`,
        { text: commentText },
        { withCredentials: true },
      );

      setPost((prev) => ({
        ...prev,
        comments: [...prev.comments, res.data],
      }));

      setCommentText("");
    } catch (error) {
      console.error(error);
    }
  };

  /* DELETE COMMENT */
  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`/api/comments/${commentId}`, {
        withCredentials: true,
      });

      setPost((prev) => ({
        ...prev,
        comments: prev.comments.filter((c) => c._id !== commentId),
      }));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading)
    return <p className="text-center mt-20 text-gray-500">Loading post...</p>;

  if (!post)
    return <p className="text-center mt-20 text-gray-500">Post not found</p>;

  const isOwner = authUser?._id === post?.user?._id;

  return (
    <>
      <Navbar />

      <div className="max-w-6xl mx-auto pt-28 px-4 pb-10">
        <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
          {/* MAIN GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* LEFT IMAGE */}
            <div className="bg-black flex items-center justify-center">
              {post.images?.length > 0 ? (
                <div
                  className="relative w-full flex justify-center items-center"
                  onTouchStart={onTouchStart}
                  onTouchMove={onTouchMove}
                  onTouchEnd={onTouchEnd}
                >
                  {" "}
                  <img
                    src={post.images[currentImage]}
                    alt={post.title}
                    className="max-h-[600px] object-contain"
                  />
                  {post.images.length > 1 && (
                    <>
                      <button
                        onClick={() =>
                          setCurrentImage(
                            (prev) =>
                              (prev - 1 + post.images.length) %
                              post.images.length,
                          )
                        }
                        className="
          absolute
          left-4
          top-1/2
          -translate-y-1/2
          w-10
          h-10
          rounded-full
          bg-black/40
          text-white
        "
                      >
                        ←
                      </button>

                      <button
                        onClick={() =>
                          setCurrentImage(
                            (prev) => (prev + 1) % post.images.length,
                          )
                        }
                        className="
          absolute
          right-4
          top-1/2
          -translate-y-1/2
          w-10
          h-10
          rounded-full
          bg-black/40
          text-white
        "
                      >
                        →
                      </button>

                      <div
                        className="
          absolute
          bottom-5
          left-1/2
          -translate-x-1/2
          flex gap-2
        "
                      >
                        {post.images.map((_, i) => (
                          <div
                            key={i}
                            className={`h-2 rounded-full ${
                              i === currentImage
                                ? "w-6 bg-white"
                                : "w-2 bg-white/50"
                            }`}
                          />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : post.video ? (
                <video src={post.video} controls className="max-h-[600px]" />
              ) : null}
            </div>

            {/* RIGHT DETAILS */}
            <div className="p-6 flex flex-col">
              {/* USER HEADER */}
              <div className="flex items-center justify-between mb-4">
                <div
                  className="flex items-center gap-3 cursor-pointer"
                  onClick={() => navigate(`/profile/${post.user?._id}`)}
                >
                  <div className="w-10 h-10 rounded-full bg-gray-300 flex items-center justify-center font-semibold">
                    {post.user?.email?.[0]?.toUpperCase()}
                  </div>

                  <p className="font-semibold text-gray-800">
                    {post.user?.email}
                  </p>
                </div>

                {isOwner && (
                  <div className="relative" ref={menuRef}>
                    <button
                      onClick={() => setShowMenu(!showMenu)}
                      className="p-2 rounded-full hover:bg-gray-100"
                    >
                      ⋮
                    </button>

                    {showMenu && (
                      <div className="absolute right-0 mt-2 w-36 bg-white border rounded-xl shadow-lg">
                        <button
                          onClick={() => navigate(`/post/edit/${post._id}`)}
                          className="w-full px-4 py-2 text-left hover:bg-gray-100"
                        >
                          Edit
                        </button>

                        <button
                          onClick={handleDelete}
                          className="w-full px-4 py-2 text-left text-red-600 hover:bg-gray-100"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* TITLE */}
              <h1 className="text-2xl font-bold mb-2">{post.title}</h1>

              {/* DESCRIPTION */}
              <p className="text-gray-700 mb-4">{post.description}</p>

              {/* PLACE */}
              {post.place && (
                <div className="mb-4 text-sm text-gray-500">
                  📍 {post.place}
                </div>
              )}

              {/* LIKE */}
              <div className="flex items-center gap-3 mb-6">
                <button
                  onClick={handleLike}
                  className="flex items-center gap-2"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    height="24"
                    viewBox="0 -960 960 960"
                    width="24"
                    fill={liked ? "red" : "#B7B7B7"}
                  >
                    <path d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z" />
                  </svg>

                  <span className="font-medium">{likes}</span>
                </button>
              </div>

              {/* COMMENT INPUT */}
              <div className="flex gap-2 mb-4">
                <input
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                  className="flex-1 border rounded-xl px-3 py-2 text-sm"
                />

                <button
                  onClick={handleAddComment}
                  className="bg-black text-white px-4 rounded-xl text-sm"
                >
                  Post
                </button>
              </div>

              {/* COMMENTS */}
              <div className="space-y-3 overflow-y-auto max-h-[300px]">
                {post.comments?.map((comment) => (
                  <div key={comment._id} className="bg-gray-50 p-3 rounded-xl">
                    <div className="flex justify-between">
                      <p className="font-semibold text-sm">
                        {comment.user?.name || "User"}
                      </p>

                      {authUser?._id === comment.user?._id && (
                        <button
                          onClick={() => handleDeleteComment(comment._id)}
                          className="text-xs text-red-500"
                        >
                          Delete
                        </button>
                      )}
                    </div>

                    <p className="text-sm text-gray-700 mt-1">{comment.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default InPost;
