import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../utils/cn';

const KPIStatCard = ({ title, value, trend, trendType, icon: Icon, color = 'blue', colorClass, compact = false }) => {
  const getColorClasses = (c) => {
    const colors = {
      blue: "bg-blue-500/10 text-blue-500",
      orange: "bg-orange-500/10 text-orange-500",
      green: "bg-emerald-500/10 text-emerald-500",
      purple: "bg-purple-500/10 text-purple-500",
      red: "bg-rose-500/10 text-rose-500",
      indigo: "bg-indigo-500/10 text-indigo-500",
    };
    return colors[c] || colors.blue;
  };

  const activeColorClass = colorClass || getColorClasses(color);

  return (
    <div className={cn(
      "bg-white dark:bg-[#0F172A]/40 rounded-[32px] border border-slate-200 dark:border-white/5 p-6 group transition-all duration-300 relative overflow-hidden",
      compact ? "p-4" : "p-6",
      "hover:shadow-2xl hover:shadow-black/5 hover:-translate-y-1"
    )}>
      {/* Decorative background accent */}
      <div className={cn(
        "absolute -top-10 -right-10 w-32 h-32 rounded-full blur-2xl transition-all duration-500 group-hover:scale-110 opacity-20",
        activeColorClass.split(' ')[0]
      )} />
      
      <div className={cn("relative z-10", compact && "flex items-center justify-between")}>
        <div className={cn("flex items-start justify-between", compact && "flex-1")}>
          <div className={cn(
            "rounded-2xl transition-all duration-300",
            compact ? "p-2 group-hover:p-2.5" : "p-3",
            activeColorClass
          )}>
            <Icon className={cn(compact ? "w-4 h-4" : "w-6 h-6")} />
          </div>
          {trend && (
            <div className={cn(
              "flex items-center px-2 py-1 rounded-full text-[10px] font-bold tracking-tight",
              trendType === 'up' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
            )}>
              {trendType === 'up' ? <ArrowUpRight className="w-3 h-3 mr-0.5" /> : <ArrowDownRight className="w-3 h-3 mr-0.5" />}
              {trend}
            </div>
          )}
        </div>
        
        <div className={cn(compact ? "text-right ml-3" : "mt-5 text-left")}>
          <p className={cn("font-bold text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em]", compact ? "text-[10px]" : "text-[11px]")}>{title}</p>
          <h3 className={cn("font-bold text-slate-900 dark:text-white mt-1", compact ? "text-xl" : "text-2xl tracking-tight")}>{value}</h3>
        </div>
      </div>
    </div>
  );
};

export default KPIStatCard;
