import React from 'react';
import { 
  Users, 
  Bed, 
  DollarSign, 
  Calendar, 
  ArrowUpRight, 
  Clock,
  Download,
  Plus
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar
} from 'recharts';
import PageHeader from '../components/PageHeader';
import KPIStatCard from '../components/KPIStatCard';
import StatusBadge from '../components/StatusBadge';
import { useLanguage } from '../context/LanguageContext';

const data = [
  { name: 'Mon', revenue: 4000, bookings: 24, occupancy: 80 },
  { name: 'Tue', revenue: 3000, bookings: 18, occupancy: 70 },
  { name: 'Wed', revenue: 5000, bookings: 29, occupancy: 85 },
  { name: 'Thu', revenue: 2780, bookings: 15, occupancy: 65 },
  { name: 'Fri', revenue: 6000, bookings: 35, occupancy: 95 },
  { name: 'Sat', revenue: 8000, bookings: 45, occupancy: 100 },
  { name: 'Sun', revenue: 5500, bookings: 30, occupancy: 88 },
];

const Dashboard = () => {
  const { t } = useLanguage();

  const kpis = [
    { title: t('TOTAL_REVENUE'), value: '$24,500', trend: 'up', trendValue: '12.5', icon: DollarSign, color: 'orange' },
    { title: t('ACTIVE_BOOKINGS'), value: '48', trend: 'up', trendValue: '5.2', icon: Calendar, color: 'purple' },
    { title: t('ROOM_OCCUPANCY'), value: '85%', trend: 'up', trendValue: '8.1', icon: Bed, color: 'green' },
    { title: t('TOTAL_STAFF'), value: '12', trend: 'down', trendValue: '0', icon: Users, color: 'orange' },
  ];

  const recentBookings = [
    { id: 'BK-001', guest: 'John Smith', room: '101', checkIn: '24 Mar', status: 'Occupied', amount: '$120' },
    { id: 'BK-002', guest: 'Sarah Wilson', room: '204', checkIn: '25 Mar', status: 'Cleaning', amount: '$150' },
    { id: 'BK-003', guest: 'Mike Johnson', room: '305', checkIn: '25 Mar', status: 'Available', amount: '$90' },
    { id: 'BK-004', guest: 'Emma Davis', room: '108', checkIn: '26 Mar', status: 'Maintenance', amount: '$110' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title={t('EXECUTIVE_OVERVIEW')} 
        subtitle={t('EXECUTIVE_OVERVIEW_DESC')}
        actions={
          <>
            <button className="flex items-center px-4 py-2 border border-border bg-surface rounded-button text-sm font-medium hover:bg-background transition-all">
              <Download className="w-4 h-4 mr-2" />
              {t('REPORTS')}
            </button>
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-button text-sm font-medium hover:bg-primary-dark transition-all">
              <Plus className="w-4 h-4 mr-2" />
              {t('ADD_STAFF')}
            </button>
          </>
        }
      />

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {kpis.map((kpi, idx) => (
          <KPIStatCard key={idx} {...kpi} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-surface p-6 rounded-card border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-text-primary">{t('REVENUE_TREND')}</h3>
            <select className="bg-background border-none text-xs font-bold text-text-secondary rounded-lg px-2 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                  itemStyle={{ fontSize: '12px', fontWeight: 'bold' }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-card border border-border">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-lg text-text-primary">{t('OCCUPANCY_RATE')}</h3>
            <select className="bg-background border-none text-xs font-bold text-text-secondary rounded-lg px-2 py-1 outline-none">
              <option>By Floor</option>
              <option>By Category</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dx={-10} />
                <Tooltip 
                  cursor={{fill: 'var(--background)'}}
                  contentStyle={{ backgroundColor: 'var(--surface)', borderRadius: '12px', border: '1px solid var(--border)', color: 'var(--text-primary)' }}
                />
                <Bar dataKey="occupancy" fill="#8B5CF6" radius={[6, 6, 0, 0]} barSize={32} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Bottom Section: Table + Activity Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-surface rounded-card border border-border overflow-hidden">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="font-bold text-lg text-text-primary">{t('RECENT_BOOKINGS')}</h3>
            <button className="text-accent text-sm font-bold hover:underline">{t('VIEW_ALL')}</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-background">
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">{t('ID')}</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">{t('GUEST')}</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">{t('ROOM')}</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">{t('STATUS')}</th>
                  <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">{t('AMOUNT')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-background/50 transition-colors">
                    <td className="px-6 py-4 text-sm font-bold text-primary">{booking.id}</td>
                    <td className="px-6 py-4 text-sm font-medium text-text-primary">{booking.guest}</td>
                    <td className="px-6 py-4 text-sm text-text-secondary">{t('ROOM')} {booking.room}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={booking.status} />
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-text-primary text-right">{booking.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-surface p-6 rounded-card border border-border">
          <h3 className="font-bold text-lg text-text-primary mb-6">{t('LIVE_ACTIVITY')}</h3>
          <div className="space-y-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="flex space-x-4">
                <div className="w-10 h-10 rounded-xl bg-background flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-text-secondary" />
                </div>
                <div>
                  <p className="text-sm font-medium text-text-primary">
                    <span className="font-bold">John Doe</span> checked out from <span className="font-bold">Room 102</span>
                  </p>
                  <p className="text-xs text-text-secondary mt-1">2 mins ago</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-3 bg-background text-text-secondary rounded-xl text-sm font-bold hover:bg-border transition-all">
            {t('SEE_FULL_ACTIVITY_LOG')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
