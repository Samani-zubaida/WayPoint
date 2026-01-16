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

      const distance = getDistance(
        center.lat,
        center.lon,
        p.lat,
        p.lon
      );

      return distance <= radius;
    });
  }, [places, selectedCategory, center, radius]);
};
