import React, { useMemo, useState } from "react";
import LeftPanel from "../LeftPanel/LeftPanel";
import Map from "../Map/MapContainer";
import StreetImages from "../RightPanel/StreetImages";

const Layout = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [center, setCenter] = useState(null);
  const [radius, setRadius] = useState(1500);

  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredImageId, setHoveredImageId] = useState(null);
  const [savedSnaps, setSavedSnaps] = useState([]);

  // MOBILE STATES
  const [showLeft, setShowLeft] = useState(false);
  const [showRight, setShowRight] = useState(false);

  const focusLocation = useMemo(() => {
    if (selectedPlace?.lat && selectedPlace?.lon) {
      return { lat: selectedPlace.lat, lon: selectedPlace.lon };
    }
    return center;
  }, [selectedPlace, center]);

  const saveSnap = (img) => {
    setSavedSnaps((prev) =>
      prev.find((s) => s.id === img.id) ? prev : [...prev, img]
    );
  };

  return (
    <div className="h-screen w-full flex flex-col overflow-hidden relative bg-gray-100 text-slate-900">
      
      {/* MOBILE HEADER BUTTONS (Visible only on small screens) */}
      <div className="md:hidden absolute top-4 inset-x-4 z-30 flex justify-between pointer-events-none">
        <button
          onClick={() => setShowLeft(true)}
          className="pointer-events-auto h-12 w-12 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-200 active:scale-95 transition-transform"
            style={{marginTop:"500px"}} 
        >
          <span className="text-xl">🔍</span>
        </button>
        
        <button
          onClick={() => setShowRight(true)}
         className="pointer-events-auto h-12 w-12 bg-white rounded-xl shadow-lg flex items-center justify-center border border-gray-200 active:scale-95 transition-transform"
         style={{marginTop:"500px"}} 
       >
          <span className="text-xl">🖼️</span>
        </button>
      </div>

      <div className="relative flex flex-1 overflow-hidden">
        {/* LEFT PANEL */}
           {/* LEFT PANEL */}
        <div
          className={`
            fixed md:static z-40
            top-0 left-0 h-full w-100 bg-white
            transform transition-transform duration-300
            ${showLeft ? "translate-x-0" : "-translate-x-full"}
            md:translate-x-0
            border-r
          `}
        >

            <button 
            className="md:hidden absolute top-4 right-4 z-50 p-2 bg-gray-100 rounded-full"
            onClick={() => setShowLeft(false)}
            style={{marginRight:"30px"}}
          >
            ✕
          </button>
          <LeftPanel
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
            selectedPlace={selectedPlace}
            setSelectedPlace={setSelectedPlace}
            center={center}
            radius={radius}
            setRadius={setRadius}
          />
        </div>

        {/* MAP CONTAINER */}
        <div className="flex-1 relative z-10">
          <Map
            selectedCategory={selectedCategory}
            selectedPlace={selectedPlace}
            selectedImage={selectedImage}
            hoveredImageId={hoveredImageId}
            center={center}
            setCenter={setCenter}
            radius={radius}
          />
        </div>

        {/* RIGHT PANEL */}
        <div
          className={`
            fixed md:static z-50 top-0 right-0 h-full 
            w-[280px] sm:w-[320px] bg-white
            transform transition-transform duration-300 ease-in-out
            ${showRight ? "translate-x-0" : "translate-x-full"}
            md:translate-x-0 border-l
          `}
        >
          {/* Close button inside panel for mobile */}
          <button 
            className="md:hidden absolute top-4 left-4 z-50 p-2 bg-gray-100 rounded-full"
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

        {/* BACKDROP (Clicking outside panel closes it) */}
        {(showLeft || showRight) && (
          <div
            className="z-40 md:hidden "
            onClick={() => {
              setShowLeft(false);
              setShowRight(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default Layout;