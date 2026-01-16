import React, { useRef, useState, useEffect } from "react";
import { useNearbyPlaces } from "../../hooks/useNearbyPlaces";
import { useFilteredPlaces } from "../../hooks/useFilteredPlaces";
import { useScrollToSelected } from "../../hooks/useScrollToSelected";
import { useCategories } from "../../hooks/useCategories";
import PlaceCard from "./PlaceCard";

const PlaceList = ({
  selectedCategory,
  setSelectedCategory,
  selectedPlace,
  setSelectedPlace,
  center,
  radius,
  // Added this prop to allow the list to close the sidebar on mobile
  onMobileSelect 
}) => {
  const { data = [], isLoading, error } = useNearbyPlaces(center, radius);

  const filteredData = useFilteredPlaces(data, selectedCategory, center);
  const categories = useCategories(data);
  const [showFilterCard, setShowFilterCard] = useState(false);
  const cardRefs = useRef({});

  useScrollToSelected(selectedPlace, cardRefs);

  if (!center) return <p className="p-4 text-gray-500 animate-pulse">Detecting your location...</p>;
  if (isLoading) return <p className="p-4 text-blue-600 font-medium">Loading nearby places...</p>;
  if (error) return <p className="p-4 text-red-500">Failed to load places. Please refresh.</p>;

  return (
    // changed 'relative' to ensure the filter dropdown positions correctly
    <div className="h-full flex flex-col p-4 min-h-0 bg-white relative">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-4 pt-8 md:pt-0">
        <h3 className="text-xl font-bold text-gray-800">Nearby</h3>

        <div className="relative">
          <button
            onClick={() => setShowFilterCard((p) => !p)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1.5 rounded-full text-sm font-medium shadow-sm transition-colors flex items-center gap-2"
          >
            <span>Filter</span>
            <span className="text-[10px] opacity-70">{showFilterCard ? "▲" : "▼"}</span>
          </button>

          {/* Filter dropdown - Fixed Z-index and positioning */}
          {showFilterCard && (
            <>
              {/* Invisible overlay to close dropdown when clicking outside */}
              <div 
                className="fixed inset-0 z-[60]" 
                onClick={() => setShowFilterCard(false)} 
              />
              <div className="absolute right-0 top-10 bg-white shadow-xl border border-gray-100 rounded-xl p-2 w-48 z-[70] max-h-80 overflow-y-auto">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setShowFilterCard(false);
                    }}
                    className={`block w-full text-left px-3 py-2 mb-1 rounded-lg text-sm transition-colors ${
                      selectedCategory === cat
                        ? "bg-blue-600 text-white"
                        : "hover:bg-blue-50 text-gray-700"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Places list */}
      <div className="flex-1 overflow-y-auto space-y-3 pr-1 custom-scrollbar">
        {filteredData.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-400 text-sm">No places found in this category.</p>
          </div>
        ) : (
          filteredData.map((place) => (
            <div
              key={place.id}
              ref={(el) => (cardRefs.current[place.id] = el)}
              className="transition-transform active:scale-[0.98]"
            >
              <PlaceCard
                place={place}
                onSelect={(p) => {
                  setSelectedPlace(p);
                  // If on mobile, we call this to close the side panel automatically
                  if (onMobileSelect) onMobileSelect();
                }}
                isSelected={selectedPlace?.id === place.id}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PlaceList;