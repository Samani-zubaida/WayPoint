import { useEffect, useRef } from "react";

export const useInitCenter = (
  liveLocation,
  center,
  setCenter
) => {
  const initialized = useRef(false);

  useEffect(() => {
    // Wait until GPS is available
    if (!liveLocation) return;

    // Only initialize once
    if (initialized.current) return;

    setCenter({
      lat: liveLocation.lat,
      lng: liveLocation.lng,
    });

    initialized.current = true;
  }, [liveLocation, setCenter]);
};