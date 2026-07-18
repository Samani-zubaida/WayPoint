import { getNearbyPlaces } from "../../services/placesService.js";

export const fetchNearbyPlaces = async (req, res) => {
  try {
    const { lat, lon, lng, radius = 500 } = req.query;

    const latitude = Number(lat);
    const longitude = Number(lon || lng);
    const searchRadius = Number(radius);

    if (
      Number.isNaN(latitude) ||
      Number.isNaN(longitude)
    ) {
      return res.status(400).json({
        success: false,
        error: "Valid latitude and longitude are required.",
      });
    }

    const places = await getNearbyPlaces(
      latitude,
      longitude,
      searchRadius
    );

    return res.status(200).json({
      success: true,
      count: places.length,
      data: places,
    });
  } catch (error) {
    console.error("Nearby Places Error:", error.message);

    return res.status(500).json({
      success: false,
      error: error.message || "Failed to fetch nearby places",
    });
  }
};