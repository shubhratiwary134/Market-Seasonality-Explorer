export const getVolatilityColor = (volatility: number): string => {
  if (volatility < 1.5) {
    return "bg-emerald-400 hover:bg-emerald-500";
  }
  if (volatility < 2.5) {
    return "bg-amber-400 hover:bg-amber-500";
  }
  return "bg-red-400 hover:bg-red-500";
};
