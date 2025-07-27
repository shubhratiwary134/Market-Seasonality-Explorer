import React, { useState } from "react";
import { CalendarGrid } from "../customComponents/calender/CalendarGrid";
import { Header } from "../customComponents/layout/Header";
import { getNextMonth, getPreviousMonth } from "../utils/date";

export const MarketExplorer: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handlePreviousMonth = () => {
    setCurrentMonth(getPreviousMonth(currentMonth));
  };

  const handleNextMonth = () => {
    setCurrentMonth(getNextMonth(currentMonth));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="p-4 md:p-8">
      <Header
        currentMonth={currentMonth}
        onNextMonth={handleNextMonth}
        onPreviousMonth={handlePreviousMonth}
      />
      <CalendarGrid
        month={currentMonth}
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
      />
    </div>
  );
};
