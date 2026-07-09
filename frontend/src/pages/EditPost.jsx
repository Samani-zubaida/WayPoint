import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import PostForm from "../component/userpost/PostForm.jsx";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState({ lat: null, lon: null });

const [images, setImages] = useState([]);
  const [video, setVideo] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🔹 Prefill post data
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/api/posts/post/${id}`, {
          withCredentials: true,
        });

        const post = res.data;
        setTitle(post.title);
        setDescription(post.description);
        setPlace(post.place || "");
        setLocation({ lat: post.lat, lon: post.lon });
      } catch (err) {
        setError("Failed to load post");
      }
    };

    fetchPost();
  }, [id]);

  // 🔹 Update post
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);

      if (location.lat && location.lon) {
        formData.append("lat", location.lat);
        formData.append("lon", location.lon);
      }

      images.forEach((img) => {
        formData.append("images", img);
      });

      if (video) {
         formData.append("video", video);
      }

      await axios.put(`/api/posts/${id}`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      navigate(`/post/${id}`); // redirect after update
    } catch (err) {
      setError(err.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostForm
      title={title}
      setTitle={setTitle}
      description={description}
      setDescription={setDescription}
      place={place}
      setPlace={setPlace}
      images={images}
      setImages={setImages}
      video={video}
      setVideo={setVideo}
      onSubmit={handleUpdate}
      loading={loading}
      error={error}
      submitText="Update Post"
    />
  );
};

export default EditPost;
