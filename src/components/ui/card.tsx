import React from "react";
import clsx from "clsx";

// Generic Card container
export const Card = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={clsx("bg-white rounded-2xl shadow-md p-4", className)}>
    {children}
  </div>
);

// Optional inner wrapper (for layout flexibility)
export const CardContent = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <div className={className}>{children}</div>
);

// Stat card for metrics
interface StatCardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, className = "" }) => (
  <div className={clsx("bg-white rounded-2xl shadow-md p-6 flex items-center gap-4", className)}>
    {icon && <div className="text-blue-500 text-3xl">{icon}</div>}
    <div>
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  </div>
);
