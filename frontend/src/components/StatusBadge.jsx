import React from 'react';
import { cn } from '../utils/cn';

const StatusBadge = ({ status, type = 'default' }) => {
  const styles = {
    available: "bg-success/10 text-success border-success/20",
    occupied: "bg-danger/10 text-danger border-danger/20",
    maintenance: "bg-primary/10 text-text-secondary border-border",
    cleaning: "bg-warning/10 text-warning border-warning/20",
    pending: "bg-purple/10 text-purple border-purple/20",
    active: "bg-success/10 text-success border-success/20",
    inactive: "bg-danger/10 text-danger border-danger/20",
    default: "bg-background text-text-secondary border-border"
  };

  const currentStyle = styles[status?.toLowerCase()] || styles.default;

  return (
    <span className={cn(
      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border",
      currentStyle
    )}>
      {status}
    </span>
  );
};

export default StatusBadge;
