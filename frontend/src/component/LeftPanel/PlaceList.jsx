import React, { useMemo, useRef, useState } from "react";
import { useFilteredPlaces } from "../../hooks/useFilteredPlaces";
import { useScrollToSelected } from "../../hooks/useScrollToSelected";
import { useCategories } from "../../hooks/useCategories";
import PlaceCard from "./PlaceCard";

const PlaceList = ({
  places,
  selectedCategory,
  setSelectedCategory,
  selectedPlace,
  setSelectedPlace,
  center,
  onMobileSelect,
}) => {
  const filteredData = useFilteredPlaces(
    places,
    selectedCategory,
    center
  );

  const categories = useCategories(places);

  const [showFilterCard, setShowFilterCard] = useState(false);

  const cardRefs = useRef({});

  useScrollToSelected(selectedPlace, cardRefs);

  const renderedPlaces = useMemo(() => {
    return filteredData.map((place) => (
      <div
        key={place.id}
        ref={(el) => (cardRefs.current[place.id] = el)}
      >
        <PlaceCard
          place={place}
          isSelected={selectedPlace?.id === place.id}
          onSelect={(p) => {
            setSelectedPlace(p);
            if (onMobileSelect) onMobileSelect();
          }}
        />
      </div>
    ));
  }, [filteredData, selectedPlace, setSelectedPlace, onMobileSelect]);

  if (!center) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Detecting your location...
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4 bg-white relative">
      <div className="flex items-center justify-between mb-4 pt-8 md:pt-0">
        <h2 className="text-xl font-bold">Nearby Places</h2>

        <div className="relative">
          <button
            onClick={() => setShowFilterCard((p) => !p)}
            className="bg-blue-600 text-white px-4 py-2 rounded-xl"
          >
            Filter
          </button>

          {showFilterCard && (
            <div className="absolute right-0 top-12 w-52 bg-white rounded-xl shadow-2xl border z-50 max-h-80 overflow-y-auto">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setShowFilterCard(false);
                  }}
                  className={`
                    w-full text-left px-4 py-3 text-sm transition
                    ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white"
                        : "hover:bg-gray-100"
                    }
                  `}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-3 pr-1">
        {filteredData.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            No places found.
          </div>
        ) : (
          renderedPlaces
        )}
      </div>
    </div>
  );
};

export default React.memo(PlaceList);