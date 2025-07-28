import React from "react";
import { format } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../../components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export type ViewMode = "day" | "week" | "month";

const SUPPORTED_INSTRUMENTS = ["BTCUSDT", "ETHUSDT", "SOLUSDT", "BNBUSDT"];

interface HeaderProps {
  currentMonth: Date;
  instrument: string;
  onInstrumentChange: (instrument: string) => void;
  viewMode: ViewMode;
  onViewModeChange: (viewMode: ViewMode) => void;
  isNextMonthDisabled: boolean;
  onPreviousMonth: () => void;
  onNextMonth: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentMonth,
  instrument,
  onInstrumentChange,
  viewMode,
  onViewModeChange,
  isNextMonthDisabled,
  onPreviousMonth,
  onNextMonth,
}) => {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6 gap-4">
      <h1 className="text-2xl font-bold text-gray-800">
        {format(currentMonth, "MMMM yyyy")}
      </h1>
      <Select value={instrument} onValueChange={onInstrumentChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Select Instrument" />
        </SelectTrigger>
        <SelectContent>
          {SUPPORTED_INSTRUMENTS.map((inst) => (
            <SelectItem key={inst} value={inst}>
              {inst}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="flex items-center gap-4">
        <ToggleGroup
          type="single"
          variant="outline"
          value={viewMode}
          onValueChange={(value) => {
            if (value) onViewModeChange(value as ViewMode);
          }}
        >
          <ToggleGroupItem value="day">Day</ToggleGroupItem>
          <ToggleGroupItem value="week">Week</ToggleGroupItem>
          <ToggleGroupItem value="month">Month</ToggleGroupItem>
        </ToggleGroup>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onPreviousMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={onNextMonth}
            disabled={isNextMonthDisabled}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
