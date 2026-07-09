import { useEffect, useState } from "react";
import { getPlaceImage } from "../../utils/getImage";

const PlaceCard = ({ place, onSelect, isSelected }) => {
  const [image, setImage] = useState("/defaults/default-image.webp");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function loadImage() {
      setLoading(true);
      const img = await getPlaceImage(place.name, place.type);
      if (isMounted) {
        setImage(img);
        setLoading(false);
      }
    }

    loadImage();
    return () => (isMounted = false);
  }, [place.name, place.type]);

  return (
    <div
      onClick={() => onSelect(place)}  
      className={`
        w-full flex items-center gap-4
        rounded-xl p-4 cursor-pointer
        transition
        ${
          isSelected
            ? "bg-blue-50 border border-blue-400 shadow-md"
            : "bg-white shadow-sm hover:shadow-md"
        }
      `}
    >
      {/* Image */}
      <div className="h-20 w-20 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
        {loading ? (
          <div className="h-full w-full animate-pulse bg-gray-200" />
        ) : (
          <img
            src={image}
            alt={place.name}
            className="h-full w-full object-cover"
            loading="lazy"
          />
        )}
      </div>

      {/* Text */}
      <div className="flex flex-col gap-1">
        <h4 className="text-sm font-semibold text-gray-800 leading-tight">
          {place.name}
        </h4>

      <p className="text-xs text-gray-500 capitalize">
  {(place.placeType || place.type || "Unknown").replace(/_/g, " ")}
</p>

        {place.distance && (
          <p className="text-[11px] text-blue-600 font-medium">
            {Math.round(place.distance)} m away
          </p>
        )}

        <span className="text-[11px] text-blue-500 font-medium">
          Get directions →
        </span>
      </div>
    </div>
  );
};

export default PlaceCard;
