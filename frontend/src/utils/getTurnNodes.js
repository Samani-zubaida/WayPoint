export function getTurnNodes(route, angleThreshold = 35) {
  if (!route || route.length < 3) return [];

  const turns = [];

  for (let i = 1; i < route.length - 1; i++) {
    const p1 = route[i - 1];
    const p2 = route[i];
    const p3 = route[i + 1];

    const angle = calculateTurnAngle(p1, p2, p3);

    if (Math.abs(angle) > angleThreshold) {
      turns.push({
        index: i,
        lat: p2.lat,
        lon: p2.lng,
        direction: angle > 0 ? "right" : "left",
      });
    }
  }

  return turns;
}

function calculateTurnAngle(a, b, c) {
  const ab = { x: b.lng - a.lng, y: b.lat - a.lat };
  const bc = { x: c.lng - b.lng, y: c.lat - b.lat };

  const dot = ab.x * bc.x + ab.y * bc.y;
  const mag1 = Math.hypot(ab.x, ab.y);
  const mag2 = Math.hypot(bc.x, bc.y);

  const angle = Math.acos(dot / (mag1 * mag2));
  return (angle * 180) / Math.PI;
}
