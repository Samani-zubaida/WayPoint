import { useEffect, useState } from "react";

const API_KEY = import.meta.env.VITE_PEXELS_API_KEY;

export const useNearbyPexelsImages = (location, limit = 12) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location?.lat || !location?.lon) return;

    const fetchImages = async () => {
      try {
        const query = "street city landmark road building";

        const res = await fetch(
          `https://api.pexels.com/v1/search?query=${query}&per_page=${limit}`,
          {
            headers: {
              Authorization: API_KEY,
            },
          }
        );

        const data = await res.json();

        const formatted = (data.photos || []).map((img) => ({
          id: img.id,
          url: img.src.medium,
          title: img.alt || "Nearby place",
          description: `Photo by ${img.photographer}`,
        }));

        setImages(formatted);
      } catch {
        setError("Failed to load images");
      }
    };

    fetchImages();
  }, [location, limit]);

  return { images, error };
};
