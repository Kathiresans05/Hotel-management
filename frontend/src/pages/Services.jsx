import React, { useState } from 'react';
import { 
  Archive, 
  Wrench, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  AlertCircle,
  Search,
  Plus,
  Filter,
  MoreVertical,
  LayoutGrid,
  List,
  Flame,
  Droplets,
  Zap,
  Hammer,
  Bell
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

const housekeepingData = [
  { id: '101', type: 'Single', status: 'Dirty', assignedTo: 'John Smith', lastCleaned: '4 hours ago' },
  { id: '102', type: 'Double', status: 'In Progress', assignedTo: 'Sarah Lee', lastCleaned: '2 hours ago' },
  { id: '103', type: 'Suite', status: 'Clean', assignedTo: '-', lastCleaned: '30 mins ago' },
  { id: '104', type: 'Double', status: 'Cleaning Needed', assignedTo: '-', lastCleaned: 'Yesterday' },
  { id: '201', type: 'Family', status: 'Clean', assignedTo: '-', lastCleaned: '1 hour ago' },
  { id: '202', type: 'Single', status: 'Dirty', assignedTo: 'Mike Ross', lastCleaned: '5 hours ago' },
];

const maintenanceTickets = [
  { id: 'MT-552', room: '104', issue: 'AC leakage', priority: 'High', status: 'Open', created: '2 hours ago', icon: Droplets, color: 'red' },
  { id: 'MT-553', room: '201', issue: 'Broken window latch', priority: 'Medium', status: 'In Progress', created: '5 hours ago', icon: Hammer, color: 'orange' },
  { id: 'MT-554', room: '305', issue: 'WiFi signal weak', priority: 'Low', status: 'Resolved', created: '1 day ago', icon: Zap, color: 'blue' },
  { id: 'MT-555', room: '102', issue: 'Light bulb replacement', priority: 'Low', status: 'Open', created: '3 hours ago', icon: Zap, color: 'yellow' },
];

const Services = () => {
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('housekeeping');
  const [viewMode, setViewMode] = useState('grid');

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Housekeeping & Maintenance" 
        subtitle="Manage room cleanliness, repair tickets, and facility services."
        actions={
          <div className="flex items-center gap-3">
            <button className={cn(
              "flex items-center px-4 py-2 border rounded-2xl text-sm font-bold transition-all",
              isDarkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-sm"
            )}>
              <LayoutGrid className="w-4 h-4 mr-2" />
              Resource Planner
            </button>
            <button className="flex items-center px-4 py-2 bg-accent text-white rounded-2xl text-sm font-bold shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all active:scale-95">
              <Plus className="w-4 h-4 mr-2" />
              New Ticket
            </button>
          </div>
        }
      />

      {/* Tabs Layout */}
      <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-1">
        <div className="flex items-center gap-8 relative">
          {[
            { id: 'housekeeping', label: 'Housekeeping', icon: Archive },
            { id: 'maintenance', label: 'Maintenance Tickets', icon: Wrench },
            { id: 'amenities', label: 'Room Service', icon: Bell },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex items-center gap-2 pb-3 text-sm font-bold transition-all relative",
                activeTab === tab.id
                  ? "text-accent"
                  : isDarkMode ? "text-slate-500 hover:text-slate-300" : "text-slate-400 hover:text-slate-600"
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-0 left-0 w-full h-1 bg-accent rounded-full shadow-[0_-4px_10px_rgba(249,115,22,0.4)]" />
              )}
            </button>
          ))}
        </div>

        <div className={cn(
          "flex p-1 rounded-xl border",
          isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200"
        )}>
          <button 
            onClick={() => setViewMode('grid')}
            className={cn(
              "p-1.5 rounded-lg transition-all",
              viewMode === 'grid' 
                ? (isDarkMode ? "bg-white/10 text-white shadow-lg" : "bg-white text-slate-900 shadow-sm") 
                : "text-slate-400 hover:text-accent"
            )}
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
          <button 
            onClick={() => setViewMode('list')}
            className={cn(
              "p-1.5 rounded-lg transition-all",
              viewMode === 'list' 
                ? (isDarkMode ? "bg-white/10 text-white shadow-lg" : "bg-white text-slate-900 shadow-sm") 
                : "text-slate-400 hover:text-accent"
            )}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {activeTab === 'housekeeping' && (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
            <div className={cn(
              "flex-1 flex items-center gap-3 px-4 py-2.5 rounded-2xl border w-full md:max-w-md",
              isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-slate-200"
            )}>
              <Search className="w-4 h-4 text-slate-400" />
              <input type="text" placeholder="Search rooms..." className="bg-transparent border-none outline-none text-sm text-slate-400 w-full" />
            </div>
            
            <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
              {['All', 'Dirty', 'In Progress', 'Clean'].map((filter) => (
                <button 
                  key={filter} 
                  className={cn(
                    "px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all",
                    filter === 'All' 
                      ? "bg-accent/10 border border-accent/20 text-accent" 
                      : isDarkMode ? "bg-white/5 border border-white/5 text-slate-400 hover:bg-white/10" : "bg-white border border-slate-100 text-slate-500 hover:border-slate-300"
                  )}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {housekeepingData.map((room) => (
              <div 
                key={room.id}
                className={cn(
                  "p-6 rounded-[32px] border transition-all hover:shadow-2xl hover:shadow-black/5 group cursor-pointer",
                  isDarkMode ? "bg-[#0F172A]/40 border-white/5" : "bg-white border-slate-100"
                )}
              >
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <span className="text-[10px] font-bold tracking-widest text-[#64748B] uppercase mb-1 block">{room.type} Room</span>
                    <h3 className={cn("text-2xl font-bold tracking-tight", isDarkMode ? "text-white" : "text-slate-900")}>
                      Room <span className="text-accent">{room.id}</span>
                    </h3>
                  </div>
                  <div className={cn(
                    "w-10 h-10 rounded-2xl flex items-center justify-center transition-transform group-hover:rotate-12",
                    room.status === 'Dirty' ? "bg-rose-500/10 text-rose-500" :
                    room.status === 'Clean' ? "bg-emerald-500/10 text-emerald-500" :
                    "bg-blue-500/10 text-blue-500"
                  )}>
                    {room.status === 'Clean' ? <CheckCircle2 className="w-6 h-6" /> : <Clock className="w-6 h-6 text-orange-500 animate-spin-slow" />}
                  </div>
                </div>

                <div className="space-y-4 mb-6 pt-4 border-t border-white/5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500 uppercase tracking-widest text-[9px]">Status</span>
                    <span className={cn(
                      "px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                      room.status === 'Dirty' ? "bg-rose-500/20 text-rose-400" :
                      room.status === 'Clean' ? "bg-emerald-500/20 text-emerald-400" :
                      "bg-blue-500/20 text-blue-400"
                    )}>{room.status}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500 uppercase tracking-widest text-[9px]">Assigned</span>
                    <span className={cn("font-bold", isDarkMode ? "text-white/70" : "text-slate-600")}>{room.assignedTo}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-500 uppercase tracking-widest text-[9px]">Last Updated</span>
                    <span className={cn("font-bold flex items-center gap-1.5", isDarkMode ? "text-white/40" : "text-slate-400")}>
                      <Clock size={12} /> {room.lastCleaned}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button className="flex-1 py-3 bg-accent/10 border border-accent/20 rounded-2xl text-[10px] font-bold text-accent uppercase tracking-widest hover:bg-accent hover:text-white transition-all shadow-lg shadow-accent/5">
                    Update Progress
                  </button>
                  <button className={cn(
                    "p-3 rounded-2xl border transition-colors",
                    isDarkMode ? "bg-white/5 border-white/5 hover:bg-white/10" : "bg-slate-50 border-slate-100 hover:bg-slate-100"
                  )}>
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'maintenance' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-4">
            {maintenanceTickets.map((ticket) => (
              <div 
                key={ticket.id}
                className={cn(
                  "p-5 rounded-[24px] border transition-all group flex gap-5",
                  isDarkMode ? "bg-[#0F172A]/40 border-white/5" : "bg-white border-slate-100",
                  "hover:shadow-xl hover:shadow-black/5"
                )}
              >
                <div className={cn(
                  "w-16 h-16 rounded-3xl flex flex-col items-center justify-center shrink-0 shadow-lg",
                  isDarkMode ? "bg-white/5 text-white" : "bg-slate-50 text-slate-900"
                )}>
                  <span className="text-[10px] font-bold text-slate-400 mb-1">ROOM</span>
                  <span className="text-xl font-bold tracking-tighter">{ticket.room}</span>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "p-1.5 rounded-lg",
                        ticket.color === 'red' ? "bg-rose-500/20 text-rose-500" :
                        ticket.color === 'orange' ? "bg-orange-500/20 text-orange-500" :
                        "bg-blue-500/20 text-blue-500"
                      )}>
                        <ticket.icon size={16} />
                      </div>
                      <h4 className={cn("font-bold text-base", isDarkMode ? "text-white" : "text-slate-900")}>{ticket.issue}</h4>
                      <span className={cn(
                        "px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-widest",
                        ticket.priority === 'High' ? "bg-rose-500 text-white" : "bg-slate-500/10 text-slate-500"
                      )}>{ticket.priority} Priority</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 flex items-center gap-1.5">
                      <Clock size={12} /> {ticket.created}
                    </span>
                  </div>
                  
                  <p className="text-sm text-slate-500 mb-4 font-medium opacity-80">
                    Maintenance ID: <span className="text-accent">{ticket.id}</span> • Assigned to: <span className="text-slate-400">General Maintenance Dept</span>
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-2 h-2 rounded-full",
                        ticket.status === 'Resolved' ? "bg-emerald-500" : "bg-orange-500 animate-pulse"
                      )} />
                      <span className={cn("text-xs font-bold uppercase tracking-widest", isDarkMode ? "text-white/70" : "text-slate-600")}>{ticket.status}</span>
                    </div>
                    <div className="h-4 w-[1px] bg-white/10" />
                    <button className="text-xs font-bold text-accent hover:underline uppercase tracking-widest">Update status</button>
                    <button className="text-xs font-bold text-slate-400 hover:text-white uppercase tracking-widest">Assign task</button>
                  </div>
                </div>

                <div className="flex flex-col justify-center transition-all opacity-0 group-hover:opacity-100">
                  <button className={cn(
                    "p-2 rounded-xl transition-colors",
                    isDarkMode ? "hover:bg-white/5 text-slate-400" : "hover:bg-slate-50 text-slate-500"
                  )}>
                    <MoreVertical size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className={cn(
              "p-6 rounded-[28px] border",
              isDarkMode ? "bg-accent/10 border-accent/20" : "bg-accent/[0.03] border-accent/10"
            )}>
              <h4 className="font-bold text-sm text-accent mb-4 uppercase tracking-[0.2em] flex items-center gap-2">
                <Flame size={14} /> Critical Stats
              </h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Open Tickets</span>
                  <span className="text-xl font-bold text-white">12</span>
                </div>
                <div className="flex justify-between items-center px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Avg Fix Time</span>
                  <span className="text-xl font-bold text-white">4.2<span className="text-sm font-normal opacity-50 ml-1">h</span></span>
                </div>
                <div className="flex justify-between items-center px-4 py-3 bg-white/5 rounded-2xl border border-white/5">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Efficiency</span>
                  <span className="text-xl font-bold text-accent">94%</span>
                </div>
              </div>
            </div>

            <div className={cn(
              "p-6 rounded-[28px] border",
              isDarkMode ? "bg-[#0F172A]/40 border-white/5" : "bg-white border-slate-100"
            )}>
              <h4 className={cn("font-bold text-sm mb-4 uppercase tracking-widest", isDarkMode ? "text-white" : "text-slate-900")}>Quick Options</h4>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-400 hover:text-accent transition-all">Report utility failure</button>
                <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-400 hover:text-accent transition-all">Manage spare parts</button>
                <button className="w-full text-left px-4 py-2 text-xs font-bold text-slate-400 hover:text-accent transition-all">Schedule inspection</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Services;
