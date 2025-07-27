import type { OhlcvData } from "@/types/types";

const MOCK_BTC_DATA: OhlcvData[] = [
  {
    timestamp: 1751337000000,
    open: 70000,
    high: 71500,
    low: 69800,
    close: 71200,
    volume: 1200,
  },
  {
    timestamp: 1751423400000,
    open: 71200,
    high: 72000,
    low: 71000,
    close: 71800,
    volume: 1500,
  },
  {
    timestamp: 1751509800000,
    open: 71800,
    high: 71900,
    low: 70500,
    close: 70600,
    volume: 1100,
  },
  {
    timestamp: 1751596200000,
    open: 70600,
    high: 71200,
    low: 70400,
    close: 71100,
    volume: 900,
  },
];

export const fetchMarketData = async (
  instrument: string,
  month: Date
): Promise<OhlcvData[]> => {
  console.log(`Fetching data for ${instrument} for month:`, month);

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(MOCK_BTC_DATA);
    }, 1000);
  });
};
