export const selectTextDirection = (degree) => {
  const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  return directions[Math.round(degree / 45) % 16] || "NW";
};

export const selectArrow = (degree) => {
  const directions = ["🡹", "🡽", "🡺", "🡾", "🡻", "🡿", "🡸", "🡼"];
  return directions[Math.round(degree / 45) % 16] || "🡼";
};
