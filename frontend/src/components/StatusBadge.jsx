import React from 'react';
import { cn } from '../utils/cn';

const StatusBadge = ({ status, type = 'default' }) => {
  const styles = {
    available: "bg-transparent text-emerald-500 border-emerald-200",
    occupied: "bg-transparent text-rose-500 border-rose-200",
    maintenance: "bg-transparent text-blue-500 border-blue-200",
    cleaning: "bg-transparent text-amber-500 border-amber-200",
    pending: "bg-transparent text-purple-500 border-purple-200",
    active: "bg-transparent text-emerald-500 border-emerald-200",
    inactive: "bg-transparent text-rose-500 border-rose-200",
    default: "bg-transparent text-slate-500 border-slate-200"
  };

  const currentStyle = styles[status?.toLowerCase()] || styles.default;

  return (
    <span className={cn(
      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border",
      currentStyle
    )}>
      {status}
    </span>
  );
};

export default StatusBadge;
