import { getNearbyPlaces } from "../../services/placesService.js";

export const fetchNearbyPlaces = async (req, res) => {
  try {
    const {
      lat,
      lon,
      lng,
      radius = 500,
    } = req.query;

    // SUPPORT BOTH lon and lng
    const longitude = lon || lng;

    console.log("📍 REQUEST:", {
      lat,
      longitude,
      radius,
    });

    if (!lat || !longitude) {
      return res.status(400).json({
        success: false,
        error: "lat and longitude required",
      });
    }

    const places = await getNearbyPlaces(
      lat,
      longitude,
      radius
    );

    return res.status(200).json({
      success: true,
      data: places,
    });
  } catch (err) {
    console.error("❌ CONTROLLER ERROR:");
    console.error(err);

    return res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};