import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { cn } from '../utils/cn';

const KPIStatCard = ({ 
  title, 
  value, 
  trend, 
  trendValue, 
  icon: Icon, 
  color = 'blue', 
  compact = false 
}) => {
  const getColorConfig = (c) => {
    const configs = {
      blue: { 
        iconBg: "bg-blue-50 dark:bg-blue-500/10", 
        iconColor: "text-blue-600 dark:text-blue-400",
        glowColor: "from-blue-400/30 to-transparent"
      },
      orange: { 
        iconBg: "bg-orange-50 dark:bg-orange-500/10", 
        iconColor: "text-orange-600 dark:text-orange-400",
        glowColor: "from-orange-400/30 to-transparent"
      },
      green: { 
        iconBg: "bg-emerald-50 dark:bg-emerald-500/10", 
        iconColor: "text-emerald-600 dark:text-emerald-400",
        glowColor: "from-emerald-400/30 to-transparent"
      },
      purple: { 
        iconBg: "bg-purple-50 dark:bg-purple-500/10", 
        iconColor: "text-purple-600 dark:text-purple-400",
        glowColor: "from-purple-400/30 to-transparent"
      },
      red: { 
        iconBg: "bg-rose-50 dark:bg-rose-500/10", 
        iconColor: "text-rose-600 dark:text-rose-400",
        glowColor: "from-rose-400/30 to-transparent"
      },
      indigo: { 
        iconBg: "bg-indigo-50 dark:bg-indigo-500/10", 
        iconColor: "text-indigo-600 dark:text-indigo-400",
        glowColor: "from-indigo-400/30 to-transparent"
      },
    };
    return configs[c] || configs.blue;
  };

  const config = getColorConfig(color);

  return (
    <div className={cn(
      "bg-white dark:bg-[#0F172A] rounded-[24px] border border-slate-200 dark:border-white/5 transition-all duration-500 relative overflow-hidden group hover:shadow-xl hover:shadow-black/5 hover:-translate-y-1",
      compact ? "p-4" : "p-6"
    )}>
      {/* Refined top-right corner glow wash */}
      <div className={cn(
        "absolute -right-8 -top-8 w-64 h-64 rounded-full blur-[70px] opacity-70 bg-gradient-to-br transition-all duration-700 group-hover:scale-125",
        config.glowColor
      )} />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Top Row: Icon Container and Trend Indicator */}
        <div className="flex items-start justify-between mb-5">
          <div className={cn(
            "p-2.5 rounded-[18px] transition-all duration-500 flex items-center justify-center",
            config.iconBg,
            "group-hover:scale-110 group-hover:rotate-3 shadow-sm border border-white/50 dark:border-none"
          )}>
            <Icon className={cn("w-5 h-5", config.iconColor)} size={20} />
          </div>

          {(trend || trendValue) && (
            <div className={cn(
              "flex items-center px-2 py-1 rounded-full text-[10px] font-black tracking-tight shadow-sm",
              trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
            )}>
              {trend === 'up' ? <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> : <ArrowDownRight className="w-3.5 h-3.5 mr-0.5" />}
              {trendValue || 0}%
            </div>
          )}
        </div>
        
        {/* Bottom Section: Content */}
        <div className="mt-auto">
          <p className={cn(
            "font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-[0.2em] mb-1", 
            compact ? "text-[9px]" : "text-[10px]"
          )}>
            {title}
          </p>
          <h3 className={cn(
            "font-black text-slate-800 dark:text-white leading-tight", 
            compact ? "text-xl" : "text-[26px] tracking-tight"
          )}>
            {value}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default KPIStatCard;
