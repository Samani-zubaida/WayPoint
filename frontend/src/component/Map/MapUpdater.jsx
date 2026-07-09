import { useEffect } from "react";
import { useMap } from "react-leaflet";

const MapUpdater = ({ center, zoom = 16 }) => {
  const map = useMap();

  useEffect(() => {
    if (!center) return;

    map.flyTo([center.lat, center.lng], zoom, {
      duration: 1.2,
      animate: true,
    });
  }, [center, zoom, map]);

  return null;
};

export default MapUpdater;