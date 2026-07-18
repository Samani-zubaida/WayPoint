import axios from "axios";

const OVERPASS_SERVERS = [
  "https://overpass-api.de/api/interpreter",
  "https://lz4.overpass-api.de/api/interpreter",
  "https://overpass.kumi.systems/api/interpreter",
];

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;

  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;

  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) *
      Math.cos(φ2) *
      Math.sin(Δλ / 2) ** 2;

  const c =
    2 *
    Math.atan2(
      Math.sqrt(a),
      Math.sqrt(1 - a)
    );

  return R * c;
}

export const getNearbyPlaces = async (
  lat,
  lon,
  radius = 500
) => {
  const query = `
[out:json][timeout:20];

(
  node["amenity"~"restaurant|cafe|fast_food|hospital|pharmacy|bank|atm"](around:${radius},${lat},${lon});
  node["tourism"~"hotel|museum|attraction"](around:${radius},${lat},${lon});
  node["leisure"="park"](around:${radius},${lat},${lon});

  way["amenity"~"restaurant|cafe|fast_food|hospital|pharmacy|bank|atm"](around:${radius},${lat},${lon});
  way["tourism"~"hotel|museum|attraction"](around:${radius},${lat},${lon});
  way["leisure"="park"](around:${radius},${lat},${lon});

  relation["amenity"~"restaurant|cafe|fast_food|hospital|pharmacy|bank|atm"](around:${radius},${lat},${lon});
  relation["tourism"~"hotel|museum|attraction"](around:${radius},${lat},${lon});
  relation["leisure"="park"](around:${radius},${lat},${lon});
);

out center;
`;

  let lastError;

  for (const server of OVERPASS_SERVERS) {
    try {
      console.log(`📡 Trying ${server}`);

      const response = await axios.post(server, query, {
        headers: {
          "Content-Type": "text/plain",
          "User-Agent": "WayPoint/1.0",
        },
        timeout: 30000,
      });

      console.log("✅ Success:", server);

      const elements = response.data.elements || [];

      const places = elements
        .map((place) => {
          const placeLat = place.lat ?? place.center?.lat;
          const placeLon = place.lon ?? place.center?.lon;

          if (placeLat == null || placeLon == null) {
            return null;
          }

          return {
            id: place.id,
            name: place.tags?.name || "Unnamed Place",
            type:
              place.tags?.amenity ||
              place.tags?.tourism ||
              place.tags?.leisure ||
              "place",
            lat: placeLat,
            lon: placeLon,
            distance: calculateDistance(
              lat,
              lon,
              placeLat,
              placeLon
            ),
          };
        })
        .filter(Boolean)
        .sort((a, b) => a.distance - b.distance);

      return places;
    } catch (err) {
      console.log(`❌ ${server} failed`);
      console.log(err.message);

      lastError = err;
    }
  }

  console.error(lastError);

  throw new Error(
    "All Overpass servers are currently unavailable."
  );
};