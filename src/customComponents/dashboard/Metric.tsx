import React from "react";

interface MetricProps {
  label: string;
  value: string | number;
  className?: string;
}

export const Metric: React.FC<MetricProps> = ({ label, value, className }) => {
  return (
    <div className={`flex justify-between items-baseline ${className}`}>
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-900">{value}</p>
    </div>
  );
};
