import axios from "axios";

export const fetchNearbyPlaces = async ({ lat, lon, radius = 1500 }) => {
  if (!lat || !lon) {
    throw new Error("Latitude and longitude are required");
  }

  const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL || "http://localhost:5000"}/api/map/places/nearby`, {
    params: { lat, lon, radius },
  });

  return res.data;
};
