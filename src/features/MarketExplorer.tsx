import React, { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarGrid } from "../customComponents/calender/CalendarGrid";
import { Header } from "../customComponents/layout/Header";
import { getNextMonth, getPreviousMonth, processApiData } from "../utils/date";
import { fetchMarketData } from "../api/MarketApi";
import { DetailsPanel } from "@/customComponents/dashboard/DetailsPanel";
import { format } from "date-fns";

export const MarketExplorer: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date("2025-07-01"));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["marketData", "BTC-USD", currentMonth.toISOString()],
    queryFn: () => fetchMarketData("BTC-USD", currentMonth),
    select: processApiData,
  });

  const selectedDayData = useMemo(() => {
    if (!selectedDate || !data) return null;
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    return data.find((d) => format(d.date, "yyyy-MM-dd") === dateKey) ?? null;
  }, [selectedDate, data]);

  const handlePreviousMonth = () => {
    setCurrentMonth(getPreviousMonth(currentMonth));
  };

  const handleNextMonth = () => {
    setCurrentMonth(getNextMonth(currentMonth));
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handlePanelClose = () => setSelectedDate(null);

  return (
    <div className="p-4 md:p-8">
      <Header
        currentMonth={currentMonth}
        onNextMonth={handleNextMonth}
        onPreviousMonth={handlePreviousMonth}
      />
      {isLoading && <p className="text-center">Loading data...</p>}
      {isError && (
        <p className="text-center text-red-500">Error fetching data.</p>
      )}
      {data && (
        <CalendarGrid
          month={currentMonth}
          selectedDate={selectedDate}
          onDateSelect={handleDateSelect}
          data={data}
        />
      )}
      <DetailsPanel
        isOpen={!!selectedDayData}
        onOpenChange={(isOpen) => !isOpen && handlePanelClose()}
        dayData={selectedDayData}
      />
    </div>
  );
};
