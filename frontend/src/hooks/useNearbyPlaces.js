import { useEffect, useRef, useState } from "react";
import axios from "axios";

export const useNearbyPlaces = (
  center,
  radius = 500
) => {
  const [data, setData] = useState([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState(null);

  // store previous coordinates
  const prevCoordsRef = useRef({
    lat: null,
    lng: null,
  });

  useEffect(() => {
    // safety check
    if (
      !center ||
      center.lat == null ||
      center.lng == null
    ) {
      return;
    }

    // prevent duplicate fetches
    if (
      prevCoordsRef.current.lat ===
        center.lat &&
      prevCoordsRef.current.lng ===
        center.lng
    ) {
      console.log(
        "⏱️ Same location, skipping request"
      );

      return;
    }

    // save current coords
    prevCoordsRef.current = {
      lat: center.lat,
      lng: center.lng,
    };

    const fetchPlaces = async () => {
      try {
        setLoading(true);

        setError(null);

        console.log(
          "📡 Fetching nearby places..."
        );

        console.log("CENTER:", center);

        const response =
          await axios.get(
            "http://localhost:5000/api/map/places/nearby",
            {
              params: {
                lat: center.lat,

                // backend expects lon
                lon: center.lng,

                radius,
              },

              timeout: 20000,
            }
          );

        console.log(
          "✅ Nearby Places Success"
        );

        console.log(response.data);

        setData(
          response.data?.data || []
        );
      } catch (err) {
        console.log(
          "❌ Nearby Places Error"
        );

        console.log(
          err.response?.data
        );

        console.log(err.message);

        setError(
          err.response?.data ||
            err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [
    center?.lat,
    center?.lng,
    radius,
  ]);

  return {
    data,
    loading,
    error,
  };
};