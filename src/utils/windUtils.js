export const selectTextDirection = (degree) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(degree / 45) % 16] || "NW";
};

export const selectArrow = (degree) => {
  const directions = ["🡹", "🡽", "🡺", "🡾", "🡻", "🡿", "🡸", "🡼"];
  const unicodeDirections = [
    "&#129145;",
    "&#129149;",
    "&#129146;",
    "&#129150;",
    "&#129147;",
    "&#129151;",
    "&#129144;",
    "&#129148;",
  ];
  return unicodeDirections[Math.round(degree / 45) % 16] || "🡼";
};
