import { useEffect, useState, useRef } from "react";
import { getDistance } from "../utils/calcDistance"; // use your existing getDistance

/**
 * Simulates movement along a route.
 * @param {Array} routeLatLng Array of {lat, lng}
 * @param {Boolean} active Whether to simulate movement
 * @param {Number} speed Time per point in ms (default 1.2s)
 */
const useSimulatedMovement = (routeLatLng = [], active = false, speed = 1200) => {
  const [simulatedPos, setSimulatedPos] = useState(null);
  const index = useRef(0);

  useEffect(() => {
    if (!active || !routeLatLng.length) return;

    setSimulatedPos(routeLatLng[0]);
    index.current = 0;

    const id = setInterval(() => {
      index.current++;
      if (index.current < routeLatLng.length) {
        setSimulatedPos(routeLatLng[index.current]);
      } else {
        clearInterval(id);
      }
    }, speed);

    return () => clearInterval(id);
  }, [active, routeLatLng, speed]);

  return simulatedPos;
};

export default useSimulatedMovement;
