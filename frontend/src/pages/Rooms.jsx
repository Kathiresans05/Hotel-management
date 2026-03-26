import React, { useState } from 'react';
import { 
  Plus, 
  Filter, 
  Search, 
  LayoutGrid, 
  List,
  Info,
  ChevronDown,
  Bed,
  CheckCircle,
  UserCheck,
  Sparkles,
  Wrench,
  Hotel
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import KPIStatCard from '../components/KPIStatCard';
import StatusBadge from '../components/StatusBadge';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import AddRoomModal from '../components/forms/AddRoomModal';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const RoomCard = ({ room }) => {
  return (
    <div className="bg-surface rounded-card border border-border overflow-hidden transition-all duration-300 group cursor-pointer">
      <div className="p-5">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h4 className="text-xl font-bold text-text-primary tracking-tight">Room {room.number}</h4>
            <p className="text-xs font-medium text-text-secondary uppercase tracking-widest mt-1">Floor {room.floor} • {room.type}</p>
          </div>
          <StatusBadge status={room.status} />
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-background/50 p-2.5 rounded-xl border border-border/50">
            <p className="text-[10px] font-bold text-text-secondary uppercase">Price</p>
            <p className="text-sm font-bold text-text-primary mt-0.5">${room.price}<span className="text-[10px] text-text-secondary font-medium lowercase">/ night</span></p>
          </div>
          <div className="bg-background/50 p-2.5 rounded-xl border border-border/50">
            <p className="text-[10px] font-bold text-text-secondary uppercase">Occupancy</p>
            <p className="text-sm font-bold text-text-primary mt-0.5">{room.occupancy}</p>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-4 border-t border-border/50 mt-2">
          <button className="flex-1 py-2.5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white text-xs font-bold rounded-xl hover:bg-slate-800 transition-all">
            Book Now
          </button>
          <button className="p-2.5 border border-border text-text-secondary rounded-xl hover:bg-background transition-all flex items-center justify-center">
            <Info className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

const Rooms = () => {
  const [activeFloor, setActiveFloor] = useState('Floor 1');
  const [viewMode, setViewMode] = useState('grid');
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
  const floors = ['All', 'Floor 1', 'Floor 2', 'Floor 3', 'Floor 4'];
  const statuses = ['All', 'Available', 'Occupied', 'Cleaning', 'Maintenance'];
  
  const allRooms = [
    { number: '101', floor: 1, type: 'Single', price: 80, status: 'Available', occupancy: '1/1' },
    { number: '102', floor: 1, type: 'Double', price: 120, status: 'Occupied', occupancy: '2/2' },
    { number: '103', floor: 1, type: 'Family', price: 200, status: 'Cleaning', occupancy: '0/4' },
    { number: '104', floor: 1, type: 'Single Plus', price: 100, status: 'Available', occupancy: '0/1' },
    { number: '105', floor: 1, type: 'Double', price: 120, status: 'Maintenance', occupancy: '0/2' },
    { number: '106', floor: 1, type: 'Suite', price: 350, status: 'Occupied', occupancy: '2/2' },
    { number: '107', floor: 1, type: 'Double', price: 120, status: 'Available', occupancy: '0/2' },
    { number: '108', floor: 1, type: 'Single', price: 80, status: 'Occupied', occupancy: '1/1' },
    { number: '201', floor: 2, type: 'Suite', price: 350, status: 'Available', occupancy: '0/2' },
    { number: '202', floor: 2, type: 'Double', price: 120, status: 'Cleaning', occupancy: '0/2' },
    { number: '301', floor: 3, type: 'Single', price: 80, status: 'Maintenance', occupancy: '0/1' },
  ];

  // Filtering Logic
  const filteredRooms = allRooms.filter(room => {
    const matchesFloor = activeFloor === 'All' || `Floor ${room.floor}` === activeFloor;
    const matchesSearch = room.number.includes(searchQuery) || room.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' || room.status === statusFilter;
    return matchesFloor && matchesSearch && matchesStatus;
  });

  const stats = [
    { label: 'Total', value: allRooms.length, icon: Hotel, colorClass: 'bg-primary/10 text-primary' },
    { label: 'Available', value: allRooms.filter(r => r.status === 'Available').length, icon: CheckCircle, colorClass: 'bg-emerald-500/10 text-emerald-500' },
    { label: 'Occupied', value: allRooms.filter(r => r.status === 'Occupied').length, icon: UserCheck, colorClass: 'bg-rose-500/10 text-rose-500' },
    { label: 'Cleaning', value: allRooms.filter(r => r.status === 'Cleaning').length, icon: Sparkles, colorClass: 'bg-amber-500/10 text-amber-500' },
    { label: 'Maintenance', value: allRooms.filter(r => r.status === 'Maintenance').length, icon: Wrench, colorClass: 'bg-blue-500/10 text-blue-500' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Room Control Center" 
        subtitle="Manage rooms, availability and cleaning status across floors."
        actions={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-button text-sm font-medium hover:bg-primary-dark transition-all"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add New Room
          </button>
        }
      />

      {/* Summary Strip */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
        {stats.map((stat, idx) => (
          <KPIStatCard
            key={idx}
            title={stat.label}
            value={stat.value}
            icon={stat.icon}
            colorClass={stat.colorClass}
            compact={true}
          />
        ))}
      </div>

      {/* Floor Selection & Filters */}
      <div className="bg-surface p-4 rounded-card border border-border mb-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex p-1 bg-background rounded-xl w-fit overflow-x-auto">
            {floors.map((floor) => (
              <button
                key={floor}
                onClick={() => setActiveFloor(floor)}
                className={cn(
                  "px-6 py-2 rounded-lg text-sm font-bold transition-all whitespace-nowrap",
                  activeFloor === floor 
                    ? "bg-surface text-primary shadow-sm" 
                    : "text-text-secondary hover:text-primary"
                )}
              >
                {floor}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <div className="relative flex-1 sm:flex-none">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search room #" 
                className="pl-10 pr-4 py-2 bg-background border border-transparent focus:border-accent/20 rounded-lg text-sm outline-none w-full sm:w-48 transition-all"
              />
            </div>
            
            {/* Filter Dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={cn(
                  "p-2 border rounded-lg transition-all flex items-center justify-center",
                  isFilterOpen || statusFilter !== 'All' ? "bg-primary/10 border-primary text-primary" : "border-border hover:bg-background text-text-secondary"
                )}
              >
                <Filter className="w-4 h-4" />
              </button>
              
              {isFilterOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-surface border border-border rounded-xl shadow-xl z-50 p-2 animate-in fade-in slide-in-from-top-2">
                  <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest px-3 py-2">Filter by Status</p>
                  {statuses.map((status) => (
                    <button
                      key={status}
                      onClick={() => {
                        setStatusFilter(status);
                        setIsFilterOpen(false);
                      }}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors hover:bg-background",
                        statusFilter === status ? "text-primary bg-primary/5 font-bold" : "text-text-primary"
                      )}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="flex p-1 bg-background rounded-lg border border-border">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn("p-1.5 rounded-md transition-all", viewMode === 'grid' ? "bg-surface border border-border text-primary shadow-sm" : "text-text-secondary hover:text-primary")}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={cn("p-1.5 rounded-md transition-all", viewMode === 'list' ? "bg-surface border border-border text-primary shadow-sm" : "text-text-secondary hover:text-primary")}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main View */}
      {filteredRooms.length === 0 ? (
        <div className="py-20 text-center bg-surface rounded-card border border-border border-dashed">
            <Search className="w-10 h-10 mx-auto text-text-secondary mb-4 opacity-50" />
            <h3 className="text-lg font-bold text-text-primary mb-1">No rooms found</h3>
            <p className="text-text-secondary text-sm">Try adjusting your filters or search query.</p>
            <button 
              onClick={() => { setActiveFloor('All'); setSearchQuery(''); setStatusFilter('All'); }}
              className="mt-6 px-4 py-2 bg-background border border-border rounded-lg text-sm font-medium hover:bg-surface text-text-primary transition-all"
            >
              Clear all filters
            </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredRooms.map((room) => (
            <RoomCard key={room.number} room={room} />
          ))}
        </div>
      ) : (
        <div className="bg-surface rounded-card border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left whitespace-nowrap">
              <thead>
                <tr className="bg-background border-b border-border">
                  <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Room</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Type</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Floor</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Price</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[10px] font-bold text-text-secondary uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredRooms.map((room) => (
                  <tr key={room.number} className="hover:bg-background/80 transition-colors group">
                    <td className="px-6 py-5 text-sm font-bold text-primary">Room {room.number}</td>
                    <td className="px-6 py-5 text-sm font-bold text-text-primary">{room.type}</td>
                    <td className="px-6 py-5 text-sm font-medium text-text-secondary flex items-center gap-2">
                        <div className="w-6 h-6 rounded bg-background flex items-center justify-center border border-border font-bold text-xs">{room.floor}</div>
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-text-primary">${room.price}</td>
                    <td className="px-6 py-5">
                      <StatusBadge status={room.status} />
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="px-3 py-1.5 bg-background border border-border rounded-lg text-xs font-bold hover:bg-primary/5 hover:text-primary transition-colors hover:border-primary/20 opacity-0 group-hover:opacity-100">Manage</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      
      <AddRoomModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Rooms;
