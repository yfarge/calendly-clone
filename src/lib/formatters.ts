export function formatEventDescription(minuteDuration: number) {
  const hours = Math.floor(minuteDuration / 60);
  const minutes = minuteDuration % 60;
  const minutesString = `${minutes} ${minutes > 1 ? 'mins' : 'min'}`;
  const hoursString = `${hours} ${hours > 1 ? 'hours' : 'hour'}`;

  if (hours === 0) return minutesString;
  if (minutes === 0) return hoursString;
  return `${hoursString} ${minutesString}`;
}
