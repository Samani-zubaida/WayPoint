// services/streetService.js
import axios from "axios";

const MAP_TOKEN = "MLY|25280799381575069|7271765b0b9af16d9a64ac8f979141ed";

export const getStreetImages = async (lat, lon) => {
  console.log("Loaded MAP_TOKEN:", MAP_TOKEN);

  if (!MAP_TOKEN) throw new Error("Mapillary access token missing");

  const url = `https://graph.mapillary.com/images?fields=id,thumb_1024_url&access_token=${MAP_TOKEN}&closeto=${lat},${lon}&limit=5`;

  const res = await axios.get(url);

  return res.data.data.map((img) => ({
    id: img.id,
    url: img.thumb_1024_url,
  }));
};
