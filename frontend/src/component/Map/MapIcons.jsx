import L from "leaflet";
import { renderToStaticMarkup } from "react-dom/server";

import {
  UtensilsCrossed,
  Hospital,
  Fuel,
  Landmark,
  Bus,
  Film,
  Church,
  Toilet,
  Hotel,
  GraduationCap,
  Pill,
  MapPin,
  Coffee,
} from "lucide-react";

const createDivIcon = (
  Icon,
  bgColor,
  iconColor = "white",
  size = 20
) => {
  return L.divIcon({
    className: "",
    html: renderToStaticMarkup(
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: "50%",
          background: bgColor,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 10px rgba(0,0,0,.3)",
          border: "3px solid white",
        }}
      >
        <Icon color={iconColor} size={size} strokeWidth={2.5} />
      </div>
    ),
    iconSize: [40, 40],
    iconAnchor: [20, 20],
  });
};

export const icons = {
  restaurant: createDivIcon(UtensilsCrossed, "#ef4444"),
  fast_food: createDivIcon(UtensilsCrossed, "#ef4444"),
  cafe: createDivIcon(Coffee, "#f97316"),

  hospital: createDivIcon(Hospital, "#dc2626"),
  pharmacy: createDivIcon(Pill, "#9333ea"),

  fuel: createDivIcon(Fuel, "#f59e0b"),

  bank: createDivIcon(Landmark, "#16a34a"),
  atm: createDivIcon(Landmark, "#22c55e"),

  bus_station: createDivIcon(Bus, "#2563eb"),

  cinema: createDivIcon(Film, "#8b5cf6"),

  place_of_worship: createDivIcon(Church, "#6b7280"),

  toilets: createDivIcon(Toilet, "#0ea5e9"),

  school: createDivIcon(GraduationCap, "#0284c7"),

  hotel: createDivIcon(Hotel, "#475569"),

  default: createDivIcon(MapPin, "#3b82f6"),

  user: createDivIcon(MapPin, "#2563eb", "white", 24),
};