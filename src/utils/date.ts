import type { OhlcvData, ProcessedDayData } from "@/types/types";
import {
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  eachDayOfInterval,
  add,
} from "date-fns";

export const getCalendarMonth = (month: Date): Date[][] => {
  const monthStart = startOfMonth(month);
  const monthEnd = endOfMonth(month);
  const startDate = startOfWeek(monthStart);
  const endDate = endOfWeek(monthEnd);

  const daysInMonth = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const weeks: Date[][] = [];
  let week: Date[] = [];

  daysInMonth.forEach((day) => {
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
    week.push(day);
  });

  if (week.length > 0) {
    weeks.push(week);
  }

  return weeks;
};

export const getNextMonth = (month: Date): Date => {
  return add(month, { months: 1 });
};

export const getPreviousMonth = (month: Date): Date => {
  return add(month, { months: -1 });
};

export const processApiData = (data: OhlcvData[]): ProcessedDayData[] => {
  return data.map((day) => {
    let performance: "positive" | "negative" | "neutral" = "neutral";
    if (day.close > day.open) {
      performance = "positive";
    } else if (day.close < day.open) {
      performance = "negative";
    }

    const volatility = day.low > 0 ? ((day.high - day.low) / day.low) * 100 : 0;

    return {
      date: new Date(day.timestamp),
      volatility: volatility,
      tradingVolume: day.volume,
      performance: performance,
      ohlc: {
        open: day.open,
        high: day.high,
        low: day.low,
        close: day.close,
      },
    };
  });
};
