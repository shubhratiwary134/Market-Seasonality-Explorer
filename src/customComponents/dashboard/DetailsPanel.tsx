import React from "react";

import { format } from "date-fns";
import { formatNumber } from "../../utils/numberFormatter";
import { Metric } from "./Metric";
import { IntradayChart } from "./IntradayChart";
import type { ProcessedDayData } from "@/types/types";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface DetailsPanelProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  dayData: ProcessedDayData | null;
}

export const DetailsPanel: React.FC<DetailsPanelProps> = ({
  isOpen,
  onOpenChange,
  dayData,
}) => {
  if (!dayData) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] p-5">
        <SheetHeader>
          <SheetTitle>{format(dayData.date, "MMMM d, yyyy")}</SheetTitle>
          <SheetDescription>
            Detailed performance and volatility metrics for the selected day.
          </SheetDescription>
        </SheetHeader>
        <div className="py-6 space-y-4">
          <div className="space-y-2 p-4 rounded-lg bg-gray-50 border">
            <Metric label="Open" value={dayData.ohlc.open.toLocaleString()} />
            <Metric label="High" value={dayData.ohlc.high.toLocaleString()} />
            <Metric label="Low" value={dayData.ohlc.low.toLocaleString()} />
            <Metric label="Close" value={dayData.ohlc.close.toLocaleString()} />
            <Metric
              label="Volume"
              value={formatNumber(dayData.tradingVolume)}
            />
            <Metric
              label="Volatility"
              value={`${dayData.volatility.toFixed(2)}%`}
            />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Intraday Price
            </h3>
            <IntradayChart />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
