import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "00:00", price: 71200 },
  { name: "04:00", price: 71350 },
  { name: "08:00", price: 71500 },
  { name: "12:00", price: 71400 },
  { name: "16:00", price: 71600 },
  { name: "20:00", price: 71750 },
  { name: "23:59", price: 71800 },
];

export const IntradayChart: React.FC = () => {
  return (
    <div className="h-48 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 5, right: 20, left: -10, bottom: 5 }}
        >
          <XAxis
            dataKey="name"
            stroke="#888888"
            fontSize={12}
            tickLine={false}
            axisLine={false}
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
