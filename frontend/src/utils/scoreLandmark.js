export function scoreLandmark(lm) {
  let score = 0;

  if (lm.tags?.name) score += 5;
  if (lm.tags?.leisure === "park") score += 6;
  if (lm.tags?.historic) score += 7;
  if (lm.tags?.tourism) score += 6;

  if (lm.tags?.["building:colour"]) score += 8;
  if (lm.tags?.colour) score += 6;

  return score;
}
