import axios from "axios";

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3;

  const φ1 = (lat1 * Math.PI) / 180;
  const φ2 = (lat2 * Math.PI) / 180;

  const Δφ = ((lat2 - lat1) * Math.PI) / 180;
  const Δλ = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) *
    Math.cos(φ2) *
    Math.sin(Δλ / 2) *
    Math.sin(Δλ / 2);

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
  try {
    console.log("📡 Calling Overpass API...");

    const query = `
[out:json][timeout:25];

(
  node["amenity"](around:${radius},${lat},${lon});
);

out body;
`;
    const response = await axios.post(
      "https://overpass-api.de/api/interpreter",
      query,
      {
        headers: {
          "Content-Type": "text/plain",
          "User-Agent":
            "NearbyExplorer/1.0",
        },

        timeout: 30000,
      }
    );

    console.log("✅ OVERPASS SUCCESS");

    const elements =
      response.data.elements || [];

    const places = elements.map(
      (place) => ({
        id: place.id,

        name:
          place.tags?.name ||
          "Unnamed Place",

        type:
          place.tags?.amenity ||
          "place",

        lat: place.lat,
        lon: place.lon,

        distance: calculateDistance(
          Number(lat),
          Number(lon),
          place.lat,
          place.lon
        ),
      })
    );

    return places;
  } catch (error) {
    console.log(
      "❌ OVERPASS REAL ERROR"
    );

    console.log(
      "STATUS:",
      error.response?.status
    );

    console.log(
      "MESSAGE:",
      error.message
    );

    throw new Error(
      "Failed to fetch nearby places"
    );
  }
};