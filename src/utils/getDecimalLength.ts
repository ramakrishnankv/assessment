export function getDecimalLength(value: string | number): number {
  const decimals = value.toString().split('.');
  return decimals.length > 1 ? decimals[1].length : 0;
}
