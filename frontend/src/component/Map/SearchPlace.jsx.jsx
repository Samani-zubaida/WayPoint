import { useState } from "react";
import { Search } from "lucide-react";

const SearchPlace = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      setLoading(true);

      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`
      );

      const data = await res.json();

      if (!data.length) {
        alert("No place found");
        return;
      }

      onSearch({
        id: Date.now(),
        name: data[0].display_name,
        lat: Number(data[0].lat),
        lng: Number(data[0].lon),
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex w-[430px]  rounded-2xl border border-gray-200 bg-white shadow-2xl mt-22 ">

      <div className="flex items-center px-4 text-gray-500">
        <Search size={20} />
      </div>

      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && handleSearch()
        }
        placeholder="Search any place..."
        className="flex-1 py-3 outline-none"
      />

      <button
        onClick={handleSearch}
        className="bg-blue-600 px-6 text-white hover:bg-blue-700"
      >
        {loading ? "..." : "Search"}
      </button>
    </div>
  );
};

export default SearchPlace;