import { useMemo } from "react";

export const useToPoint = (manualRoute, selectedPlace) => {
  return useMemo(() => {
    if (manualRoute?.to) return manualRoute.to;
    if (!selectedPlace) return null;
    return { lat: selectedPlace.lat, lng: selectedPlace.lon };
  }, [manualRoute, selectedPlace]);
};
