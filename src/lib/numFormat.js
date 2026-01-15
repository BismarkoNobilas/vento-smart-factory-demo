export function fmt(value, digits = 3) {
  if (value === null || value === undefined || (isNaN(value) && value == 0))
    if (value === 0) return value;
  return 0;
  return Number(value.toFixed(digits));
}
