import React, { useMemo } from "react";
import { getCalendarMonth } from "../../utils/date";
import { CalendarHeader } from "./CalendarHeader";
import { CalendarCell } from "./CalendarCells";
import { format, isSameMonth, isWithinInterval } from "date-fns";
import type { AggregatedData, ProcessedDayData } from "@/types/types";
import type { ViewMode } from "../layout/Header";
import { motion, type Variants } from "framer-motion";

const gridContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
};

const cellListVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.03,
    },
  },
};

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
    if (viewMode === "month" && monthlyData && isSameMonth(day, month)) {
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
    <motion.div
      variants={gridContainerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="bg-white  border-l border-b border-gray-200  shadow-md rounded-lg overflow-hidden  "
    >
      <CalendarHeader />
      <motion.div variants={cellListVariants} className="grid grid-cols-7">
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
      </motion.div>
    </motion.div>
  );
};
