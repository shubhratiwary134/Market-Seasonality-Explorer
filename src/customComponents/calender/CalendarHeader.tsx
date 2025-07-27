import React from "react";

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const CalendarHeader: React.FC = () => {
  return (
    <div className="grid grid-cols-7">
      {WEEK_DAYS.map((day) => (
        <div
          key={day}
          className="py-2 text-center text-sm font-medium text-gray-500"
        >
          {day}
        </div>
      ))}
    </div>
  );
};
