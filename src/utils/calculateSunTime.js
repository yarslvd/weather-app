export function calculateSunTime(timestamp) {
  const options = { timeZoneName: "short" };
  const timezone = Intl.DateTimeFormat(undefined, options).resolvedOptions()
    .timeZone;

  return new Date(timestamp * 1000).toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: timezone,
  });
}
