import axios from "axios";

export const fetchNearbyPlaces = async ({ lat, lon, radius = 1500 }) => {
  if (!lat || !lon) {
    throw new Error("Latitude and longitude are required");
  }

  const res = await axios.get("https://waypoint-1brn.onrender.com/api/map/places/nearby", {
    params: { lat, lon, radius },
  });

  return res.data;
};
