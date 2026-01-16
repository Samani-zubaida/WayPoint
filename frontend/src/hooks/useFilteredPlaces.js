import { useMemo } from "react";
import { getDistance } from "../utils/calcDistance";

export const useFilteredPlaces = (places = [], selectedCategory, center) => {
  return useMemo(() => {
    console.log("🧠 Filtering places:", places);

    if (!places.length) return [];

    const normalizedCategory =
      selectedCategory?.toLowerCase() === "all"
        ? null
        : selectedCategory?.toLowerCase();

    let filtered = normalizedCategory
      ? places.filter(p => {
          const type =
            p.placeType || p.type || p.category;
          return (
            type &&
            type.replace(/_/g, " ").toLowerCase() === normalizedCategory
          );
        })
      : places;

    if (!center) return filtered;

    return filtered.map(p => ({
      ...p,
      distance: getDistance(
        center.lat,
        center.lon,
        p.lat,
        p.lon
      ),
    }));
  }, [places, selectedCategory, center]);
};
