import { useMemo } from "react";

export const useFromPoint = (manualRoute, liveLocation) => {
  return useMemo(() => {
    if (manualRoute?.from) return manualRoute.from;
    if (!liveLocation) return null;
    return { lat: liveLocation.lat, lng: liveLocation.lng };
  }, [manualRoute, liveLocation]);
};
