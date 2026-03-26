import React from 'react';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  TrendingUp, 
  ChevronRight,
  Calendar,
  Layers,
  BarChart4
} from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Reports = () => {
  const reportTypes = [
    { title: 'Revenue & Financials', desc: 'Daily earnings, taxes and profit margins', icon: TrendingUp, color: 'bg-success/10 text-success' },
    { title: 'Occupancy Analysis', desc: 'Room utilization and booking cycles', icon: Layers, color: 'bg-accent/10 text-accent' },
    { title: 'Guest Insights', desc: 'Demographics and loyalty statistics', icon: BarChart4, color: 'bg-purple/10 text-purple' },
    { title: 'Operational Log', desc: 'Staff activity and audit trails', icon: FileText, color: 'bg-warning/10 text-warning' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Reports Center" 
        subtitle="Generate and export business intelligence reports for strategic planning."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {reportTypes.map((report) => (
          <div key={report.title} className="bg-surface p-6 rounded-card border border-border transition-all cursor-pointer group">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-6", report.color)}>
              <report.icon className="w-6 h-6" />
            </div>
            <h4 className="font-bold text-text-primary group-hover:text-accent transition-colors">{report.title}</h4>
            <p className="text-xs text-text-secondary mt-1">{report.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-surface rounded-card border border-border">
        <div className="p-6 border-b border-border flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <h3 className="font-bold text-lg text-text-primary">Recent Reports</h3>
            <div className="flex bg-background p-1 rounded-lg border border-border">
              <button className="px-3 py-1 text-[10px] font-bold bg-surface border border-border rounded-md uppercase">All</button>
              <button className="px-3 py-1 text-[10px] font-bold text-text-secondary hover:text-primary uppercase">Scheduled</button>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input type="text" placeholder="Search report name..." className="pl-9 pr-4 py-2 bg-background border-none rounded-lg text-xs outline-none w-48" />
            </div>
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-lg text-xs font-bold hover:bg-primary-dark transition-all">
              Generate Custom
            </button>
          </div>
        </div>

        <div className="p-6 space-y-4">
          {[
            { name: 'Monthly Financial Summary - Feb 2024', date: '01 Mar 2024', type: 'Finance', size: '2.4 MB' },
            { name: 'Weekend Occupancy Breakdown', date: '25 Feb 2024', type: 'Operations', size: '1.1 MB' },
            { name: 'Annual Tax Compliance Report', date: '15 Feb 2024', type: 'Legal', size: '4.8 MB' },
            { name: 'Guest Feedback & Reviews Analysis', date: '05 Feb 2024', type: 'Service', size: '840 KB' },
          ].map((r) => (
            <div key={r.name} className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-background/50 transition-all group">
              <div className="flex items-center">
                <div className="p-2.5 bg-background rounded-lg text-text-secondary mr-4 group-hover:bg-surface transition-colors">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-text-primary">{r.name}</h5>
                  <div className="flex items-center space-x-3 mt-1 text-[10px] font-bold text-text-secondary uppercase">
                    <span>{r.type}</span>
                    <span>•</span>
                    <span>{r.date}</span>
                    <span>•</span>
                    <span>{r.size}</span>
                  </div>
                </div>
              </div>
              <button className="p-2.5 hover:bg-primary-soft text-text-secondary hover:text-accent rounded-lg transition-all">
                <Download className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper for conditional class merging (already defined earlier, re-adding here for completeness if needed)
function cn(...inputs) {
  return inputs.filter(Boolean).join(' ');
}

export default Reports;
