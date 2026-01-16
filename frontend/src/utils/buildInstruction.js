export function buildInstruction(turn, landmark) {
  if (!landmark) {
    return `Turn ${turn.direction}`;
  }

  const name = landmark.tags?.name;
  const color = landmark.tags?.["building:colour"] || landmark.tags?.colour;
  const type =
    landmark.tags?.leisure === "park"
      ? "park"
      : landmark.tags?.historic
      ? "historic building"
      : "building";

  if (color) {
    return `Turn ${turn.direction} after the ${color} ${type}`;
  }

  if (name) {
    return `Turn ${turn.direction} after ${name}`;
  }

  return `Turn ${turn.direction} after the ${type}`;
}
