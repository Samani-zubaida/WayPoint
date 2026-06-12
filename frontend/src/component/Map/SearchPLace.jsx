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
        id: Date.now(),
        name: data[0].display_name,
        lat: Number(data[0].lat),
        lng: Number(data[0].lon),
      };

      // MOVE MAP
      map.flyTo([place.lat, place.lng], 16, {
        duration: 1.5,
      });

      // SEND TO PARENT
      onSearch(place);

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="absolute top-4 left-1/2 -translate-x-1/2 z-[1000] bg-white rounded-xl shadow flex overflow-hidden">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && handleSearch()
        }
        placeholder="Search place..."
        className="px-4 py-2 text-sm outline-none w-64"
      />

      <button
        onClick={handleSearch}
        className="px-4 bg-blue-600 text-white"
      >
        Search
      </button>
    </div>
  );
};

export default SearchPlace;