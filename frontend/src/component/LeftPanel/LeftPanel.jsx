import React from "react";
import PlaceList from "./PlaceList";

const radiusOptions = [
  { label: "500m", value: 500 },
  { label: "1km", value: 1000 },
  { label: "3km", value: 3000 },
  { label: "5km", value: 5000 },
];

const LeftPanel = ({
  places = [],
  selectedCategory,
  setSelectedCategory,
  selectedPlace,
  setSelectedPlace,
  center,
  radius,
  setRadius,
  onMobileSelect,
}) => {
  return (
    <div className="h-full flex flex-col bg-white overflow-hidden border-r">

      {/* HEADER */}
      <div className="p-4 border-b bg-white sticky top-0 z-20">

        {/* TITLE */}
        <div className="mb-5">
          <h2 className="text-2xl font-bold text-gray-800">
            Nearby Explorer
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Discover nearby places around you
          </p>
        </div>

        {/* SEARCH RADIUS */}
        <div className="mb-5">
          <p className="font-semibold text-sm mb-3 text-gray-700">
            Search Radius
          </p>

          <div className="flex gap-2 flex-wrap">
            {radiusOptions.map((r) => (
              <button
                key={r.value}
                onClick={() => setRadius(r.value)}
                className={`
                  px-4 py-2 rounded-xl text-sm font-medium
                  transition-all duration-200
                  ${
                    radius === r.value
                      ? "bg-blue-600 text-white shadow-lg scale-105"
                      : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                  }
                `}
              >
                {r.label}
              </button>
            ))}
          </div>
        </div>

        {/* CURRENT CATEGORY */}
        <div className="mb-5">
          <p className="font-semibold text-sm mb-2 text-gray-700">
            Selected Category
          </p>

          <div className="bg-blue-50 border border-blue-100 text-blue-700 px-4 py-2 rounded-xl text-sm font-medium">
            {selectedCategory}
          </div>
        </div>

        {/* PLACE COUNT */}
        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Nearby Places
          </p>

          <div className="bg-gray-100 px-3 py-1 rounded-full text-sm font-medium text-gray-700">
            {places.length}
          </div>
        </div>
      </div>

      {/* PLACE LIST */}
      <div className="flex-1 min-h-0 overflow-hidden bg-gray-50">
        <PlaceList
          places={places}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
          center={center}
          radius={radius}
          onMobileSelect={onMobileSelect}
        />
      </div>
    </div>
  );
};

export default React.memo(LeftPanel);