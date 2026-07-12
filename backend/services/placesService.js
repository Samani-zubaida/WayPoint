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
    console.log("=================================");
    console.log("📡 Calling Overpass API");
    console.log("Latitude :", lat);
    console.log("Longitude:", lon);
    console.log("Radius   :", radius);
    console.log("=================================");

    const query = `
[out:json][timeout:25];

(
  node["amenity"](around:${radius},${lat},${lon});
  way["amenity"](around:${radius},${lat},${lon});
  relation["amenity"](around:${radius},${lat},${lon});
);

out center;
`;

    // Better Overpass mirror than overpass-api.de
    const response = await axios.post(
      "https://overpass.kumi.systems/api/interpreter",
      query,
      {
        headers: {
          "Content-Type": "text/plain",
        },
        timeout: 60000,
      }
    );

    console.log("✅ Overpass Success");

    const elements = response.data?.elements || [];

    const places = elements.map((place) => ({
      id: place.id,

      name: place.tags?.name || "Unnamed Place",

      type: place.tags?.amenity || "place",

      lat: place.lat ?? place.center?.lat,

      lon: place.lon ?? place.center?.lon,

      distance: calculateDistance(
        Number(lat),
        Number(lon),
        place.lat ?? place.center?.lat,
        place.lon ?? place.center?.lon
      ),
    }));

    console.log(`✅ Found ${places.length} places`);

    return places;
  } catch (error) {
    console.log("=================================");
    console.log("❌ OVERPASS ERROR");
    console.log("Message :", error.message);
    console.log("Code    :", error.code);
    console.log("Status  :", error.response?.status);
    console.log("Data    :", error.response?.data);
    console.log("Stack   :", error.stack);
    console.log("=================================");

    throw error;
  }
};