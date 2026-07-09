import { useMemo } from "react";
import { getDistance } from "../utils/calcDistance";

export const useMapPlaces = (
  places = [],
  selectedCategory,
  center,
  radius
) => {
  return useMemo(() => {
    if (!places.length || !center) return [];

    const normalizedCategory =
      selectedCategory?.toLowerCase() === "all"
        ? null
        : selectedCategory?.toLowerCase();

    return places.filter(p => {
      const type =
        p.placeType || p.type || p.category;

      if (
        normalizedCategory &&
        type?.replace(/_/g, " ").toLowerCase() !== normalizedCategory
      ) {
        return false;
      }
      console.log({
        name: p.name,
        lat: p.lat,
        lng: p.lng,
        lon: p.lon,
      });
      const centerLat = Number(center.lat);
      const centerLng = Number(center.lng);

      const placeLat = Number(p.lat);
      const placeLng = Number(p.lng ?? p.lon);

      console.log("CENTER");
      console.log(centerLat, centerLng);

      console.log("PLACE");
      console.log(placeLat, placeLng);

      const distance = getDistance(
        centerLat,
        centerLng,
        placeLat,
        placeLng
      );

      console.log("DISTANCE:", distance);

      return distance <= radius;
    });
  }, [places, selectedCategory, center, radius]);
};
