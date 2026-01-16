export function analyzeMessage(message) {
  const lower = message.toLowerCase();

  // GREETINGS
  if (
    lower.includes("hi") ||
    lower.includes("hello") ||
    lower.includes("hey") ||
    lower.includes("how are you")
  ) {
    return {
      type: "greeting",
      intent: "casual_greeting",
      entities: {}
    };
  }

  // TRAVEL / PLACES
  const places = [];
  const countries = [];

  if (lower.includes("paris")) {
    places.push("Paris");
    countries.push("France");
  }

  if (lower.includes("london")) {
    places.push("London");
    countries.push("UK");
  }

  if (lower.includes("rome")) {
    places.push("Rome");
    countries.push("Italy");
  }

  if (places.length > 0) {
    return {
      type: "travel_query",
      intent: "ask_places",
      entities: {
        places,
        countries: [...new Set(countries)]
      }
    };
  }

  // DEFAULT
  return {
    type: "general_query",
    intent: "unknown",
    entities: {}
  };
}
