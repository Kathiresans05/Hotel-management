import React, { useState } from 'react';
import { 
  CreditCard, 
  Search, 
  Filter, 
  Download, 
  ArrowUpRight, 
  ArrowDownRight, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  MoreVertical,
  Banknote,
  Wallet,
  Globe,
  Calendar,
  IndianRupee,
  LayoutGrid,
  List
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

const transactions = [
  { id: 'TX-9901', guest: 'John Doe', room: '101', amount: 4500, method: 'Credit Card', status: 'Success', date: '21 Mar, 2026 10:30 AM', type: 'Room Booking' },
  { id: 'TX-9902', guest: 'Sarah Wilson', room: '202', amount: 1200, method: 'UPI', status: 'Pending', date: '21 Mar, 2026 11:15 AM', type: 'Laundry Service' },
  { id: 'TX-9903', guest: 'Michael Chen', room: '105', amount: 8500, method: 'Bank Transfer', status: 'Success', date: '20 Mar, 2026 09:45 AM', type: 'Room Booking' },
  { id: 'TX-9904', guest: 'Emma Watson', room: '304', amount: 600, method: 'Cash', status: 'Failed', date: '20 Mar, 2026 02:20 PM', type: 'Food & Beverage' },
  { id: 'TX-9905', guest: 'Rachel Zane', room: '102', amount: 2200, method: 'Debit Card', status: 'Success', date: '19 Mar, 2026 11:30 AM', type: 'Room Booking' },
  { id: 'TX-9906', guest: 'Harvey Specter', room: '401', amount: 12000, method: 'Credit Card', status: 'Success', date: '19 Mar, 2026 08:00 AM', type: 'Suite Upgrade' },
];

const Payments = () => {
  const { isDarkMode } = useTheme();
  const [filter, setFilter] = useState('All');

  const stats = [
    { label: 'Today Revenue', value: '₹18,240', trend: '+12.4%', up: true, icon: IndianRupee, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { label: 'Pending Payouts', value: '₹4,500', trend: '-2.1%', up: false, icon: Clock, color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { label: 'Succesful Trans.', value: '142', trend: '+8.2%', up: true, icon: CheckCircle2, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { label: 'Failed Trans.', value: '3', trend: '-5.4%', up: false, icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-500/10' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Payment Ledger" 
        subtitle="Detailed history of all guest transactions, including bookings, room service, and amenities."
        actions={
          <div className="flex items-center gap-3">
            <button className={cn(
              "flex items-center px-4 py-2 border rounded-2xl text-sm font-bold transition-all",
              isDarkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
            )}>
              <Calendar className="w-4 h-4 mr-2" />
              March 2026
            </button>
            <button className="flex items-center px-4 py-2 bg-accent text-white rounded-2xl text-sm font-bold shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all active:scale-95">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
          </div>
        }
      />

      {/* Metrics Row */}
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
              <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg shadow-black/5", stat.bg)}>
                <stat.icon className={cn("w-6 h-6", stat.color)} />
              </div>
              <div className={cn(
                "flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold",
                stat.up ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
              )}>
                {stat.up ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                {stat.trend}
              </div>
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
            <h3 className={cn("text-2xl font-bold tracking-tight", isDarkMode ? "text-white" : "text-slate-900")}>{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Ledger */}
        <div className="flex-1 space-y-6">
          <div className={cn(
            "p-4 rounded-[32px] border flex flex-col md:flex-row items-center justify-between gap-4",
            isDarkMode ? "bg-[#0F172A]/40 border-white/5" : "bg-white border-slate-100 shadow-sm"
          )}>
            <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
              {['All', 'Success', 'Pending', 'Failed'].map((f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn(
                    "px-5 py-2.5 rounded-2xl text-xs font-bold transition-all",
                    filter === f 
                      ? "bg-accent text-white shadow-lg shadow-accent/20" 
                      : isDarkMode ? "bg-white/5 text-slate-400 hover:text-white" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                  )}
                >
                  {f}
                </button>
              ))}
            </div>
            <div className={cn(
              "flex items-center gap-3 px-4 py-2.5 rounded-2xl border w-full md:w-80 transition-all focus-within:ring-4 focus-within:ring-accent/5 focus-within:border-accent/40",
              isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50 border-slate-200"
            )}>
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search by Guest or TXID..." className="bg-transparent border-none outline-none text-sm text-slate-400 w-full" />
            </div>
          </div>

          <div className={cn(
            "rounded-[32px] border overflow-hidden",
            isDarkMode ? "bg-[#0F172A]/40 border-white/5" : "bg-white border-slate-100 shadow-sm"
          )}>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className={cn(
                    "border-b uppercase text-[9px] font-bold tracking-widest text-slate-400",
                    isDarkMode ? "border-white/5 bg-white/[0.02]" : "border-slate-100 bg-slate-50/50"
                  )}>
                    <th className="px-6 py-5">Guest & TX Details</th>
                    <th className="px-6 py-5">Amount</th>
                    <th className="px-6 py-5">Status</th>
                    <th className="px-6 py-5">Type</th>
                    <th className="px-6 py-5">Date</th>
                    <th className="px-6 py-5">Method</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((tx, i) => (
                    <tr 
                      key={tx.id} 
                      className={cn(
                        "group transition-all hover:bg-white/[0.02]",
                        i !== transactions.length - 1 && (isDarkMode ? "border-b border-white/5" : "border-b border-slate-100")
                      )}
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-xs shrink-0 shadow-lg shadow-black/5",
                            isDarkMode ? "bg-white/5 text-accent" : "bg-accent/5 text-accent"
                          )}>
                            {tx.guest.charAt(0)}
                          </div>
                          <div>
                            <p className={cn("text-xs font-bold", isDarkMode ? "text-white" : "text-slate-900")}>{tx.guest}</p>
                            <p className="text-[10px] font-bold text-slate-400 tracking-wide uppercase">TXID: {tx.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5">
                        <span className={cn("text-sm font-bold", isDarkMode ? "text-white" : "text-slate-900")}>₹{tx.amount.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-5">
                        <span className={cn(
                          "px-2.5 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider inline-flex items-center gap-1.5",
                          tx.status === 'Success' ? "bg-emerald-500/10 text-emerald-500" :
                          tx.status === 'Pending' ? "bg-orange-500/10 text-orange-500" :
                          "bg-rose-500/10 text-rose-500"
                        )}>
                          <div className={cn("w-1.5 h-1.5 rounded-full shadow-sm", tx.status === 'Success' ? "bg-emerald-500" : tx.status === 'Pending' ? "bg-orange-500" : "bg-rose-500")} />
                          {tx.status}
                        </span>
                      </td>
                      <td className="px-6 py-5">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">{tx.type}</span>
                      </td>
                      <td className="px-6 py-5">
                        <p className={cn("text-[11px] font-medium leading-tight", isDarkMode ? "text-white/60" : "text-slate-600")}>{tx.date.split(' ')[0]} {tx.date.split(' ')[1]}</p>
                        <p className="text-[9px] font-bold text-slate-400">{tx.date.split(' ')[2]} {tx.date.split(' ')[3]}</p>
                      </td>
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-2">
                          {tx.method === 'Credit Card' ? <CreditCard size={14} className="text-blue-400" /> : <Wallet size={14} className="text-emerald-400" />}
                          <span className={cn("text-[11px] font-bold", isDarkMode ? "text-white/70" : "text-slate-600")}>{tx.method}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={cn("p-6 border-t font-bold text-xs text-center uppercase tracking-[0.2em] transition-colors cursor-pointer", isDarkMode ? "border-white/5 bg-white/[0.02] text-slate-400 hover:text-white hover:bg-white/5" : "border-slate-100 bg-slate-50/50 text-slate-500 hover:text-slate-900 hover:bg-slate-50")}>
              View Comprehensive Ledger
            </div>
          </div>
        </div>

        {/* Payment Summary Panel */}
        <div className="w-full lg:w-80 space-y-6">
          <div className={cn(
            "p-6 rounded-[32px] border",
            isDarkMode ? "bg-[#0F172A]/40 border-white/5" : "bg-white border-slate-100 shadow-sm"
          )}>
            <h4 className={cn("font-bold text-sm mb-6 flex items-center gap-2 uppercase tracking-widest", isDarkMode ? "text-white" : "text-slate-900")}>
              <LayoutGrid size={16} className="text-accent" />
              Quick Summary
            </h4>
            <div className="space-y-6">
              {[
                { label: 'Room Revenue', value: '₹1,42,000', percentage: '78%', color: 'bg-accent' },
                { label: 'Services', value: '₹22,400', percentage: '12%', color: 'bg-purple-500' },
                { label: 'Others', value: '₹18,100', percentage: '10%', color: 'bg-blue-500' },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-slate-400 uppercase tracking-widest">{item.label}</span>
                    <span className={isDarkMode ? "text-white" : "text-slate-900"}>{item.value}</span>
                  </div>
                  <div className={cn("h-1.5 w-full rounded-full overflow-hidden", isDarkMode ? "bg-white/5" : "bg-slate-100")}>
                    <div className={cn("h-full rounded-full transition-all duration-1000", item.color)} style={{ width: item.percentage }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={cn(
            "p-8 rounded-[40px] border relative overflow-hidden text-white shadow-2xl flex flex-col justify-between h-[320px]",
            isDarkMode ? "bg-accent border-accent/20" : "bg-accent border-accent/20"
          )}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-bl-full -mr-8 -mt-8" />
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Globe className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80 mb-2">Payout Method</p>
              <h4 className="text-2xl font-bold tracking-tight mb-2">Connected Bank</h4>
              <p className="text-xs opacity-70 leading-relaxed font-medium">Auto-settlements are configured for Monday and Thursday at 11:00 AM IST.</p>
            </div>

            <button className="w-full py-4 bg-white text-accent rounded-2xl text-[11px] font-bold shadow-lg hover:scale-[1.02] transition-all active:scale-95 uppercase tracking-widest">
              Manage Payouts
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
