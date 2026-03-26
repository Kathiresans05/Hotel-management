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

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Business Intelligence" 
        subtitle="Comprehensive analysis of revenue, occupancy and market trends."
        actions={
          <div className="flex items-center space-x-3">
            <div className="flex bg-background p-1 rounded-xl border border-border">
              <button 
                onClick={() => setTimeRange('6m')}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200",
                  timeRange === '6m' ? "bg-surface border border-border text-primary" : "text-text-secondary hover:text-primary"
                )}
              >
                Last 6 Months
              </button>
              <button 
                onClick={() => setTimeRange('custom')}
                className={cn(
                  "px-3 py-1.5 text-xs font-bold rounded-lg transition-all duration-200",
                  timeRange === 'custom' ? "bg-surface border border-border text-primary" : "text-text-secondary hover:text-primary"
                )}
              >
                Custom
              </button>
            </div>
            <button className="flex items-center px-4 py-2 bg-accent text-white rounded-button text-sm font-medium hover:bg-accent-hover transition-all">
              <Download className="w-4 h-4 mr-2" />
              Export Detailed Report
            </button>
          </div>
        }
      />

      {/* Analytics KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPIStatCard title="Revenue Growth" value="+24.8%" trend="vs last month" trendType="up" icon={TrendingUp} colorClass="bg-accent/10 text-accent" />
        <KPIStatCard title="Avg Booking Value" value="$212.50" trend="+12.1%" trendType="up" icon={CreditCard} colorClass="bg-purple/10 text-purple" />
        <KPIStatCard title="Net Profit Margin" value="18.2%" trend="-0.5%" trendType="down" icon={TrendingUp} colorClass="bg-success/10 text-success" />
        <KPIStatCard title="New Customers" value="482" trend="+18.5%" trendType="up" icon={Users} colorClass="bg-warning/10 text-warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Main Revenue Chart */}
        <div className="lg:col-span-2 bg-surface p-6 rounded-card border border-border">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="font-bold text-lg text-text-primary">Revenue vs Target</h3>
              <p className="text-xs text-text-secondary">Comparing monthly earnings against set objectives.</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-accent rounded-full mr-2"></div>
                <span className="text-[10px] font-bold text-text-secondary uppercase">Revenue</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-slate-200 rounded-full mr-2"></div>
                <span className="text-[10px] font-bold text-text-secondary uppercase">Target</span>
              </div>
            </div>
          </div>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#F97316" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                <Line type="monotone" dataKey="target" stroke="#E2E8F0" strokeWidth={2} strokeDasharray="5 5" dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-surface p-6 rounded-card border border-border">
          <h3 className="font-bold text-lg text-text-primary mb-2">Room Performance</h3>
          <p className="text-xs text-text-secondary mb-8">Revenue distribution by room category.</p>
          <div className="h-[250px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="text-2xl font-bold text-text-primary">100%</p>
              <p className="text-[10px] font-bold text-text-secondary uppercase">Total</p>
            </div>
          </div>
          <div className="mt-8 space-y-3">
            {categoryData.map((item, idx) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-3" style={{ backgroundColor: COLORS[idx] }}></div>
                  <span className="text-xs font-medium text-text-secondary">{item.name}</span>
                </div>
                <span className="text-xs font-bold text-text-primary">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-primary p-8 rounded-card border border-white/10 text-white">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-lg">Occupancy Insights</h3>
            <div className="p-2 bg-surface/10 rounded-lg">
              <Info className="w-4 h-4" />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex justify-between text-xs font-bold mb-2 uppercase opacity-60">Peak Occupancy</div>
              <div className="text-3xl font-bold">Week 12 <span className="text-sm font-normal opacity-60 ml-2">(98%)</span></div>
            </div>
            <div className="pt-6 border-t border-white/10">
              <p className="text-sm opacity-80 leading-relaxed italic">
                "We observed a 15% increase in weekend bookings following the implementation of our new loyalty pricing strategy."
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-surface p-6 rounded-card border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-text-primary">Booking Volume by Day</h3>
            <button className="text-accent text-xs font-bold hover:underline flex items-center">
              Full Breakdown <ChevronDown className="w-3 h-3 ml-1" />
            </button>
          </div>
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={revenueData.slice(0, 7)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="month" hide />
                <Tooltip 
                  cursor={{fill: '#F8FAFC'}}
                  contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: '1px solid #E5E7EB' }}
                />
                <Bar dataKey="revenue" fill="#F97316" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
