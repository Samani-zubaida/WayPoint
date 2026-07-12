import axios from "axios";

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
    2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c;
}

export const getNearbyPlaces = async (
  lat,
  lon,
  radius = 500
) => {
  try {
    console.log("📡 Fetching nearby places from Geoapify...");

    const apiKey = process.env.GEOAPIFY_API_KEY;

    if (!apiKey) {
      throw new Error(
        "Missing GEOAPIFY_API_KEY in .env"
      );
    }

    const categories = [
      "catering.restaurant",
      "catering.fast_food",
      "commercial.supermarket",
      "healthcare.hospital",
      "healthcare.pharmacy",
      "service.bank",
      "service.atm",
      "entertainment",
      "tourism",
      "education.school",
      "education.university"
    ].join(",");

    const url =
      "https://api.geoapify.com/v2/places";

    const response = await axios.get(url, {
      params: {
        categories,
        filter: `circle:${lon},${lat},${radius}`,
        bias: `proximity:${lon},${lat}`,
        limit: 100,
        apiKey
      },
      timeout: 30000
    });

    const features =
      response.data.features || [];

    const places = features.map((feature) => {
      const p = feature.properties;

      return {
        id: p.place_id,

        name:
          p.name ||
          p.address_line1 ||
          "Unnamed Place",

        type:
          p.categories?.[0] || "place",

        lat: p.lat,

        lon: p.lon,

        address:
          p.formatted || "",

        distance: calculateDistance(
          Number(lat),
          Number(lon),
          p.lat,
          p.lon
        )
      };
    });

    console.log(
      `✅ Found ${places.length} places`
    );

    return places;
  } catch (error) {
    console.error("❌ Geoapify Error");
    console.error(error.response?.data || error.message);

    throw new Error(
      "Failed to fetch nearby places"
    );
  }
};