import { useState, useEffect } from "react";

export const useNearbyWikimediaImages = (
  location,
  radius = 1000,
  limit = 5
) => {
  const [images, setImages] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {

    // FIXED
    if (!location?.lat || !location?.lng) return;

    const fetchImages = async () => {
      try {

        const url = `
https://commons.wikimedia.org/w/api.php
?origin=*
&action=query
&format=json
&generator=geosearch
&ggscoord=${location.lat}|${location.lng}
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

            const meta =
              p.imageinfo?.[0]?.extmetadata || {};

            return {
              id: p.pageid,

              url: p.imageinfo?.[0]?.thumburl ||
                   p.imageinfo?.[0]?.url,

              title:
                p.title?.replace("File:", "") ||
                "Nearby Place",

              description:
                meta.ImageDescription?.value
                  ?.replace(/<[^>]+>/g, "") ||
                "Nearby Image",

              // USE CURRENT LOCATION
              lat: location.lat,
              lng: location.lng,
            };
          });
        }

        setImages(result.slice(0, limit));

      } catch (err) {

        console.error(err);

        setError(err.message);
      }
    };

    fetchImages();

  }, [location?.lat, location?.lng, radius, limit]);

  return { images, error };
};