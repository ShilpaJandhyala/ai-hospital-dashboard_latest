import React from "react";

interface CardProps {
  title: string;
  value: string;
  icon?: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, value, icon, className = "" }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-md p-6 flex items-center gap-4 ${className}`}>
      {icon && <div className="text-blue-500 text-3xl">{icon}</div>}
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default Card, CardContent;
