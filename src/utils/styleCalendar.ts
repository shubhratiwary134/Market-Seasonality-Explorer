export const getVolatilityColor = (volatility: number): string => {
  if (volatility < 1.5) {
    return "bg-green-200 hover:bg-green-300";
  }
  if (volatility < 2.5) {
    return "bg-yellow-200 hover:bg-yellow-300";
  }
  return "bg-red-200 hover:bg-red-300";
};
