import React, { useState } from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area
} from 'recharts';
import { 
  TrendingUp, 
  Users, 
  CreditCard, 
  Calendar, 
  Download, 
  ChevronDown,
  Info
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import KPIStatCard from '../components/KPIStatCard';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

const revenueData = [
  { month: 'Jan', revenue: 45000, target: 40000 },
  { month: 'Feb', revenue: 52000, target: 40000 },
  { month: 'Mar', revenue: 48000, target: 40000 },
  { month: 'Apr', revenue: 61000, target: 50000 },
  { month: 'May', revenue: 55000, target: 50000 },
  { month: 'Jun', revenue: 67000, target: 50000 },
];

const categoryData = [
  { name: 'Single', value: 35 },
  { name: 'Double', value: 45 },
  { name: 'Family', value: 15 },
  { name: 'Suite', value: 5 },
];

const COLORS = ['#F97316', '#8B5CF6', '#10B981', '#F59E0B'];

const Analytics = () => {
  const [timeRange, setTimeRange] = useState('6m');
  const { isDarkMode } = useTheme();

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Business Intelligence" 
        subtitle="Comprehensive analysis of revenue, occupancy and market trends."
        actions={
          <div className="flex items-center space-x-3">
            <div className={cn(
              "flex p-1 rounded-xl border transition-colors",
              isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200"
            )}>
              <button 
                onClick={() => setTimeRange('6m')}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200",
                  timeRange === '6m' 
                    ? (isDarkMode ? "bg-white/10 text-white border border-white/10 shadow-lg" : "bg-white text-slate-900 border border-slate-200 shadow-sm") 
                    : "text-slate-400 hover:text-accent"
                )}
              >
                Last 6 Months
              </button>
              <button 
                onClick={() => setTimeRange('custom')}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200",
                  timeRange === 'custom' 
                    ? (isDarkMode ? "bg-white/10 text-white border border-white/10 shadow-lg" : "bg-white text-slate-900 border border-slate-200 shadow-sm") 
                    : "text-slate-400 hover:text-accent"
                )}
              >
                Custom
              </button>
            </div>
            <button className="flex items-center px-4 py-2 bg-accent text-white rounded-2xl text-sm font-bold shadow-lg shadow-accent/20 hover:bg-accent-hover hover:-translate-y-0.5 transition-all active:scale-95">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </button>
          </div>
        }
      />

      {/* Analytics KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPIStatCard title="Revenue Growth" value="+24.8%" trend="vs last month" trendType="up" icon={TrendingUp} color="blue" />
        <KPIStatCard title="Avg Booking Value" value="₹1,250" trend="+12.1%" trendType="up" icon={CreditCard} color="purple" />
        <KPIStatCard title="Net Profit Margin" value="18.2%" trend="-0.5%" trendType="down" icon={TrendingUp} color="green" />
        <KPIStatCard title="New Customers" value="482" trend="+18.5%" trendType="up" icon={Users} color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Revenue Chart */}
        <div className={cn(
          "lg:col-span-2 p-6 rounded-3xl border shadow-sm transition-colors",
          isDarkMode ? "bg-[#0F172A]/40 border-white/5" : "bg-white border-slate-200"
        )}>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className={cn("font-bold text-lg", isDarkMode ? "text-white" : "text-slate-900")}>Revenue vs Target</h3>
              <p className="text-xs text-slate-400">Comparing monthly earnings against set objectives.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-accent rounded-full mr-2"></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Revenue</span>
              </div>
              <div className="flex items-center">
                <div className={cn("w-3 h-3 rounded-full mr-2", isDarkMode ? "bg-white/10" : "bg-slate-200")}></div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Target</span>
              </div>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F97316" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#F97316" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.03)" : "#F1F5F9"} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#1E293B' : '#fff', 
                    borderRadius: '16px', 
                    border: isDarkMode ? '1px solid rgba(255,255,255,0.1)' : '1px solid #E2E8F0',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.1)'
                  }}
                  itemStyle={{ color: isDarkMode ? '#F1F5F9' : '#1E293B' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="target" stroke={isDarkMode ? "rgba(255,255,255,0.1)" : "#E2E8F0"} strokeWidth={2} strokeDasharray="5 5" fill="none" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className={cn(
          "p-6 rounded-3xl border shadow-sm transition-colors",
          isDarkMode ? "bg-[#0F172A]/40 border-white/5" : "bg-white border-slate-200"
        )}>
          <h3 className={cn("font-bold text-lg", isDarkMode ? "text-white" : "text-slate-900")}>Room Performance</h3>
          <p className="text-xs text-slate-400 mb-8">Revenue distribution by room category.</p>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={65}
                  outerRadius={85}
                  paddingAngle={8}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={4} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#1E293B' : '#fff', 
                    borderRadius: '12px', 
                    border: 'none',
                    boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className={cn("text-3xl font-bold", isDarkMode ? "text-white" : "text-slate-900")}>100%</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Total</p>
            </div>
          </div>
          <div className="mt-8 space-y-4">
            {categoryData.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between group">
                <div className="flex items-center">
                  <div className="w-2.5 h-2.5 rounded-full mr-3 shadow-lg" style={{ backgroundColor: COLORS[idx], boxShadow: `0 0 10px ${COLORS[idx]}40` }}></div>
                  <span className={cn("text-xs font-semibold tracking-wide", isDarkMode ? "text-white/70" : "text-slate-600")}>{item.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className={cn("h-1 w-12 rounded-full", isDarkMode ? "bg-white/5" : "bg-slate-100")}>
                    <div className="h-full rounded-full" style={{ backgroundColor: COLORS[idx], width: `${item.value}%` }} />
                  </div>
                  <span className={cn("text-xs font-bold", isDarkMode ? "text-white" : "text-slate-900")}>{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-accent p-8 rounded-[32px] text-white shadow-xl shadow-accent/10 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8 transition-transform duration-700 group-hover:scale-110" />
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-bold text-xl">Occupancy Insights</h3>
              <div className="p-2.5 bg-white/20 rounded-xl backdrop-blur-md">
                <Info className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-8">
              <div>
                <div className="flex justify-between text-[10px] font-bold mb-3 uppercase tracking-[0.2em] opacity-80">Peak Capacity</div>
                <div className="text-4xl font-bold tracking-tight">Week 12 <span className="text-sm font-medium opacity-70 ml-2 tracking-normal">(98.2%)</span></div>
              </div>
              <div className="pt-8 border-t border-white/20">
                <p className="text-sm font-medium leading-relaxed italic opacity-90">
                  "We observed a 15% increase in weekend bookings following the implementation of our new loyalty pricing strategy."
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={cn(
          "lg:col-span-2 p-8 rounded-[32px] border shadow-sm transition-colors",
          isDarkMode ? "bg-[#0F172A]/40 border-white/5" : "bg-white border-slate-200"
        )}>
          <div className="flex items-center justify-between mb-8">
            <h3 className={cn("font-bold text-lg", isDarkMode ? "text-white" : "text-slate-900")}>Booking Intensity</h3>
            <button className="text-accent text-[11px] font-bold uppercase tracking-widest hover:underline flex items-center group">
              Full Breakdown <ChevronDown className="w-4 h-4 ml-1.5 transition-transform group-hover:translate-y-0.5" />
            </button>
          </div>
          <div className="h-[220px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData.slice(0, 6)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDarkMode ? "rgba(255,255,255,0.03)" : "#F1F5F9"} />
                <XAxis dataKey="month" hide />
                <Tooltip 
                  cursor={{fill: isDarkMode ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.02)', radius: 8}}
                  contentStyle={{ 
                    backgroundColor: isDarkMode ? '#1E293B' : '#fff', 
                    borderRadius: '16px', 
                    border: 'none',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.2)'
                  }}
                />
                <Bar dataKey="revenue" fill="#F97316" radius={[6, 6, 0, 0]} barSize={45} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
