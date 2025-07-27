export interface OhlcvData {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface ProcessedDayData {
  date: Date;

  volatility: number;

  tradingVolume: number;

  performance: "positive" | "negative" | "neutral";

  ohlc: {
    open: number;
    high: number;
    low: number;
    close: number;
  };
}
