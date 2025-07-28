import React, { useMemo } from "react";
import { getCalendarMonth } from "../../utils/date";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarCell } from "./CalendarCells";
import { format, isWithinInterval } from "date-fns";
import type { AggregatedData, ProcessedDayData } from "@/types/types";
import type { ViewMode } from "../layout/Header";

interface CalendarGridProps {
  month: Date;
  selectedDate: Date | null;
  dailyData: ProcessedDayData[];
  weeklyData: AggregatedData[];
  monthlyData: AggregatedData | null;
  viewMode: ViewMode;
  onDateSelect: (date: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  month,
  selectedDate,
  dailyData = [],
  weeklyData = [],
  monthlyData,
  viewMode,
  onDateSelect,
}) => {
  const calendarWeeks = getCalendarMonth(month);

  const dailyDataMap = useMemo(() => {
    return new Map(
      dailyData.map((item) => [format(item.date, "yyyy-MM-dd"), item])
    );
  }, [dailyData]);

  const findDataForDay = (day: Date) => {
    if (viewMode === "month" && monthlyData) {
      return {
        date: day,
        ohlc: {
          open: monthlyData.open,
          close: monthlyData.close,
          high: 0,
          low: 0,
        },
        ...monthlyData,
      };
    }
    if (viewMode === "week") {
      const weekData = weeklyData.find((week) =>
        isWithinInterval(day, { start: week.startDate, end: week.endDate })
      );
      if (weekData) {
        return {
          date: day,
          ohlc: { open: weekData.open, close: weekData.close, high: 0, low: 0 },
          ...weekData,
        };
      }
    }
    return dailyDataMap.get(format(day, "yyyy-MM-dd"));
  };

  return (
    <div className="bg-white border-l border-b border-gray-200 shadow-md rounded-lg overflow-hidden py-5">
      <CalendarHeader />
      <div className="grid grid-cols-7">
        {calendarWeeks.flat().map((day, index) => {
          const dayData = findDataForDay(day);
          return (
            <CalendarCell
              key={index}
              day={day}
              currentMonth={month}
              isSelected={
                !!selectedDate && selectedDate.getTime() === day.getTime()
              }
              dayData={dayData}
              onClick={onDateSelect}
            />
          );
        })}
      </div>
    </div>
  );
};
