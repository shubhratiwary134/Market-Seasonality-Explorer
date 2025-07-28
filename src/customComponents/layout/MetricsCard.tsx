import React from "react";
import { motion, type Variants } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
}

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  icon,
  className,
}) => {
  return (
    <motion.div
      variants={cardVariants}
      className={`bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between ${className}`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        {icon}
      </div>
      <p className="md:text-2xl font-semibold text-gray-800">{value}</p>
    </motion.div>
  );
};
