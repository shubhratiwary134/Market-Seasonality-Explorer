import React from "react";
import { format, isToday, isSameMonth } from "date-fns";
import clsx from "clsx";

interface CalendarCellProps {
  day: Date;
  currentMonth: Date;
  isSelected: boolean;
  onClick: (day: Date) => void;
}

export const CalendarCell: React.FC<CalendarCellProps> = ({
  day,
  currentMonth,
  isSelected,
  onClick,
}) => {
  const isCurrentMonth = isSameMonth(day, currentMonth);
  const isTodaysDate = isToday(day);

  return (
    <div
      onClick={() => onClick(day)}
      className={clsx(
        "relative h-24 border-t border-r border-gray-200 p-2 text-sm transition-colors duration-150 cursor-pointer hover:bg-blue-50",
        {
          "text-gray-900": isCurrentMonth,
          "text-gray-400": !isCurrentMonth,
          "bg-blue-100": isSelected,
        }
      )}
    >
      <time
        dateTime={format(day, "yyyy-MM-dd")}
        className={clsx(
          "flex h-6 w-6 items-center justify-center rounded-full font-semibold",
          {
            "bg-blue-600 text-white": isTodaysDate,
          }
        )}
      >
        {format(day, "d")}
      </time>
    </div>
  );
};
