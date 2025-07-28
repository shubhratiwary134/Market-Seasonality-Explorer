import type { AggregatedData, ProcessedDayData } from "@/types/types";
import { startOfWeek } from "date-fns";

export const aggregateDataByWeek = (
  dailyData: ProcessedDayData[]
): AggregatedData[] => {
  if (!dailyData.length) {
    return [];
  }

  const weeklyDataMap = new Map<string, ProcessedDayData[]>();

  dailyData.forEach((day) => {
    const weekStart = startOfWeek(day.date);
    const weekStartKey = weekStart.toISOString();

    if (!weeklyDataMap.has(weekStartKey)) {
      weeklyDataMap.set(weekStartKey, []);
    }
    weeklyDataMap.get(weekStartKey)!.push(day);
  });

  const aggregatedWeeks: AggregatedData[] = [];

  weeklyDataMap.forEach((weekDays) => {
    weekDays.sort((a, b) => a.date.getTime() - b.date.getTime());

    const open = weekDays[0].ohlc.open;
    const close = weekDays[weekDays.length - 1].ohlc.close;

    let performance: "positive" | "negative" | "neutral" = "neutral";
    if (close > open) {
      performance = "positive";
    } else if (close < open) {
      performance = "negative";
    }

    const totalVolume = weekDays.reduce(
      (sum, day) => sum + day.tradingVolume,
      0
    );
    const averageVolatility =
      weekDays.reduce((sum, day) => sum + day.volatility, 0) / weekDays.length;

    aggregatedWeeks.push({
      startDate: weekDays[0].date,
      endDate: weekDays[weekDays.length - 1].date,
      open,
      close,
      performance,
      tradingVolume: totalVolume,
      volatility: averageVolatility,
    });
  });

  return aggregatedWeeks;
};
export const aggregateDataByMonth = (
  dailyData: ProcessedDayData[]
): AggregatedData | null => {
  if (dailyData.length < 2) {
    return null;
  }

  const sortedData = [...dailyData].sort(
    (a, b) => a.date.getTime() - b.date.getTime()
  );

  const open = sortedData[0].ohlc.open;
  const close = sortedData[sortedData.length - 1].ohlc.close;

  let performance: "positive" | "negative" | "neutral" = "neutral";
  if (close > open) {
    performance = "positive";
  } else if (close < open) {
    performance = "negative";
  }

  const totalVolume = sortedData.reduce(
    (sum, day) => sum + day.tradingVolume,
    0
  );
  const averageVolatility =
    sortedData.reduce((sum, day) => sum + day.volatility, 0) /
    sortedData.length;

  return {
    startDate: sortedData[0].date,
    endDate: sortedData[sortedData.length - 1].date,
    open,
    close,
    performance,
    tradingVolume: totalVolume,
    volatility: averageVolatility,
  };
};
