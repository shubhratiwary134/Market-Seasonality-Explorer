import React from "react";
import { getCalendarMonth } from "../../utils/date";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarCell } from "./CalendarCells";

interface CalendarGridProps {
  month: Date;
  selectedDate: Date | null;
  onDateSelect: (date: Date) => void;
}

export const CalendarGrid: React.FC<CalendarGridProps> = ({
  month,
  selectedDate,
  onDateSelect,
}) => {
  const calendarWeeks = getCalendarMonth(month);

  return (
    <div className="bg-white border-l border-b border-gray-200 shadow-md rounded-lg overflow-hidden">
      <CalendarHeader />
      <div className="grid grid-cols-7">
        {calendarWeeks.flat().map((day, index) => (
          <CalendarCell
            key={index}
            day={day}
            currentMonth={month}
            isSelected={
              !!selectedDate && selectedDate.getTime() === day.getTime()
            }
            onClick={onDateSelect}
          />
        ))}
      </div>
    </div>
  );
};
