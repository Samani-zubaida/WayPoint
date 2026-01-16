export async function fetchLandmarks(lat, lon, radius = 80) {
    const query = `
    [out:json];
    (
      node(around:${radius},${lat},${lon})[building];
      node(around:${radius},${lat},${lon})[leisure=park];
      node(around:${radius},${lat},${lon})[historic];
      node(around:${radius},${lat},${lon})[tourism];
    );
    out tags center;
  `;

    const res = await fetch("https://overpass-api.de/api/interpreter", {
        method: "POST",
        body: query,
    });

    const data = await res.json();
    return data.elements || [];
}
