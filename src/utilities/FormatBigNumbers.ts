export default function FormatBigNumbers(value: number) {
  if (value < 1000) {
    return value.toString();
  } else if (value >= 1000 && value < 1000000) {
    const thousands = (value / 1000).toFixed(1);
    return `${thousands}k`;
  } else if (value >= 1000000 && value < 1000000000) {
    const millions = (value / 1000000).toFixed(1);
    return `${millions}m`;
  } else if (value >= 1000000000) {
    const billions = (value / 1000000000).toFixed(1);
    return `${billions}b`;
  }
}
