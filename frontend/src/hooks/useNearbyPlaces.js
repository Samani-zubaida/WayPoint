import { useEffect, useState } from "react";
import axios from "axios";

export const useNearbyPlaces = (
  center,
  radius = 500
) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!center) return;
    if (center.lat == null || center.lng == null) return;

    let ignore = false;

    const fetchPlaces = async () => {
      try {
        setLoading(true);
        setError(null);

        console.log("Fetching nearby places...");
        console.log("Center:", center);
        console.log("Radius:", radius);

        const res = await axios.get(
          "http://localhost:5000/api/map/places/nearby",
          {
            params: {
              lat: center.lat,
              lon: center.lng,
              radius,
            },
            timeout: 20000,
          }
        );

        if (!ignore) {
          setData(res.data?.data || []);
        }
      } catch (err) {
        console.error(err);

        if (!ignore) {
          setError(err.response?.data || err.message);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    };

    fetchPlaces();

    return () => {
      ignore = true;
    };
  }, [center?.lat, center?.lng, radius]);
console.log("Radius received:", radius);
  return {
    data,
    loading,
    error,
  };
};