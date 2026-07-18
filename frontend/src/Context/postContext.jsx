import { createContext, useState } from "react";
import axios from "axios";

export const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState({
    lat: null,
    lon: null,
  });

  // ✅ Multiple images
  const [images, setImages] = useState([]);

  // ✅ Single video
  const [video, setVideo] = useState(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // 🌍 Convert place name to coordinates
  const getLatLonFromPlace = async (placeName) => {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
        placeName,
      )}`,
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
  const createPost = async (formData) => {
    try {
      setLoading(true);
      setError("");

      if (!title || !description || !place || !category) {
        throw new Error("All fields are required");
      }

      if (!images.length && !video) {
        throw new Error("Please upload at least one image or one video");
      }

      // get coordinates
      const coords = await getLatLonFromPlace(place);

      setLocation(coords);

      formData.append("location", JSON.stringify(coords));

      await axios.post("https://waypoint-1brn.onrender.com/api/posts/upload", formData, {
        withCredentials: true,
      });

      // Reset form
      setTitle("");
      setDescription("");
      setPlace("");
      setCategory("");
      setImages([]);
      setVideo(null);

      setLocation({
        lat: null,
        lon: null,
      });
    } catch (err) {
      console.log("Status:", err.response?.status);
      console.log("Response:", err.response?.data);
      console.log(err);
      setError(
        err.response?.data?.message || err.message || "Something went wrong",
      );
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

        category,
        setCategory,

        location,
        setLocation,

        images,
        setImages,

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
