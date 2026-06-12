import React, { useMemo, useState } from "react";
import { useNearbyWikimediaImages } from "../../hooks/useNearbyWikimediaImages.js";
import { getDistance, estimateETA } from "../../utils/calcDistance";

const StreetImages = ({
  location,
  onSelect,
  onHover,
  onSave,
}) => {

  const { images = [], error } =
    useNearbyWikimediaImages(location);

  const [mode, setMode] = useState("walk");

  const processedImages = useMemo(() => {

    // SAFETY CHECK
    if (!location?.lat || !location?.lng) {
      return [];
    }

    return images.map((img) => {

      // FIXED lng
      const distanceMeters =
        img.lat && img.lng
          ? getDistance(
              location.lat,
              location.lng,
              img.lat,
              img.lng
            )
          : null;

      // CONVERT TO KM
      const distanceKm =
        distanceMeters !== null
          ? distanceMeters / 1000
          : null;

      return {
        ...img,

        distanceKm,

        distanceText:
          distanceKm !== null
            ? distanceKm < 1
              ? `${Math.round(distanceKm * 1000)} m`
              : `${distanceKm.toFixed(2)} km`
            : "—",

        etaText:
          distanceKm !== null
            ? estimateETA(distanceKm, mode)
            : "—",
      };
    });

  }, [images, location, mode]);

  // NO LOCATION
  if (!location) {
    return (
      <div className="h-full flex items-center justify-center text-gray-500">
        Search or select a place
      </div>
    );
  }

  // ERROR
  if (error) {
    return (
      <div className="p-4 text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto p-4 bg-gray-50">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-5">

        <h2 className="text-lg font-bold">
          Nearby Visuals
        </h2>

        <div className="flex gap-2">
          {["walk", "drive"].map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`
                px-3 py-1 rounded-lg text-sm transition
                ${
                  mode === m
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }
              `}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* EMPTY STATE */}
      {processedImages.length === 0 && (
        <div className="text-center text-gray-500 mt-10">
          No nearby images found
        </div>
      )}

      {/* IMAGES */}
      <div className="space-y-4">

        {processedImages.map((img) => (

          <div
            key={img.id}
            onClick={() => onSelect(img)}
            onMouseEnter={() => onHover(img.id)}
            onMouseLeave={() => onHover(null)}
            className="
              bg-white rounded-2xl overflow-hidden
              shadow-md hover:shadow-xl
              transition cursor-pointer
            "
          >

            {/* IMAGE */}
            <img
              src={img.url}
              alt={img.title}
              loading="lazy"
              className="w-full h-44 object-cover"
            />

            {/* CONTENT */}
            <div className="p-4">

              <h3 className="font-semibold text-sm line-clamp-2">
                {img.description}
              </h3>

              <div className="mt-3 flex justify-between text-xs text-gray-600">

                <span>
                  📏 {img.distanceText}
                </span>

                <span>
                  ⏱️ {img.etaText}
                </span>

              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onSave(img);
                }}
                className="
                  mt-3 text-blue-600
                  text-sm font-medium
                "
              >
                Save to timeline
              </button>

            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default React.memo(StreetImages);