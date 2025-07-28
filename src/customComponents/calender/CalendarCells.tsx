import { format, isToday, isSameMonth } from "date-fns";
import clsx from "clsx";
import { getVolatilityColor } from "../../utils/styleCalendar";
import { ArrowUp, ArrowDown } from "lucide-react";
import type { ProcessedDayData } from "@/types/types";
import { formatNumber } from "../../utils/numberFormatter";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { motion, type Variants } from "framer-motion";

const cellVariants: Variants = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0 },
};

interface CalendarCellProps {
  day: Date;
  currentMonth: Date;
  isSelected: boolean;
  dayData?: ProcessedDayData;
  onClick: (day: Date) => void;
}

export const CalendarCell: React.FC<CalendarCellProps> = ({
  day,
  currentMonth,
  isSelected,
  dayData,
  onClick,
}) => {
  const isCurrentMonth = isSameMonth(day, currentMonth);
  const isTodaysDate = isToday(day);
  const hasData = !!dayData;

  const cellBgColor = hasData
    ? getVolatilityColor(dayData.volatility)
    : "hover:bg-gray-100";

  return (
    <motion.div
      variants={cellVariants}
      whileHover={{ scale: 1.03, zIndex: 10 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.2 }}
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            onClick={() => onClick(day)}
            className={clsx(
              "relative h-16 md:h-28 border-t border-r border-gray-200 p-2 text-sm transition-colors duration-150 cursor-pointer",
              cellBgColor,
              {
                "text-gray-900": isCurrentMonth,
                "text-gray-400": !isCurrentMonth,
                "ring-2 ring-blue-600 ring-inset z-10": isSelected,
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
            {hasData && (
              <div className="absolute bottom-2 right-2 flex items-center gap-1">
                {dayData.performance === "positive" && (
                  <ArrowUp className="h-4 w-4 text-green-700" />
                )}
                {dayData.performance === "negative" && (
                  <ArrowDown className="h-4 w-4 text-red-700" />
                )}
              </div>
            )}
          </div>
        </TooltipTrigger>
        {hasData && (
          <TooltipContent>
            <div className="p-2 text-sm">
              <p className="font-bold">{format(day, "MMMM d, yyyy")}</p>
              <p>Volatility: {dayData.volatility.toFixed(2)}%</p>
              <p>Volume: {formatNumber(dayData.tradingVolume)}</p>
              <p>Close: {dayData.ohlc.close.toLocaleString()}</p>
            </div>
          </TooltipContent>
        )}
      </Tooltip>
    </motion.div>
  );
};
