import { useMemo } from "react";

export const useCategories = (places = []) => {
  return useMemo(() => {
    console.log("📊 useCategories input:", places);

    const cats = places
      .map(p => p.placeType || p.type || p.category)
      .filter(Boolean)
      .map(c =>
        c.replace(/_/g, " ").toLowerCase()
      );

    const unique = Array.from(new Set(cats));

    return ["All", ...unique.map(
      c => c.charAt(0).toUpperCase() + c.slice(1)
    )];
  }, [places]);
};
