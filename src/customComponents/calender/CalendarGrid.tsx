import React, { useMemo } from "react";
import { getCalendarMonth } from "../../utils/date";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarCell } from "./CalendarCells";
import { format } from "date-fns";
import type { ProcessedDayData } from "@/types/types";

interface CalendarGridProps {
  month: Date;
  selectedDate: Date | null;
  data: ProcessedDayData[];
  onDateSelect: (date: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  month,
  selectedDate,
  data = [],
  onDateSelect,
}) => {
  const calendarWeeks = getCalendarMonth(month);

  const dataMap = useMemo(() => {
    return new Map(data.map((item) => [format(item.date, "yyyy-MM-dd"), item]));
  }, [data]);

  return (
    <div className="bg-white border-l border-b border-gray-200 shadow-md rounded-lg overflow-hidden">
      <CalendarHeader />
      <div className="grid grid-cols-7">
        {calendarWeeks.flat().map((day, index) => {
          const dayKey = format(day, "yyyy-MM-dd");
          const dayData = dataMap.get(dayKey);
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
