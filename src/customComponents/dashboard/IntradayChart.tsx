import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { fetchIntradayData } from "@/api/MarketApi";

interface IntradayChartProps {
  instrument: string;
  date: Date;
}

export const IntradayChart: React.FC<IntradayChartProps> = ({
  instrument,
  date,
}) => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["intradayData", instrument, date.toISOString()],
    queryFn: () => fetchIntradayData(instrument, date),
    enabled: !!date,
    staleTime: 1000 * 60 * 60,
  });

  if (isLoading)
    return (
      <div className="h-48 w-full flex items-center justify-center text-sm text-gray-500">
        Loading Chart...
      </div>
    );
  if (isError)
    return (
      <div className="h-48 w-full flex items-center justify-center text-sm text-red-500">
        Failed to load chart data.
      </div>
    );

  return (
    <div className="h-48 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <XAxis
            dataKey="time"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
          />
          <YAxis
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
            domain={["dataMin - 100", "dataMax + 100"]}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#16a34a"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
