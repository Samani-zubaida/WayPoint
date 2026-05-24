import { createContext, useState } from "react";
import axios from "axios";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [location, setLocation] = useState({ lat: null, lon: null });

  // ✅ store FILE, not string
  const [image, setImage] = useState(null);
  const [video, setVideo] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🌍 Convert place → coordinates
  const getLatLonFromPlace = async (placeName) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        placeName
      )}`
    );

    const data = await res.json();

    if (!data.length) {
      throw new Error("Location not found");
    }

    return {
      lat: parseFloat(data[0].lat),
      lon: parseFloat(data[0].lon),
    };
  };

  // 🚀 Create Post
  const createPost = async () => {
    try {
      setLoading(true);
      setError("");

      if (!title || !description || !place) {
        throw new Error("All fields are required");
      }

      if (!image && !video) {
        throw new Error("Please upload an image or a video");
      }

      // 1️⃣ Get coordinates
      const coords = await getLatLonFromPlace(place);
      setLocation(coords);

      // 2️⃣ Build FormData
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", JSON.stringify(coords));

      if (image) {
        formData.append("image", image);
      }

      if (video) {
        formData.append("video", video);
      }

      // 3️⃣ Send request
      await axios.post(
        "http://localhost:5000/api/posts/upload",
        formData,
        {
          withCredentials: true, // or Authorization header if using JWT header
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 4️⃣ Reset form
      setTitle("");
      setDescription("");
      setPlace("");
      setImage(null);
      setVideo(null);
      setLocation({ lat: null, lon: null });
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <PostContext.Provider
      value={{
        title,
        setTitle,
        description,
        setDescription,
        place,
        setPlace,
        image,
        setImage,
        video,
        setVideo,
        createPost,
        loading,
        error,
      }}
    >
      {children}
    </PostContext.Provider>
  );
};
