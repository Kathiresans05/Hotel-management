import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import KPIStatCard from '../components/KPIStatCard';
import { 
    Users, IndianRupee, DoorOpen, CalendarCheck, 
    ArrowUpRight, Clock, MapPin, Search, Plus, 
    Download, Filter, MoreVertical
} from 'lucide-react';
import { 
    BarChart, Bar, XAxis, YAxis, CartesianGrid, 
    Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import StatusBadge from '../components/StatusBadge';

const revenueData = [
    { name: 'Mon', revenue: 4000 },
    { name: 'Tue', revenue: 3000 },
    { name: 'Wed', revenue: 5000 },
    { name: 'Thu', revenue: 2780 },
    { name: 'Fri', revenue: 1890 },
    { name: 'Sat', revenue: 6390 },
    { name: 'Sun', revenue: 4490 },
];

const occupancyData = [
    { name: 'Week 1', rate: 65 },
    { name: 'Week 2', rate: 78 },
    { name: 'Week 3', rate: 82 },
    { name: 'Week 4', rate: 75 },
];

const SuperAdminDashboard = () => {
    return (
        <DashboardLayout>
            <div className="space-y-8">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-textPrimary">Executive Overview</h1>
                        <p className="text-textSecondary text-sm">Welcome back, Super Admin. Here's what's happening today.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="btn-primary py-2.5 flex items-center gap-2">
                            <Plus size={18} />
                            Add Staff
                        </button>
                        <button className="px-4 py-2.5 bg-surface border border-border rounded-xl font-bold flex items-center gap-2 hover:bg-slate-50 transition-all">
                            <Download size={18} />
                            Reports
                        </button>
                    </div>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <KPIStatCard 
                        title="Total Revenue" 
                        value="₹2,45,000" 
                        icon={IndianRupee} 
                        trend="up" 
                        trendValue="12.5" 
                        color="blue"
                    />
                    <KPIStatCard 
                        title="Active Bookings" 
                        value="48" 
                        icon={CalendarCheck} 
                        trend="up" 
                        trendValue="5.2" 
                        color="green"
                    />
                    <KPIStatCard 
                        title="Room Occupancy" 
                        value="82%" 
                        icon={DoorOpen} 
                        trend="down" 
                        trendValue="2.1" 
                        color="purple"
                    />
                    <KPIStatCard 
                        title="Total Staff" 
                        value="12" 
                        icon={Users} 
                        color="orange"
                    />
                </div>

                {/* Charts Area */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div className="card p-6">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-bold text-lg text-textPrimary">Revenue Trend</h3>
                            <select className="bg-slate-50 border-none text-sm font-bold text-textSecondary outline-none">
                                <option>Last 7 Days</option>
                                <option>Last 30 Days</option>
                            </select>
                        </div>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={revenueData}>
                                    <defs>
                                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1}/>
                                            <stop offset="95%" stopColor="#2563EB" stopOpacity={0}/>
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                                    <Tooltip 
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Area type="monotone" dataKey="revenue" stroke="#2563EB" strokeWidth={3} fillOpacity={1} fill="url(#colorRev)" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    <div className="card p-6">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="font-bold text-lg text-textPrimary">Occupancy Rate</h3>
                            <Filter size={18} className="text-slate-400" />
                        </div>
                        <div className="h-[300px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={occupancyData}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                                    <Tooltip 
                                        cursor={{fill: '#F8FAFC'}}
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Bar dataKey="rate" fill="#0F172A" radius={[6, 6, 0, 0]} barSize={40} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Bottom Activity/Table Section */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                    <div className="xl:col-span-2 card overflow-hidden">
                        <div className="p-6 border-b border-border flex items-center justify-between">
                            <h3 className="font-bold text-lg text-textPrimary">Recent Activity</h3>
                            <button className="text-accent text-sm font-bold hover:underline">View All</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-border">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">User</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Action</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {[1, 2, 3, 4, 5].map((item) => (
                                        <tr key={item} className="hover:bg-slate-50/50 transition-colors cursor-pointer">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-xs font-bold">JD</div>
                                                    <div>
                                                        <p className="text-sm font-bold text-textPrimary">John Doe</p>
                                                        <p className="text-xs text-textSecondary">Receptionist</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-textSecondary">Checked in Customer #1024</td>
                                            <td className="px-6 py-4 text-sm text-textSecondary font-medium">May 24, 2024</td>
                                            <td className="px-6 py-4"><StatusBadge status="active" /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="card p-6">
                        <h3 className="font-bold text-lg text-textPrimary mb-6 flex items-center gap-2">
                            <Clock size={18} className="text-accent" />
                            Upcoming Bookings
                        </h3>
                        <div className="space-y-6">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="flex gap-4 group">
                                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-accent font-bold text-sm shrink-0">
                                        12 <br/> MAY
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-bold text-textPrimary truncate group-hover:text-accent transition-colors">Aryan Sharma</p>
                                        <p className="text-xs text-textSecondary">Room 304 • Deluxe AC</p>
                                    </div>
                                    <MoreVertical size={16} className="text-slate-400 cursor-pointer" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
};

export default SuperAdminDashboard;
