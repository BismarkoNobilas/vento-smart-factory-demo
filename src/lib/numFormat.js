export function fmt(value, digits = 3) {
  if (value === null || value === undefined || isNaN(value)) return 0;
  return Number(value.toFixed(digits));
}
