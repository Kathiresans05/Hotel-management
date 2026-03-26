import React from 'react';
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownRight, 
  CreditCard, 
  DollarSign, 
  PieChart as PieChartIcon, 
  Download,
  Search,
  MoreVertical,
  CheckCircle2,
  Clock,
  ExternalLink,
  Plus,
  FileText,
  TrendingUp
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import KPIStatCard from '../components/KPIStatCard';
import { cn } from '../utils/cn';

const Finance = () => {
  const accountStats = [
    { title: 'Net Balance', value: '$42,350.00', trend: '+8.4%', trendType: 'up', icon: Wallet, colorClass: 'bg-accent/10 text-accent' },
    { title: 'Total Revenue', value: '$128,400.00', trend: '+12.5%', trendType: 'up', icon: DollarSign, colorClass: 'bg-success/10 text-success' },
    { title: 'Total Expenses', value: '$86,050.00', trend: '+2.1%', trendType: 'down', icon: PieChartIcon, colorClass: 'bg-danger/10 text-danger' },
    { title: 'Pending Payments', value: '$3,120.00', trend: '-15%', trendType: 'up', icon: Clock, colorClass: 'bg-warning/10 text-warning' },
  ];

  const transactions = [
    { id: 'TX-9981', date: '25 Mar 2024', customer: 'Sarah Wilson', room: '204', amount: '$150.00', method: 'UPI', status: 'Completed' },
    { id: 'TX-9982', date: '25 Mar 2024', customer: 'John Smith', room: '101', amount: '$120.00', method: 'Cash', status: 'Completed' },
    { id: 'TX-9983', date: '24 Mar 2024', customer: 'Alexandre Mitchell', room: '305', amount: '$1,160.00', method: 'Card', status: 'Completed' },
    { id: 'TX-9984', date: '24 Mar 2024', customer: 'Emma Davis', room: '201', amount: '$455.00', method: 'Card', status: 'Pending' },
    { id: 'TX-9985', date: '23 Mar 2024', customer: 'David Chen', room: '102', amount: '$240.00', method: 'UPI', status: 'Refunded' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Finance & Accounting" 
        subtitle="Track revenue movement, payment methods and transaction history."
        actions={
          <div className="flex items-center space-x-3">
            <button className="flex items-center px-4 py-2 border border-border bg-surface rounded-button text-sm font-medium hover:bg-background transition-all">
              <Download className="w-4 h-4 mr-2" />
              Statement
            </button>
            <button className="flex items-center px-4 py-2 bg-success text-white rounded-button text-sm font-medium hover:bg-success-dark transition-all">
              <Plus className="w-4 h-4 mr-2" />
              Record Expense
            </button>
          </div>
        }
      />

      {/* Financial Summaries */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {accountStats.map((stat, idx) => (
          <KPIStatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Transactions Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface rounded-card border border-border overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <div className="relative max-w-sm flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input 
                  type="text" 
                  placeholder="Filter transactions..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-background border-none rounded-lg text-sm outline-none"
                />
              </div>
              <div className="flex items-center space-x-2">
                <button className="px-3 py-1.5 bg-background rounded-lg text-[10px] font-bold text-text-secondary uppercase">All</button>
                <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-text-secondary uppercase hover:bg-background">Sales</button>
                <button className="px-3 py-1.5 rounded-lg text-[10px] font-bold text-text-secondary uppercase hover:bg-background">Refunds</button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-background">
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Transaction ID</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Details</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Amount</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-background/30 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-sm font-bold text-primary">{tx.id}</p>
                        <p className="text-[10px] text-text-secondary mt-0.5 uppercase tracking-widest">{tx.date}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center mr-3",
                            tx.method === 'Card' ? "bg-accent/10 text-accent" : 
                            tx.method === 'UPI' ? "bg-purple/10 text-purple" : "bg-warning/10 text-warning"
                          )}>
                            <CreditCard className="w-4 h-4" />
                          </div>
                          <div>
                            <p className="text-sm font-bold text-text-primary">{tx.customer}</p>
                            <p className="text-[10px] text-text-secondary">Room {tx.room} • {tx.method}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-bold text-text-primary">{tx.amount}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className={cn(
                            "w-2 h-2 rounded-full mr-2",
                            tx.status === 'Completed' ? "bg-success" : 
                            tx.status === 'Pending' ? "bg-warning" : "bg-danger"
                          )}></div>
                          <span className="text-xs font-bold text-text-secondary">{tx.status}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-background rounded-lg text-text-secondary">
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right: Payment Method Split */}
        <div className="space-y-6">
          <div className="bg-surface p-6 rounded-card border border-border">
            <h3 className="font-bold text-lg text-text-primary mb-6">Payment Spread</h3>
            <div className="space-y-6">
              {[
                { name: 'Card Payments', value: 65, color: 'bg-accent' },
                { name: 'UPI / Digital', value: 25, color: 'bg-purple' },
                { name: 'Cash', value: 10, color: 'bg-warning' },
              ].map((m) => (
                <div key={m.name}>
                  <div className="flex justify-between text-xs font-bold mb-2">
                    <span className="text-text-secondary uppercase">{m.name}</span>
                    <span className="text-text-primary">{m.value}%</span>
                  </div>
                  <div className="h-2 w-full bg-background rounded-full overflow-hidden">
                    <div className={cn("h-full rounded-full", m.color)} style={{ width: `${m.value}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-8 pt-6 border-t border-border">
              <button className="w-full py-3 bg-primary text-white text-xs font-bold rounded-xl hover:bg-primary-dark transition-all flex items-center justify-center">
                <FileText className="w-4 h-4 mr-2" />
                View Reconciliation Report
              </button>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-primary-dark p-6 rounded-card border border-white/10 text-white">
            <div className="flex items-center justify-between mb-8 opacity-60 italic text-xs">
              <span>Forecasted Revenue</span>
              <TrendingUp className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest opacity-60">Estimated for April</p>
              <h4 className="text-3xl font-bold mt-2">$145,200</h4>
              <p className="text-[10px] text-success font-bold mt-2 flex items-center">
                <ArrowUpRight className="w-3 h-3 mr-1" />
                +14% FROM PREVIOUS MONTH
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Finance;
