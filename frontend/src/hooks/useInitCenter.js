import { useEffect } from "react";

export const useInitCenter = (
  liveLocation,
  center,
  setCenter
) => {
  useEffect(() => {
    if (!center && liveLocation) {
      setCenter({
        lat: liveLocation.lat,
        lng: liveLocation.lng,
      });
    }
  }, [liveLocation, center, setCenter]);
};