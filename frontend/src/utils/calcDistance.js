// utils/calcDistance.js
export const getDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371000; // meters
  const toRad = (d) => (d * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) *
    Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) ** 2;

  return R * (2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
};

export const estimateETA = (distanceKm, mode = "walk") => {
  const speed = mode === "drive" ? 30 : 5; // km/h
  const hours = distanceKm / speed;
  const minutes = Math.round(hours * 60);

  return minutes < 60
    ? `${minutes} min`
    : `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
};