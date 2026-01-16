import PlaceList from "./PlaceList";

const radiusOptions = [
  { label: "500m", value: 500 },
  { label: "1km", value: 1000 },
  { label: "3km", value: 3000 },
  { label: "5km", value: 5000 },
];

const LeftPanel = ({
  selectedCategory,
  setSelectedCategory,
  selectedPlace,
  setSelectedPlace,
  center,
  radius,
  setRadius,
}) => {
  return (
    <div className="w-100 h-full border-r flex flex-col">
      {/* 🔘 Radius Selector */}
      <div className="p-3 border-b">
        <p className="text-sm font-semibold mb-2">
          Search Radius
        </p>

        <div className="flex gap-2 flex-wrap">
          {radiusOptions.map(r => (
            <button
              key={r.value}
              onClick={() => {
                console.log("📏 Radius changed:", r.value);
                setRadius(r.value);
              }}
              className={`px-3 py-1 rounded text-sm ${
                radius === r.value
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Place list */}
      <div className="flex-1 min-h-0">
        <PlaceList
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedPlace={selectedPlace}
          setSelectedPlace={setSelectedPlace}
          center={center}
          radius={radius}
        />
      </div>
    </div>
  );
};

export default LeftPanel;
