import React, { useState } from 'react';
import { 
  Users, 
  Clock, 
  Calendar, 
  MapPin, 
  Filter, 
  Download, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle,
  Search,
  ChevronRight,
  MoreVertical,
  Fingerprint,
  Plus
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { useLanguage } from '../context/LanguageContext';

const staffAttendanceData = [
  { id: 1, name: 'John Doe', role: 'Front Desk', status: 'On Duty', checkIn: '08:00 AM', checkOut: '-', location: 'Main Entrance', avatar: 'J' },
  { id: 2, name: 'Sarah Wilson', role: 'Housekeeping', status: 'Late', checkIn: '09:15 AM', checkOut: '-', location: 'Floor 2', avatar: 'S' },
  { id: 3, name: 'Michael Chen', role: 'Security', status: 'On Duty', checkIn: '07:30 AM', checkOut: '-', location: 'Gate A', avatar: 'M' },
  { id: 4, name: 'Lisa Ray', role: 'Manager', status: 'Off Duty', checkIn: '08:30 AM', checkOut: '05:30 PM', location: 'Office', avatar: 'L' },
  { id: 5, name: 'David Miller', role: 'Maintenance', status: 'Absent', checkIn: '-', checkOut: '-', location: '-', avatar: 'D' },
  { id: 6, name: 'Emma Watson', role: 'Housekeeping', status: 'On Duty', checkIn: '08:05 AM', checkOut: '-', location: 'Floor 1', avatar: 'E' },
];

const Attendance = () => {
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');

  const stats = [
    { label: t('PRESENT_TODAY'), value: '18/22', icon: CheckCircle2, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: t('LATE_ARRIVALS'), value: '3', icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: t('ON_LEAVE'), value: '2', icon: Calendar, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: t('ABSENT'), value: '1', icon: XCircle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title={t('STAFF_ATTENDANCE')} 
        subtitle={t('ATTENDANCE_DESC')}
        actions={
          <div className="flex items-center gap-3">
            <button className={cn(
              "flex items-center px-4 py-2 border rounded-2xl text-sm font-bold transition-all",
              isDarkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
            )}>
              <Download className="w-4 h-4 mr-2" />
              {t('MONTHLY_REPORT')}
            </button>
            <button className="flex items-center px-4 py-2 bg-accent text-white rounded-2xl text-sm font-bold shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all active:scale-95">
              <Plus className="w-4 h-4 mr-2" />
              {t('MANUAL_ENTRY')}
            </button>
          </div>
        }
      />

      {/* Attendance Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className={cn(
              "p-6 rounded-3xl border transition-all flex items-center gap-4",
              isDarkMode ? "bg-[#0F172A]/40 border-white/5" : "bg-white border-slate-100"
            )}
          >
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0", stat.bg)}>
              <stat.icon className={cn("w-6 h-6", stat.color)} />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
              <h3 className={cn("text-2xl font-bold tracking-tight", isDarkMode ? "text-white" : "text-slate-900")}>{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Control Panel */}
      <div className={cn(
        "p-6 rounded-[32px] border mb-6",
        isDarkMode ? "bg-[#0F172A]/40 border-white/5" : "bg-white border-slate-100 shadow-sm"
      )}>
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between">
          <div className="flex items-center gap-4 w-full lg:w-auto overflow-x-auto pb-2 lg:pb-0">
            {['All', 'On Duty', 'Late', 'Absent', 'On Leave'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={cn(
                  "px-5 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap",
                  activeFilter === f 
                    ? "bg-accent text-white shadow-lg shadow-accent/20" 
                    : isDarkMode ? "bg-white/5 text-slate-400 hover:text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                )}
              >
                {t(f.toUpperCase().replace(' ', '_'))}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 w-full lg:w-96">
            <div className={cn(
              "flex-1 flex items-center gap-3 px-4 py-2.5 rounded-2xl border transition-all focus-within:ring-4 focus-within:ring-accent/5 focus-within:border-accent/40",
              isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
            )}>
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder={t('SEARCH_ATTENDANCE_PLACEHOLDER')} 
                className="bg-transparent border-none outline-none text-sm text-slate-400 w-full" 
              />
            </div>
          </div>
        </div>
      </div>

      {/* Attendance Table/List */}
      <div className={cn(
        "rounded-[32px] border overflow-hidden",
        isDarkMode ? "bg-[#0F172A]/40 border-white/5" : "bg-white border-slate-100 shadow-sm"
      )}>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={cn(
                "border-b transition-colors",
                isDarkMode ? "border-white/5 bg-white/[0.02]" : "border-slate-100 bg-slate-50/50"
              )}>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('EMPLOYEE')}</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('STATUS')}</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('CHECK_IN')}</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('CHECK_OUT')}</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('LOCATION')}</th>
                <th className="px-6 py-5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">{t('ACTION')}</th>
              </tr>
            </thead>
            <tbody>
              {staffAttendanceData.map((staff, i) => (
                <tr 
                  key={staff.id} 
                  className={cn(
                    "group transition-all hover:bg-white/[0.02]",
                    i !== staffAttendanceData.length - 1 && (isDarkMode ? "border-b border-white/5" : "border-b border-slate-100")
                  )}
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-4">
                      <div className={cn(
                        "w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 shadow-lg",
                        isDarkMode ? "bg-accent/10 text-accent" : "bg-accent/5 text-accent"
                      )}>
                        {staff.avatar}
                      </div>
                      <div>
                        <p className={cn("text-sm font-bold", isDarkMode ? "text-white" : "text-slate-900")}>{staff.name}</p>
                        <p className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">{staff.role}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className={cn(
                      "px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      staff.status === 'On Duty' ? "bg-emerald-500/10 text-emerald-500" :
                      staff.status === 'Late' ? "bg-orange-500/10 text-orange-500" :
                      staff.status === 'Absent' ? "bg-rose-500/10 text-rose-500" :
                      "bg-slate-500/10 text-slate-500"
                    )}>
                      {staff.status}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className={cn("text-sm font-medium", isDarkMode ? "text-white/70" : "text-slate-600")}>{staff.checkIn}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span className={cn("text-sm font-medium", isDarkMode ? "text-white/40" : "text-slate-400")}>{staff.checkOut}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span className={cn("text-sm font-medium", isDarkMode ? "text-white/70" : "text-slate-600")}>{staff.location}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className={cn(
                        "p-2 rounded-xl transition-colors",
                        isDarkMode ? "bg-white/5 text-slate-400 hover:text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100 shadow-sm"
                      )}>
                        <MoreVertical size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
