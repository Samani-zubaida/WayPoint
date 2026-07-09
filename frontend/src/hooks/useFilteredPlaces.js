import { useMemo } from "react";
import { getDistance } from "../utils/calcDistance";

export const useFilteredPlaces = (
  places = [],
  selectedCategory,
  center
) => {
  return useMemo(() => {
    if (!places.length) return [];

    const normalizedCategory =
      selectedCategory?.toLowerCase() === "all"
        ? null
        : selectedCategory?.toLowerCase();

    const filtered = normalizedCategory
      ? places.filter((p) => {
          const type =
            p.placeType || p.type || p.category || "";

          return (
            type.replace(/_/g, " ").toLowerCase() ===
            normalizedCategory
          );
        })
      : places;

    if (!center) return filtered;

    return filtered.map((p) => {
      const distance = getDistance(
        Number(center.lat),
        Number(center.lng),          // ✅ FIXED
        Number(p.lat),
        Number(p.lng ?? p.lon)       // ✅ FIXED
      );

      return {
        ...p,
        distance,
      };
    });
  }, [places, selectedCategory, center]);
};