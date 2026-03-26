import React, { useState } from 'react';
import { 
  Receipt, 
  Search, 
  Filter, 
  Plus, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  Zap, 
  Droplets, 
  Flame, 
  ShieldCheck, 
  Package,
  Wrench,
  MoreVertical,
  Calendar,
  PieChart as PieChartIcon,
  CreditCard,
  History,
  Info
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

const expenseCategories = [
  { id: 1, label: 'Utilities', icon: Zap, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  { id: 2, label: 'Maintenance', icon: Wrench, color: 'text-blue-500', bg: 'bg-blue-500/10' },
  { id: 3, label: 'Supplies', icon: Package, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  { id: 4, label: 'Security', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
];

const initialExpenses = [
  { id: 'EXP-101', category: 'Utilities', title: 'Electricity Bill - Feb', amount: 12500, date: '21 Mar, 2026', status: 'Paid', method: 'Auto-Debit' },
  { id: 'EXP-102', category: 'Supplies', title: 'Toiletries & Cleaning Kits', amount: 4800, date: '20 Mar, 2026', status: 'Paid', method: 'Credit Card' },
  { id: 'EXP-103', category: 'Maintenance', title: 'Generator Servicing', amount: 3200, date: '19 Mar, 2026', status: 'Pending', method: 'Invoice' },
  { id: 'EXP-104', category: 'Utilities', title: 'Water Supply Charges', amount: 1800, date: '18 Mar, 2026', status: 'Paid', method: 'UPI' },
  { id: 'EXP-105', category: 'Security', title: 'CCTV Annual AMC', amount: 15000, date: '15 Mar, 2026', status: 'Refunded', method: 'Bank Transfer' },
  { id: 'EXP-106', category: 'Supplies', title: 'New Bed Linens (10 Sets)', amount: 9500, date: '14 Mar, 2026', status: 'Paid', method: 'Business Card' },
];

const Expenses = () => {
  const { isDarkMode } = useTheme();
  const [activeCategory, setActiveCategory] = useState('All');

  const stats = [
    { label: 'Monthly Budget', value: '₹85,000', used: '64%', color: 'bg-accent' },
    { label: 'Total Expenses', value: '₹54,400', used: '100%', color: 'bg-blue-500' },
    { label: 'Pending Bills', value: '₹3,200', used: '5%', color: 'bg-orange-500' },
  ];

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Utilities': return Zap;
      case 'Maintenance': return Wrench;
      case 'Supplies': return Package;
      case 'Security': return ShieldCheck;
      default: return Receipt;
    }
  };

  const getColorClasses = (category) => {
    switch (category) {
      case 'Utilities': return "bg-amber-500/10 text-amber-500";
      case 'Maintenance': return "bg-blue-500/10 text-blue-500";
      case 'Supplies': return "bg-purple-500/10 text-purple-500";
      case 'Security': return "bg-emerald-500/10 text-emerald-500";
      default: return "bg-slate-500/10 text-slate-500";
    }
  };

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Expense Tracker" 
        subtitle="Manage and track all operational costs, utility bills, and facility maintenance expenses."
        actions={
          <div className="flex items-center gap-3">
             <div className={cn(
              "flex items-center gap-2 px-4 py-2 border rounded-2xl text-sm font-bold transition-all",
              isDarkMode ? "bg-white/5 border-white/10 text-white" : "bg-white border-slate-200 shadow-sm"
            )}>
              <Calendar className="w-4 h-4 text-accent" />
              March 2026
            </div>
            <button className="flex items-center px-4 py-2 bg-accent text-white rounded-2xl text-sm font-bold shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all active:scale-95">
              <Plus className="w-4 h-4 mr-2" />
              Add Expense
            </button>
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className={cn(
                "p-6 rounded-[32px] border transition-all hover:scale-[1.02]",
                isDarkMode ? "bg-[#0F172A]/40 border-white/5" : "bg-white border-slate-100 shadow-sm"
              )}
            >
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-3">{stat.label}</p>
              <h3 className={cn("text-2xl font-bold tracking-tight mb-4", isDarkMode ? "text-white" : "text-slate-900")}>{stat.value}</h3>
              <div className={cn("h-1.5 w-full rounded-full overflow-hidden", isDarkMode ? "bg-white/5" : "bg-slate-100")}>
                <div className={cn("h-full rounded-full transition-all duration-1000", stat.color)} style={{ width: stat.used }} />
              </div>
            </div>
          ))}
        </div>

        <div className={cn(
          "p-6 rounded-[32px] border relative overflow-hidden flex flex-col justify-center",
          isDarkMode ? "bg-accent/10 border-accent/20" : "bg-accent/[0.03] border-accent/10 shadow-sm"
        )}>
           <div className="absolute top-0 right-0 w-24 h-24 bg-accent/20 rounded-bl-full -mr-6 -mt-6" />
           <div className="flex items-center gap-3 mb-2">
             <PieChartIcon className="text-accent w-5 h-5" />
             <span className="text-xs font-bold text-accent uppercase tracking-widest">Monthly Outlook</span>
           </div>
           <p className={cn("text-xl font-bold mb-1", isDarkMode ? "text-white" : "text-slate-900")}>Budget Alert</p>
           <p className="text-xs text-slate-400 leading-relaxed font-medium">You have consumed 75% of the maintenance budget for this month.</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Category Filters */}
        <div className="w-full lg:w-64 shrink-0 space-y-2">
           <h4 className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4">Categories</h4>
           {[
             { id: 'All', label: 'All Expenses', icon: Receipt },
             { id: 'Utilities', label: 'Utilities', icon: Zap },
             { id: 'Maintenance', label: 'Maintenance', icon: Wrench },
             { id: 'Supplies', label: 'Supplies', icon: Package },
             { id: 'Security', label: 'Security', icon: ShieldCheck },
           ].map((cat) => (
             <button
               key={cat.id}
               onClick={() => setActiveCategory(cat.id)}
               className={cn(
                 "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl text-sm font-bold transition-all",
                 activeCategory === cat.id
                   ? (isDarkMode ? "bg-white/10 text-white shadow-xl shadow-black/20" : "bg-white text-slate-900 shadow-lg shadow-black/5")
                   : (isDarkMode ? "text-slate-400 hover:bg-white/5 hover:text-white" : "text-slate-500 hover:bg-slate-50 hover:text-slate-900")
               )}
             >
               <cat.icon className="w-4 h-4" />
               {cat.label}
             </button>
           ))}
        </div>

        {/* Expense List */}
        <div className="flex-1 space-y-4">
          <div className={cn(
            "p-3 rounded-2xl border flex items-center gap-3",
            isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-slate-200"
          )}>
            <Search className="w-4 h-4 text-slate-400 ml-2" />
            <input 
              type="text" 
              placeholder="Search by vendor, title or ID..." 
              className="bg-transparent border-none outline-none text-sm w-full py-1 text-slate-400 placeholder:text-slate-500"
            />
            <button className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-xl border border-white/5 text-[10px] font-bold uppercase tracking-widest transition-colors hover:bg-white/5",
              isDarkMode ? "text-slate-400" : "text-slate-500"
            )}>
              <Filter className="w-3.5 h-3.5" />
              Filter
            </button>
          </div>

          <div className="space-y-3">
            {initialExpenses.map((exp) => (
              <div 
                key={exp.id}
                className={cn(
                  "p-5 rounded-[28px] border transition-all duration-300 group flex items-center gap-5 cursor-pointer",
                  isDarkMode ? "bg-[#0F172A]/40 border-white/5 shadow-black/20" : "bg-white border-slate-100 shadow-sm shadow-black/5",
                  "hover:shadow-xl hover:-translate-y-1"
                )}
              >
                <div className={cn(
                  "w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
                  getColorClasses(exp.category)
                )}>
                  {React.createElement(getCategoryIcon(exp.category), { size: 24 })}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <h4 className={cn("font-bold text-base", isDarkMode ? "text-white" : "text-slate-900")}>{exp.title}</h4>
                    <span className={cn("text-base font-bold tracking-tight", isDarkMode ? "text-white" : "text-slate-900")}>₹{exp.amount.toLocaleString()}</span>
                  </div>
                  
                  <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 font-medium">
                    <div className="flex items-center gap-1.5">
                       <History size={12} className="text-slate-400" />
                       {exp.date}
                    </div>
                    <div className="h-3 w-[1px] bg-white/10" />
                    <div className="flex items-center gap-1.5">
                       <CreditCard size={12} className="text-slate-400" />
                       {exp.method}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <span className={cn(
                    "px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-widest",
                    exp.status === 'Paid' ? "bg-emerald-500/10 text-emerald-500" : 
                    exp.status === 'Pending' ? "bg-orange-500/10 text-orange-500" : 
                    "bg-rose-500/10 text-rose-500"
                  )}>{exp.status}</span>
                  <button className={cn(
                    "p-2.5 rounded-xl border border-transparent transition-all opacity-0 group-hover:opacity-100",
                    isDarkMode ? "bg-white/5 text-slate-400 hover:bg-white/10 hover:border-white/10" : "bg-slate-100 text-slate-500 hover:bg-slate-200"
                  )}>
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-6">
            <div className={cn(
              "p-8 rounded-[32px] border border-dashed flex flex-col items-center justify-center text-center",
              isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
            )}>
              <Info className="w-10 h-10 text-slate-500 mb-4 opacity-50" />
              <p className={cn("text-base font-bold mb-1", isDarkMode ? "text-white" : "text-slate-900")}>Operational Expenses Ledger</p>
              <p className="text-xs text-slate-500 max-w-xs font-medium">Monthly expenses are reconciled automatically at the end of each billing cycle.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expenses;
