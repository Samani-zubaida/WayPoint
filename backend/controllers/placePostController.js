import PlacePost from "../models/placePost.js";
import { uploadImage } from "../services/imageUpload.js";

export const createPlacePost = async (
  req,
  res
) => {
  try {
    const { lat, lng, placeId } =
      req.body;

    if (
      !req.files?.length ||
      !lat ||
      !lng ||
      !placeId
    ) {
      return res.status(400).json({
        message: "Missing data",
      });
    }

    const imageUrls =
      await Promise.all(
        req.files.map((file) =>
          uploadImage(file.path)
        )
      );

    const post =
      await PlacePost.create({
        images: imageUrls,
        lat,
        lng,
        placeId,
        userId: req.user.id,
      });

    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getPostsByPlace = async (req, res) => {
  try {
    const { placeId } = req.params;

    const posts = await PlacePost.find({ placeId })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
