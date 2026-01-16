import { useMemo } from "react";

export const useRouteLatLng = (route) => {
  const hasRoute = route && Array.isArray(route.coordinates) && route.coordinates.length > 1;

  const routeLatLng = useMemo(() => {
    if (!hasRoute) return [];
    return route.coordinates.map(([lng, lat]) => ({ lat, lng }));
  }, [route, hasRoute]);

  return { routeLatLng, hasRoute };
};
