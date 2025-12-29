import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import LeftPanel from "../LeftPanel/LeftPanel";
import Map from "../Map/MapContainer";
import StreetImages from "../RightPanel/StreetImages";

const Layout = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPlace, setSelectedPlace] = useState(null);

  // 🔥 NEW SHARED STATE
  const [selectedImage, setSelectedImage] = useState(null);
  const [hoveredImageId, setHoveredImageId] = useState(null);
  const [savedSnaps, setSavedSnaps] = useState([]);
  const [center, setCenter] = useState(null);

  const saveSnap = (img) => {
    setSavedSnaps((prev) =>
      prev.find((s) => s.id === img.id) ? prev : [...prev, img]
    );
  };

  return (
    <div className="h-screen flex flex-col pt-15">

      <div className="flex flex-1 min-h-0 overflow-hidden mt-12">
        <LeftPanel
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setSelectedPlace={setSelectedPlace}
          selectedPlace={selectedPlace}
          center={center}
        />

        {/* MAP */}
        <div className="flex-3 min-h-0 overflow-hidden">
          <Map
            selectedCategory={selectedCategory}
            selectedPlace={selectedPlace}
            selectedImage={selectedImage}
            hoveredImageId={hoveredImageId}
            center={center}
            setCenter={setCenter}
          />
        </div>

        {/* RIGHT PANEL */}
        <div className="flex-2 min-h-0 border-l">
          <StreetImages
            onSelect={setSelectedImage}
            onHover={setHoveredImageId}
            onSave={saveSnap}
            savedSnaps={savedSnaps}
          />
        </div>
      </div>
    </div>
  );
};

export default Layout;
