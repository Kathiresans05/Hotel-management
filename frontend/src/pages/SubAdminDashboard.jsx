import React from 'react';
import { 
    Calendar, Users, DoorOpen, IndianRupee, 
    ArrowUpRight, ArrowDownRight, Clock, Plus, 
    Filter, MoreVertical, Briefcase
} from 'lucide-react';
import KPIStatCard from '../components/KPIStatCard';
import StatusBadge from '../components/StatusBadge';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useLanguage } from '../context/LanguageContext';

const data = [
    { name: 'Jan', bookings: 120 },
    { name: 'Feb', bookings: 150 },
    { name: 'Mar', bookings: 130 },
    { name: 'Apr', bookings: 170 },
    { name: 'May', bookings: 190 },
];

const SubAdminDashboard = () => {
    const { t } = useLanguage();
    
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-textPrimary">{t('OPERATIONAL_DASHBOARD')}</h1>
                    <p className="text-textSecondary text-sm">{t('OPERATIONAL_DASHBOARD_DESC')}</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-accent py-2.5 flex items-center gap-2">
                        <Plus size={18} />
                        {t('NEW_BOOKING')}
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPIStatCard title={t('TOTAL_BOOKINGS')} value="184" icon={Calendar} trend="up" trendValue="8.4" color="purple" />
                <KPIStatCard title={t('TOTAL_STAFF')} value="8" icon={Users} color="orange" />
                <KPIStatCard title={t('ROOMS_AVAILABLE')} value="14" icon={DoorOpen} color="green" />
                <KPIStatCard title={t('TODAY_REVENUE')} value="₹12,400" icon={IndianRupee} trend="up" trendValue="15.2" color="orange" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 card p-6">
                    <div className="flex items-center justify-between mb-8">
                        <h3 className="font-bold text-lg text-textPrimary text-sm font-bold uppercase tracking-wider text-slate-400">{t('MONTHLY_BOOKINGS')}</h3>
                        <Filter size={18} className="text-slate-400" />
                    </div>
                    <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F1F5F9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94A3B8', fontSize: 12}} />
                                <Tooltip cursor={{fill: '#F8FAFC'}} contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Bar dataKey="bookings" fill="#2563EB" radius={[6, 6, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="card p-6">
                    <h3 className="font-bold text-lg text-textPrimary mb-6 flex items-center gap-2">
                        <Briefcase size={18} className="text-accent" />
                        {t('STAFF_ATTENDANCE')}
                    </h3>
                    <div className="space-y-6">
                        {[
                            { name: 'John Doe', status: t('ON_DUTY'), time: '08:00 AM' },
                            { name: 'Mike Ross', status: t('LATE'), time: '09:15 AM' },
                            { name: 'Harvey Specter', status: t('ON_DUTY'), time: '08:05 AM' },
                            { name: 'Donna Paulsen', status: t('LEAVE'), time: '-' },
                        ].map((staff) => (
                            <div key={staff.name} className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center font-bold text-xs text-slate-500">{staff.name.charAt(0)}</div>
                                    <div>
                                        <p className="text-sm font-bold text-textPrimary">{staff.name}</p>
                                        <p className="text-xs text-textSecondary">{staff.time !== '-' ? `${t('CHECK_IN_TIME')}${staff.time}` : t('FULL_DAY_LEAVE')}</p>
                                    </div>
                                </div>
                                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${staff.status === t('ON_DUTY') ? 'bg-emerald-50 text-emerald-600' : staff.status === t('LATE') ? 'bg-orange-50 text-orange-600' : 'bg-rose-50 text-rose-600'}`}>
                                    {staff.status}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SubAdminDashboard;
