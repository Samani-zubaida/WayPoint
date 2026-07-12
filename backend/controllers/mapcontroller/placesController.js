import { getNearbyPlaces } from "../../services/placesService.js";

export const fetchNearbyPlaces = async (
  req,
  res
) => {
  try {
    const {
      lat,
      lon,
      lng
    } = req.query;

    const longitude = lon || lng;

    const radius = Number(
      req.query.radius || 500
    );

    if (!lat || !longitude) {
      return res.status(400).json({
        success: false,
        error:
          "Latitude and longitude are required."
      });
    }

    const places =
      await getNearbyPlaces(
        Number(lat),
        Number(longitude),
        radius
      );

    return res.json({
      success: true,
      data: places
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      error: error.message
    });
  }
};