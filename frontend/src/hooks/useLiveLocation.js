import { useEffect, useState } from "react";

const DEFAULT_LOCATION = {
  lat: 19.0760,
  lng: 72.8777,
};

const useLiveLocation = () => {
  // Start with no location
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (!navigator.geolocation) {
      console.log("Geolocation not supported");
      setLocation(DEFAULT_LOCATION);
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const newLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          heading: position.coords.heading ?? 0,
        };

        console.log("📍 Live Location:", newLocation);

        setLocation(newLocation);
      },

      (error) => {
        console.error("❌ Geolocation Error:", error);

        // Only use fallback if GPS fails
        setLocation(DEFAULT_LOCATION);
      },

      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return location;
};

export default useLiveLocation;