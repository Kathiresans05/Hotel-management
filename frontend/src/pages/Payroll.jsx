import React, { useState } from 'react';
import { 
  Banknote, 
  Users, 
  Calendar, 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  Download,
  Search,
  ChevronRight,
  MoreVertical,
  ArrowUpRight,
  ArrowDownRight,
  CreditCard,
  History,
  Briefcase
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { useLanguage } from '../context/LanguageContext';

const payrollData = [
  { id: 1, name: 'John Doe', role: 'Front Desk', basePay: 22000, bonuses: 1500, deductions: 500, status: 'Paid', method: 'Bank Transfer' },
  { id: 2, name: 'Sarah Wilson', role: 'Housekeeping', basePay: 14000, bonuses: 800, deductions: 200, status: 'Processing', method: 'Bank Transfer' },
  { id: 3, name: 'Michael Chen', role: 'Security', basePay: 18000, bonuses: 500, deductions: 0, status: 'Paid', method: 'UPI' },
  { id: 4, name: 'Lisa Ray', role: 'Manager', basePay: 35000, bonuses: 4000, deductions: 1200, status: 'Unpaid', method: 'Bank Transfer' },
  { id: 5, name: 'David Miller', role: 'Maintenance', basePay: 16000, bonuses: 0, deductions: 500, status: 'Paid', method: 'Cash' },
  { id: 6, name: 'Emma Watson', role: 'Housekeeping', basePay: 14000, bonuses: 200, deductions: 0, status: 'Paid', method: 'Bank Transfer' },
];

const Payroll = () => {
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();
  const [selectedMonth, setSelectedMonth] = useState('March 2026');

  const stats = [
    { label: t('TOTAL_PAYROLL'), value: '₹1,47,500', trend: '+4.2%', trendUp: true, icon: Banknote, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: t('PENDING_PAYOUT'), value: '₹37,800', trend: '-2.1%', trendUp: false, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: t('STAFF_COUNT'), value: '8', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: t('AVG_SALARY'), value: '₹18,437', icon: TrendingUp, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title={t('PAYROLL_MANAGEMENT')} 
        subtitle={t('PAYROLL_DESC')}
        actions={
          <div className="flex items-center gap-3">
            <div className={cn(
              "flex items-center gap-2 px-4 py-2 border rounded-2xl text-sm font-bold transition-all",
              isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-white border-slate-200 text-slate-700 shadow-sm"
            )}>
              <Calendar className="w-4 h-4 text-accent" />
              {selectedMonth}
              <ChevronRight className="w-4 h-4 ml-1 rotate-90" />
            </div>
            <button className="flex items-center px-4 py-2 bg-accent text-white rounded-2xl text-sm font-bold shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all active:scale-95">
              <Download className="w-4 h-4 mr-2" />
              {t('PAY_SLIPS')}
            </button>
          </div>
        }
      />

      {/* Payroll Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, i) => (
          <div 
            key={i} 
            className={cn(
              "p-6 rounded-[32px] border transition-all hover:translate-y-[-4px]",
              isDarkMode ? "bg-[#0F172A]/40 border-white/5" : "bg-white border-slate-100 shadow-sm"
            )}
          >
            <div className="flex items-center justify-between mb-5">
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              {stat.trend && (
                <div className={cn(
                  "flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold",
                  stat.trendUp ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                )}>
                  {stat.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                  {stat.trend}
                </div>
              )}
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <h3 className={cn("text-2xl font-bold tracking-tight", isDarkMode ? "text-white" : "text-slate-900")}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        {/* Payroll Breakdown Table */}
        <div className={cn(
          "lg:col-span-2 rounded-[32px] border overflow-hidden",
          isDarkMode ? "bg-[#0F172A]/40 border-white/5" : "bg-white border-slate-100 shadow-sm"
        )}>
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <h3 className={cn("font-bold text-lg", isDarkMode ? "text-white" : "text-slate-900")}>{t('STAFF_SALARY_LEDGER')}</h3>
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/5",
              isDarkMode ? "bg-white/5" : "bg-slate-50"
            )}>
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" placeholder={t('FILTER_EMPLOYEES_PLACEHOLDER')} className="bg-transparent border-none outline-none text-xs text-slate-400 w-32" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className={cn(
                  "border-b uppercase text-[9px] font-bold tracking-widest text-slate-400",
                  isDarkMode ? "border-white/5 bg-white/[0.02]" : "border-slate-100 bg-slate-50/50"
                )}>
                  <th className="px-6 py-5">{t('EMPLOYEE')}</th>
                  <th className="px-6 py-5">{t('BASE_PAY')}</th>
                  <th className="px-6 py-5 text-emerald-500">{t('BONUS')}</th>
                  <th className="px-6 py-5 text-rose-500">{t('DEDUCTIONS')}</th>
                  <th className="px-6 py-5 text-accent">{t('NET_AMOUNT')}</th>
                  <th className="px-6 py-5">{t('STATUS')}</th>
                </tr>
              </thead>
              <tbody>
                {payrollData.map((staff, i) => (
                  <tr 
                    key={staff.id} 
                    className={cn(
                      "group transition-all hover:bg-white/[0.02]",
                      i !== payrollData.length - 1 && (isDarkMode ? "border-b border-white/5" : "border-b border-slate-100")
                    )}
                  >
                    <td className="px-6 py-5">
                      <p className={cn("text-xs font-bold whitespace-nowrap", isDarkMode ? "text-white" : "text-slate-900")}>{staff.name}</p>
                      <p className="text-[9px] font-bold text-slate-400 tracking-wide uppercase">{staff.role}</p>
                    </td>
                    <td className="px-6 py-5 text-xs text-slate-400 font-medium">₹{staff.basePay.toLocaleString()}</td>
                    <td className="px-6 py-5 text-xs text-emerald-500/80 font-bold">₹{staff.bonuses.toLocaleString()}</td>
                    <td className="px-6 py-5 text-xs text-rose-500/80 font-bold">₹{staff.deductions.toLocaleString()}</td>
                    <td className="px-6 py-5">
                      <span className={cn("text-sm font-bold", isDarkMode ? "text-white" : "text-slate-900")}>₹{(staff.basePay + staff.bonuses - staff.deductions).toLocaleString()}</span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={cn(
                        "px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider",
                        staff.status === 'Paid' ? "bg-emerald-500/10 text-emerald-500" :
                        staff.status === 'Processing' ? "bg-blue-500/10 text-blue-500" :
                        "bg-slate-500/10 text-slate-400"
                      )}>{t(staff.status.toUpperCase())}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Payment History & Methods */}
        <div className="space-y-6">
          <div className={cn(
            "p-6 rounded-[32px] border",
            isDarkMode ? "bg-[#0F172A]/40 border-white/5" : "bg-white border-slate-100 shadow-sm"
          )}>
            <h4 className={cn("font-bold text-sm mb-6 flex items-center gap-2", isDarkMode ? "text-white" : "text-slate-900")}>
              <History size={16} className="text-accent" />
              {t('TRANSFER_HISTORY')}
            </h4>
            <div className="space-y-5">
              {[
                { label: 'February 2026', amount: '₹1,42,800', date: 'Mar 01, 2026', icon: CheckCircle2, color: 'text-emerald-500' },
                { label: 'January 2026', amount: '₹1,38,500', date: 'Feb 01, 2026', icon: CheckCircle2, color: 'text-emerald-500' },
                { label: 'December 2025', amount: '₹1,45,200', date: 'Jan 02, 2026', icon: CheckCircle2, color: 'text-emerald-500' },
              ].map((h, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer hover:bg-white/[0.02] p-2 rounded-2xl transition-all">
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-110",
                      isDarkMode ? "bg-white/5" : "bg-slate-50"
                    )}>
                      <CreditCard className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <p className={cn("text-xs font-bold", isDarkMode ? "text-white" : "text-slate-900")}>{h.label}</p>
                      <p className="text-[10px] font-bold text-slate-400">{h.date}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={cn("text-xs font-bold", isDarkMode ? "text-white" : "text-slate-900")}>{h.amount}</p>
                    <p className={cn("text-[9px] font-bold uppercase tracking-widest", h.color)}>{t('COMPLETED')}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 py-3 border border-dashed border-white/10 rounded-2xl text-[10px] font-bold text-slate-400 hover:text-accent hover:border-accent/40 transition-all uppercase tracking-[0.2em]">
              {t('VIEW_FULL_HISTORY')}
            </button>
          </div>

          <div className={cn(
            "p-8 rounded-[32px] bg-accent relative overflow-hidden text-white shadow-xl shadow-accent/10"
          )}>
            <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-bl-full -mr-6 -mt-6" />
            <h4 className="font-bold text-sm mb-4 uppercase tracking-[0.2em] opacity-80 flex items-center gap-2">
              <Briefcase size={14} /> {t('ACTION_REQUIRED')}
            </h4>
            <p className="text-2xl font-bold tracking-tight mb-2">2 {t('PENDING_APPROVALS')}</p>
            <p className="text-xs opacity-70 leading-relaxed mb-6">Staff bonuses for the 'Hostet Expo Event' are awaiting your final confirmation.</p>
            <button className="w-full py-3.5 bg-white text-accent rounded-2xl text-xs font-bold shadow-lg hover:scale-[1.02] transition-all active:scale-95 uppercase tracking-widest">
              {t('REVIEW_BONUSES')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payroll;
