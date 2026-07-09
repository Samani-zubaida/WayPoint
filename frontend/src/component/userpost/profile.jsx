import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../Context/authContext.jsx";
import PostGrid from "../userpost/PostGrid.jsx";

const Profile = () => {
  const { authUser } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authUser?._id) return;

    const fetchProfilePosts = async () => {
      try {
        const res = await axios.get(`/api/posts/user/${authUser._id}`, {
  withCredentials: true,
});

        setPosts(res.data);
      } catch (error) {
        console.error("Error fetching profile", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfilePosts();
  }, [authUser]);

  if (!authUser) {
    return <p className="text-center mt-10">Not logged in</p>;
  }

  if (loading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Profile Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-bold">{authUser.name}</h2>
        <p className="text-gray-500">{authUser.email}</p>
      </div>

      <h3 className="text-xl font-semibold mb-4">Post</h3>

      <PostGrid posts={posts} />
    </div>
  );
};

export default Profile;
