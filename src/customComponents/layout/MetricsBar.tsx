import React from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Zap } from "lucide-react";
import { MetricCard } from "./MetricsCard";

import { formatNumber } from "../../utils/numberFormatter";
import type { AggregatedData } from "@/types/types";

interface MetricsBarProps {
  data: AggregatedData | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const MetricsBar: React.FC<MetricsBarProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-gray-200 h-24 rounded-lg animate-pulse" />
        <div className="bg-gray-200 h-24 rounded-lg animate-pulse" />
        <div className="bg-gray-200 h-24 rounded-lg animate-pulse" />
      </div>
    );
  }

  const performanceValue = data.close - data.open;
  const performancePercent = ((performanceValue / data.open) * 100).toFixed(2);
  const isPositive = performanceValue >= 0;

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 items-center md:grid-cols-3 gap-4 my-5"
    >
      <MetricCard
        title="Total Volume"
        value={formatNumber(data.tradingVolume)}
        icon={<BarChart3 className="h-4 w-4 text-gray-400" />}
      />
      <MetricCard
        title="Avg. Volatility"
        value={`${data.volatility.toFixed(2)}%`}
        icon={<Zap className="h-4 w-4 text-gray-400" />}
      />
      <MetricCard
        title="Performance"
        value={`${isPositive ? "+" : ""}${performancePercent}%`}
        icon={<TrendingUp className="h-4 w-4 text-gray-400" />}
        className={
          isPositive
            ? "bg-emerald-50/50 border-emerald-200"
            : "bg-red-50/50 border-red-200"
        }
      />
    </motion.div>
  );
};
