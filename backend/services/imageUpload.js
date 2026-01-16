import cloudinary from "cloudinary";

cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const uploadImage = async (filePath) => {
  const result = await cloudinary.v2.uploader.upload(filePath, {
    folder: "snap2map/place-posts",
  });

  return result.secure_url;
};
