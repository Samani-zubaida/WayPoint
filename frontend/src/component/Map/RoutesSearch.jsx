import { useState } from "react";
import { useMap } from "react-leaflet";

const RouteSearch = ({ liveLocation, onRoute }) => {
  const map = useMap();
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  // Helper to fetch coordinates from Nominatim
  const searchPlace = async (query) => {
    if (!query) return null;
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (!data.length) return null;

      return {
        lat: Number(data[0].lat),
        lng: Number(data[0].lon), // Standardizing to lng
      };
    } catch (error) {
      console.error("Search error:", error);
      return null;
    }
  };

  const handleRoute = async () => {
    const fromPlace = from
      ? await searchPlace(from)
      : liveLocation
      ? { lat: liveLocation.lat, lng: liveLocation.lng }
      : null;

    const toPlace = await searchPlace(to);

    if (!fromPlace || !toPlace) return;

    // Fly to destination
    map.flyTo([toPlace.lat, toPlace.lng], 15, { duration: 1.2 });
    onRoute(fromPlace, toPlace);
  };

  return (
    <div className="absolute top-16 left-1/2 -translate-x-1/2 z-[1000] w-[92%] max-w-[420px] bg-white/95 backdrop-blur-sm rounded-lg shadow-md border border-gray-200 px-1.5 py-1 flex items-center gap-1">
      <div className="flex-1 grid grid-cols-2 gap-1">
        <input
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          placeholder="From (or leave empty for Live)..."
          className="w-full h-8 px-2 text-[11px] bg-gray-50 rounded outline-none border-none focus:ring-1 focus:ring-blue-400"
        />
        <input
          value={to}
          onChange={(e) => setTo(e.target.value)}
          placeholder="To..."
          className="w-full h-8 px-2 text-[11px] bg-gray-50 rounded outline-none border-none focus:ring-1 focus:ring-blue-400"
        />
      </div>
      <button
        onClick={handleRoute}
        className="h-8 px-3 bg-blue-600 text-white text-[10px] font-bold rounded uppercase hover:bg-blue-700 active:scale-95 transition-all"
      >
        Go
      </button>
    </div>
  );
};

export default RouteSearch;