import { useEffect, useState } from "react";
import { getDistance } from "../utils/calcDistance";

export const useRemainingRoute = (navigationOn, liveLocation, routeLatLng) => {
  const [remainingRoute, setRemainingRoute] = useState([]);

  useEffect(() => {
    if (!navigationOn || !liveLocation || !routeLatLng.length) return;

    const index = routeLatLng.findIndex((p) => {
      const d = getDistance(liveLocation.lat, liveLocation.lng, p.lat, p.lng);
      return d > 5;
    });

    setRemainingRoute(index >= 0 ? routeLatLng.slice(index) : []);
  }, [liveLocation, navigationOn, routeLatLng]);

  return remainingRoute;
};
