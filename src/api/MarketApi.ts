import type { IntradayDataPoint, OhlcvData } from "@/types/types";
import {
  startOfMonth,
  endOfMonth,
  format,
  startOfDay,
  endOfDay,
} from "date-fns";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "https://api.binance.com/api/v3/klines";

export const fetchMarketData = async (
  instrument: string,
  month: Date
): Promise<OhlcvData[]> => {
  const startTime = startOfMonth(month).getTime();
  const endTime = endOfMonth(month).getTime();

  const params = new URLSearchParams({
    symbol: instrument,
    interval: "1d",
    startTime: String(startTime),
    endTime: String(endTime),
    limit: "1000",
  });

  const response = await fetch(`${API_BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error(
      `Failed to fetch data from Binance API: ${response.statusText}`
    );
  }

  const data: any[][] = await response.json();

  const formattedData: OhlcvData[] = data.map((d) => ({
    timestamp: d[0],
    open: parseFloat(d[1]),
    high: parseFloat(d[2]),
    low: parseFloat(d[3]),
    close: parseFloat(d[4]),
    volume: parseFloat(d[5]),
  }));

  return formattedData;
};

export const fetchIntradayData = async (
  instrument: string,
  date: Date
): Promise<IntradayDataPoint[]> => {
  const startTime = startOfDay(date).getTime();
  const endTime = endOfDay(date).getTime();

  const params = new URLSearchParams({
    symbol: instrument,
    interval: "1h",
    startTime: String(startTime),
    endTime: String(endTime),
  });

  const response = await fetch(`${API_BASE_URL}?${params}`);
  if (!response.ok) {
    throw new Error("Failed to fetch intraday data");
  }

  const data: any[][] = await response.json();

  const formattedData: IntradayDataPoint[] = data.map((d) => ({
    time: format(new Date(d[0]), "HH:mm"),
    price: parseFloat(d[4]),
  }));

  return formattedData;
};
