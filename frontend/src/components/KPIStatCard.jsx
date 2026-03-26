import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../utils/cn';

const KPIStatCard = ({ title, value, trend, trendType, icon: Icon, colorClass, compact = false }) => {
  return (
    <div className={cn(
      "bg-surface rounded-card border border-border group transition-all duration-300 relative overflow-hidden",
      compact ? "p-4" : "p-6"
    )}>
      {/* Decorative background accent - More visible now */}
      <div className={cn(
        "absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl transition-all duration-500 group-hover:scale-110",
        (colorClass?.includes('bg-accent') && "bg-accent/20") ||
        (colorClass?.includes('bg-purple') && "bg-purple/20") ||
        (colorClass?.includes('bg-success') && "bg-success/20") ||
        (colorClass?.includes('bg-warning') && "bg-warning/20") ||
        (colorClass?.includes('bg-danger') && "bg-danger/20") ||
        "bg-accent/20"
      )} />
      
      <div className={cn("relative z-10", compact && "flex items-center justify-between")}>
        <div className={cn("flex items-start justify-between", compact && "flex-1")}>
          <div className={cn(
            "rounded-2xl transition-all duration-300",
            compact ? "p-2 group-hover:p-2.5" : "p-3",
            colorClass || "bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white"
          )}>
            <Icon className={cn(compact ? "w-4 h-4" : "w-6 h-6")} />
          </div>
          {trend && (
            <div className={cn(
              "flex items-center px-2 py-1 rounded-full text-[10px] font-bold tracking-tight",
              trendType === 'up' ? "bg-success/10 text-success" : "bg-danger/10 text-danger"
            )}>
              {trendType === 'up' ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {trend}
            </div>
          )}
        </div>
        
        <div className={cn(compact ? "text-right ml-3" : "mt-4 text-left")}>
          <p className={cn("font-medium text-text-secondary uppercase tracking-wider", compact ? "text-[10px]" : "text-sm")}>{title}</p>
          <h3 className={cn("font-bold text-text-primary mt-1", compact ? "text-xl" : "text-2xl")}>{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default KPIStatCard;
