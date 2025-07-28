import React, { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CalendarGrid } from "../customComponents/calender/CalendarGrid";
import { Header, type ViewMode } from "../customComponents/layout/Header";
import { getNextMonth, getPreviousMonth, processApiData } from "../utils/date";
import { fetchMarketData } from "../api/MarketApi";
import { DetailsPanel } from "@/customComponents/dashboard/DetailsPanel";
import { format, isAfter, isSameMonth } from "date-fns";
import {
  aggregateDataByMonth,
  aggregateDataByWeek,
} from "@/utils/aggregationLogic";
import { useKeyboardNavigation } from "@/hooks/useKeyboardNavigation";
import { AnimatePresence } from "framer-motion";
import { MetricsBar } from "@/customComponents/layout/MetricsBar";

export const MarketExplorer: React.FC = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date("2025-07-01"));
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [viewMode, setViewMode] = useState<ViewMode>("day");
  const [instrument, setInstrument] = useState<string>("BTCUSDT");

  const {
    data: dailyData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["marketData", instrument, currentMonth.toISOString()],
    queryFn: () => fetchMarketData(instrument, currentMonth),
    select: processApiData,
  });

  const { handleKeyDown } = useKeyboardNavigation({
    date: selectedDate!,
    setDate: setSelectedDate,
    setCurrentMonth,
  });

  useEffect(() => {
    const handleGlobalKeyDown = (event: KeyboardEvent) => {
      if (selectedDate) {
        handleKeyDown(event);
      }
    };
    document.addEventListener("keydown", handleGlobalKeyDown);
    return () => {
      document.removeEventListener("keydown", handleGlobalKeyDown);
    };
  }, [selectedDate, handleKeyDown]);

  const weeklyData = useMemo(() => {
    return dailyData ? aggregateDataByWeek(dailyData) : [];
  }, [dailyData]);

  const monthlyData = useMemo(() => {
    return dailyData ? aggregateDataByMonth(dailyData) : null;
  }, [dailyData]);

  const selectedDayData = useMemo(() => {
    if (!selectedDate || !dailyData) return null;
    const dateKey = format(selectedDate, "yyyy-MM-dd");
    return (
      dailyData.find((d) => format(d.date, "yyyy-MM-dd") === dateKey) ?? null
    );
  }, [selectedDate, dailyData]);

  const handlePreviousMonth = () =>
    setCurrentMonth(getPreviousMonth(currentMonth));
  const handleNextMonth = () => setCurrentMonth(getNextMonth(currentMonth));
  const handlePanelClose = () => setSelectedDate(null);

  const isNextMonthDisabled =
    isSameMonth(currentMonth, new Date()) || isAfter(currentMonth, new Date());

  return (
    <div className="p-4 md:p-8 ">
      <Header
        currentMonth={currentMonth}
        viewMode={viewMode}
        instrument={instrument}
        onInstrumentChange={setInstrument}
        onViewModeChange={setViewMode}
        isNextMonthDisabled={isNextMonthDisabled}
        onNextMonth={handleNextMonth}
        onPreviousMonth={handlePreviousMonth}
      />
      <MetricsBar data={monthlyData} />
      {isLoading && <p className="text-center">Loading data...</p>}
      {isError && (
        <p className="text-center text-red-500">Error fetching data.</p>
      )}
      <AnimatePresence mode="wait">
        {dailyData && (
          <CalendarGrid
            month={currentMonth}
            selectedDate={selectedDate}
            onDateSelect={setSelectedDate}
            dailyData={dailyData}
            weeklyData={weeklyData}
            monthlyData={monthlyData}
            viewMode={viewMode}
          />
        )}
      </AnimatePresence>
      <AnimatePresence mode="wait">
        <DetailsPanel
          isOpen={!!selectedDayData}
          onOpenChange={(isOpen) => !isOpen && handlePanelClose()}
          dayData={selectedDayData}
          instrument={instrument}
        />
      </AnimatePresence>
    </div>
  );
};
