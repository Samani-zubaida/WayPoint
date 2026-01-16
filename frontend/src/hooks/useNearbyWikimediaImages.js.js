import { useState, useEffect } from "react";

export const useNearbyWikimediaImages = (
  location,
  radius = 1000,
  limit = 5
) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!location?.lat || !location?.lon) return;

    const fetchImages = async () => {
      try {
        const url = `
https://commons.wikimedia.org/w/api.php
?origin=*
&action=query
&format=json
&generator=geosearch
&ggscoord=${location.lat}|${location.lon}
&ggsradius=${radius}
&ggslimit=${limit}
&ggsnamespace=6
&prop=imageinfo
&iiprop=url|extmetadata
&iiurlwidth=400
        `.replace(/\s+/g, "");

        const res = await fetch(url);
        const data = await res.json();

        let result = [];

        if (data.query?.pages) {
          result = Object.values(data.query.pages).map((p) => {
            const meta = p.imageinfo?.[0]?.extmetadata || {};
            return {
              id: p.pageid,
              url: p.imageinfo?.[0]?.url,
              title: p.title?.replace("File:", "") || "Nearby Place",
              description:
                meta.ImageDescription?.value?.replace(/<[^>]+>/g, "") ||
                "No description available",
              lat: p.coordinates?.[0]?.lat,
              lon: p.coordinates?.[0]?.lon,
            };
          });
        }

        setImages(result.slice(0, limit));
      } catch (err) {
        setError(err.message);
      }
    };

    fetchImages();
  }, [location, radius, limit]);

  return { images, error };
};
