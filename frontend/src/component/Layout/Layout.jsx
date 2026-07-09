import React, { useMemo, useState, lazy, Suspense, useCallback } from "react";

import LeftPanel from "../LeftPanel/LeftPanel";
import StreetImages from "../RightPanel/StreetImages";
import { useNearbyPlaces } from "../../hooks/useNearbyPlaces";
import Map from "../Map/MapContainer"
const Layout = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [center, setCenter] = useState(null);
  const [radius, setRadius] = useState(500);

  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredImageId, setHoveredImageId] = useState(null);
  const [savedSnaps, setSavedSnaps] = useState([]);

  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  // FETCH ONLY ONCE
  const nearbyResult = useNearbyPlaces(center, radius);

  const places = useMemo(() => {
    if (Array.isArray(nearbyResult?.data)) {
      return nearbyResult.data;
    }

    return [];
  }, [nearbyResult]);

  const focusLocation = useMemo(() => {
    if (selectedPlace?.lat && selectedPlace?.lon) {
      return {
        lat: selectedPlace.lat,
        lng: selectedPlace.lon,
      };
    }

    return center;
  }, [selectedPlace, center]);

  const saveSnap = useCallback((img) => {
    setSavedSnaps((prev) => {
      const exists = prev.find((s) => s.id === img.id);
      if (exists) return prev;
      return [...prev, img];
    });
  }, []);

  const closePanels = useCallback(() => {
    setShowLeft(false);
    setShowRight(false);
  }, []);

  console.log("Layout places:", places);
  console.log("Nearby result:", nearbyResult);
  return (
    <div className="h-screen w-full flex overflow-hidden bg-gray-100 relative">
      {/* MOBILE BUTTONS */}
      <div className="md:hidden fixed bottom-6 left-0 right-0 z-[100] px-4 flex justify-between pointer-events-none">
        <button
          onClick={() => setShowLeft(true)}
          className="pointer-events-auto h-14 w-14 rounded-full bg-white shadow-xl border flex items-center justify-center active:scale-95 transition"
        >
          🔍
        </button>

        <button
          onClick={() => setShowRight(true)}
          className="pointer-events-auto h-14 w-14 rounded-full bg-white shadow-xl border flex items-center justify-center active:scale-95 transition"
        >
          🖼️
        </button>
      </div>

      {/* BACKDROP */}
      {(showLeft || showRight) && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closePanels}
        />
      )}

      {/* LEFT PANEL */}
      <div
        className={`
          fixed md:relative z-50 md:z-20
          top-0 left-0 h-full
          w-[320px] bg-white border-r
          transform transition-transform duration-300
          ${showLeft ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <button
          className="md:hidden absolute top-4 right-4 z-50 bg-gray-100 rounded-full h-10 w-10"
          onClick={() => setShowLeft(false)}
        >
          ✕
        </button>

        <LeftPanel
          places={places}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
          center={center}
          radius={radius}
          setRadius={setRadius}
          onMobileSelect={() => setShowLeft(false)}
        />
      </div>

      {/* MAP */}
      <div className="flex-1 relative z-10">
        <Suspense
          fallback={
            <div className="h-full flex items-center justify-center text-lg font-semibold">
              Loading Map...
            </div>
          }
        >
          <Map
            places={places}
            selectedCategory={selectedCategory}
            selectedPlace={selectedPlace}
            setSelectedPlace={setSelectedPlace}
            selectedImage={selectedImage}
            hoveredImageId={hoveredImageId}
            center={center}
            setCenter={setCenter}
            radius={radius}
          />
        </Suspense>
      </div>

      {/* RIGHT PANEL */}
      <div
        className={`
          fixed md:relative z-50 md:z-20
          top-0 right-0 h-full
          w-[320px] bg-white border-l
          transform transition-transform duration-300
          ${showRight ? "translate-x-0" : "translate-x-full"}
          md:translate-x-0
        `}
      >
        <button
          className="md:hidden absolute top-4 left-4 z-50 bg-gray-100 rounded-full h-10 w-10"
          onClick={() => setShowRight(false)}
        >
          ✕
        </button>

        <StreetImages
          location={focusLocation}
          onSelect={setSelectedImage}
          onHover={setHoveredImageId}
          onSave={saveSnap}
          savedSnaps={savedSnaps}
        />
      </div>
    </div>
  );
};

export default Layout;
