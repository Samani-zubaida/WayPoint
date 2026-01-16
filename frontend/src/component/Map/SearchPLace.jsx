import { useState } from "react";
import { useMap } from "react-leaflet";

const SearchPlace = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const map = useMap();

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );
      const data = await res.json();
      if (!data.length) return;

      const place = {
        name: data[0].display_name,
        lat: Number(data[0].lat),
        lon: Number(data[0].lon), // Standardized to match MapContainer center prop
      };

      map.flyTo([place.lat, place.lon], 16, { duration: 1.2 });
      onSearch(place);
    } catch (error) {
      console.error("Search failed:", error);
    }
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-white rounded-xl shadow flex overflow-hidden">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="Search place..."
        className="px-4 py-2 text-sm outline-none w-64"
      />
      <button
        onClick={handleSearch}
        className="px-4 bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
      >
        Search
      </button>
    </div>
  );
};

export default SearchPlace;