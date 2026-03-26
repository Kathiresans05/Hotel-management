import React from 'react';
import { 
    DoorOpen, Calendar, Clock, AlertTriangle, 
    Search, UserPlus, Filter, RefreshCw,
    Plus, IndianRupee, FileText
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import KPIStatCard from '../components/KPIStatCard';

const quickStats = [
    { label: 'AVAILABLE', count: 12, color: 'green', icon: DoorOpen },
    { label: 'OCCUPIED', count: 24, color: 'red', icon: DoorOpen },
    { label: 'CLEANING', count: 3, color: 'blue', icon: Clock },
    { label: 'MAINTENANCE', count: 1, color: 'orange', icon: AlertTriangle },
];

const rooms = [
    { number: '101', type: 'SINGLE_AC', status: 'Available', floor: 'FLOOR_1ST' },
    { number: '102', type: 'DOUBLE_AC', status: 'Occupied', floor: 'FLOOR_1ST', customer: 'Aryan Sharma' },
    { number: '103', type: 'SINGLE_NON_AC', status: 'Cleaning', floor: 'FLOOR_1ST' },
    { number: '104', type: 'DOUBLE_AC', status: 'Available', floor: 'FLOOR_1ST' },
    { number: '201', type: 'FAMILY_AC', status: 'Maintenance', floor: 'FLOOR_2ND' },
    { number: '202', type: 'DOUBLE_AC', status: 'Occupied', floor: 'FLOOR_2ND', customer: 'Priya Verma' },
    { number: '203', type: 'SINGLE_AC', status: 'Waiting', floor: 'FLOOR_2ND' },
    { number: '204', type: 'SINGLE_NON_AC', status: 'Available', floor: 'FLOOR_2ND' },
];

const ReceptionDashboard = () => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-textPrimary">{t('RECEPTION_DESK')}</h1>
                    <p className="text-textSecondary text-sm">{t('RECEPTION_DESC')}</p>
                </div>
                <div className="flex items-center gap-3">
                    <button 
                        onClick={() => navigate('/reception/check-in')}
                        className="btn-accent py-2.5 flex items-center gap-2"
                    >
                        <UserPlus size={18} />
                        {t('QUICK_CHECK_IN_BTN')}
                    </button>
                </div>
            </div>

            {/* Quick Status Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {quickStats.map((stat) => (
                    <KPIStatCard
                        key={stat.label}
                        title={t(stat.label)}
                        value={stat.count}
                        icon={stat.icon}
                        color={stat.color}
                        compact={true}
                    />
                ))}
            </div>

            {/* Filters and Search */}
            <div className="card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder={t('SEARCH_ROOM_GUEST')} 
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent transition-all"
                        />
                    </div>
                    <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium outline-none">
                        <option>{t('ALL_FLOORS')}</option>
                        <option>{t('FLOOR_1ST')} {t('FLOOR')}</option>
                        <option>{t('FLOOR_2ND')} {t('FLOOR')}</option>
                    </select>
                    <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 transition-all">
                        <Filter size={18} />
                    </button>
                </div>
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                    <RefreshCw size={14} className="animate-spin-once" />
                    {t('LAST_UPDATED_JUST_NOW')}
                </div>
            </div>

            {/* Room Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {rooms.map((room) => (
                    <div 
                        key={room.number} 
                        onClick={() => room.status === 'Available' && navigate('/reception/check-in', { state: { roomNumber: room.number } })}
                        className={`
                            card p-4 border-2 transition-all cursor-pointer group active:scale-[0.98]
                            ${room.status === 'Available' ? 'hover:border-emerald-400' : 'hover:border-slate-300'}
                        `}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <span className="text-xl font-black text-textPrimary leading-none">{room.number}</span>
                            <StatusBadge status={room.status} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{room.type}</p>
                            {room.customer ? (
                                <p className="text-xs font-bold text-accent truncate">{room.customer}</p>
                            ) : (
                                <p className="text-xs font-medium text-slate-300">{t('NO_GUEST')}</p>
                            )}
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold text-slate-400">
                            <span>{t(room.floor)} {t('FLOOR')}</span>
                            <div className="p-1 rounded bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity">
                                <Plus size={14} className="text-accent" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Today summary widgets */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="card p-6 lg:col-span-2">
                    <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
                        <Clock size={20} className="text-blue-500" />
                        {t('UPCOMING_ACTIVITIES')}
                    </h3>
                    <div className="space-y-4">
                        {[
                            { type: 'CHECK-IN', time: '12:30 PM', guest: 'Rahul Kapoor', room: '302', status: 'Pending' },
                            { type: 'CHECK-OUT', time: '02:00 PM', guest: 'Sonia Mehta', room: '105', status: 'Warning' },
                            { type: 'CHECK-IN', time: '04:15 PM', guest: 'Dr. Sameer', room: '410', status: 'Pending' },
                        ].map((act, i) => (
                            <div key={i} className="flex items-center gap-4 p-3 hover:bg-slate-50 rounded-xl transition-all border border-transparent hover:border-slate-200">
                                <div className={`w-2 h-10 rounded-full ${act.type === 'CHECK-IN' ? 'bg-blue-500' : 'bg-orange-500'}`}></div>
                                <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                        <span className="text-xs font-black text-slate-400 tracking-wider">{t(act.type)}</span>
                                        <span className="text-xs font-bold text-textPrimary">{act.time}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-bold text-textPrimary">{act.guest}</p>
                                        <p className="text-sm font-medium text-textSecondary">{t('ROOM')} <span className="text-accent font-bold">{act.room}</span></p>
                                    </div>
                                </div>
                                {act.status === 'Warning' && <AlertTriangle size={16} className="text-orange-500 animate-pulse" />}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="card p-6 bg-primary text-white">
                    <h3 className="font-bold text-lg mb-6">{t('QUICK_ACTIONS')}</h3>
                    <div className="space-y-3">
                        <button className="w-full py-3 px-4 bg-surface/10 hover:bg-surface/20 rounded-xl flex items-center gap-3 transition-all">
                            <UserPlus size={18} />
                            <span className="text-sm font-bold">{t('NEW_BOOKING')}</span>
                        </button>
                        <button className="w-full py-3 px-4 bg-surface/10 hover:bg-surface/20 rounded-xl flex items-center gap-3 transition-all">
                            <Calendar size={18} />
                            <span className="text-sm font-bold">{t('RESCHEDULE')}</span>
                        </button>
                        <button className="w-full py-3 px-4 bg-surface/10 hover:bg-surface/20 rounded-xl flex items-center gap-3 transition-all">
                            <IndianRupee size={18} />
                            <span className="text-sm font-bold">{t('PAYMENTS')}</span>
                        </button>
                        <button className="w-full py-3 px-4 bg-surface/10 hover:bg-surface/20 rounded-xl flex items-center gap-3 transition-all">
                            <FileText size={18} />
                            <span className="text-sm font-bold">{t('INVOICES')}</span>
                        </button>
                    </div>
                    <div className="mt-8 p-4 bg-accent/20 rounded-2xl border border-accent/20">
                        <p className="text-xs font-bold text-accent uppercase mb-1">{t('SHIFT_NOTE')}</p>
                        <p className="text-xs text-slate-300 leading-relaxed italic">"{t('SHIFT_NOTE_TEXT')}"</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReceptionDashboard;
