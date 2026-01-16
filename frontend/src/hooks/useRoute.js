import { useEffect, useState } from "react";

export const useRoute = (from, to) => {
  const [route, setRoute] = useState(null);

  useEffect(() => {
    const getLng = (obj) => obj?.lng ?? obj?.lon;
    const fromLng = getLng(from);
    const toLng = getLng(to);

    if (!from?.lat || !fromLng || !to?.lat || !toLng) {
      setRoute(null);
      return;
    }

    const fetchRoute = async () => {
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${fromLng},${from.lat};${toLng},${to.lat}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        const data = await res.json();

        if (data.routes?.[0]?.geometry?.coordinates) {
          setRoute({
            coordinates: data.routes[0].geometry.coordinates,
            distance: data.routes[0].distance,
            duration: data.routes[0].duration,
          });
        } else {
          setRoute(null);
        }
      } catch (err) {
        console.error("Route fetch error:", err);
        setRoute(null);
      }
    };

    fetchRoute();
  }, [from?.lat, from?.lng, from?.lon, to?.lat, to?.lng, to?.lon]);

  return route;
};