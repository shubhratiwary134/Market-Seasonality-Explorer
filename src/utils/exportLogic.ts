import Papa from "papaparse";
import { format } from "date-fns";
import type { ProcessedDayData } from "@/types/types";

export const exportToCsv = (data: ProcessedDayData[], filename: string) => {
  if (!data || data.length === 0) {
    alert("No data available to export.");
    return;
  }

  const flattenedData = data.map((day) => ({
    date: format(day.date, "yyyy-MM-dd"),
    performance: day.performance,
    volatility: day.volatility.toFixed(4),
    tradingVolume: day.tradingVolume,
    open: day.ohlc.open,
    high: day.ohlc.high,
    low: day.ohlc.low,
    close: day.ohlc.close,
  }));

  const csv = Papa.unparse(flattenedData);

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", filename);
  link.style.visibility = "hidden";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
