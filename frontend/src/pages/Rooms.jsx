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

        <div className="flex items-center space-x-2 pt-2 border-t border-border mt-2">
          <button className="flex-1 py-2 bg-primary text-white text-xs font-bold rounded-lg hover:bg-primary-dark transition-all">
            Book Now
          </button>
          <button className="p-2 border border-border text-text-secondary rounded-lg hover:bg-background transition-all">
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
  
  const floors = ['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4'];
  const rooms = [
    { number: '101', floor: 1, type: 'Single', price: 80, status: 'Available', occupancy: '1/1' },
    { number: '102', floor: 1, type: 'Double', price: 120, status: 'Occupied', occupancy: '2/2' },
    { number: '103', floor: 1, type: 'Family', price: 200, status: 'Cleaning', occupancy: '0/4' },
    { number: '104', floor: 1, type: 'Single Plus', price: 100, status: 'Available', occupancy: '0/1' },
    { number: '105', floor: 1, type: 'Double', price: 120, status: 'Maintenance', occupancy: '0/2' },
    { number: '106', floor: 1, type: 'Suite', price: 350, status: 'Occupied', occupancy: '2/2' },
    { number: '107', floor: 1, type: 'Double', price: 120, status: 'Available', occupancy: '0/2' },
    { number: '108', floor: 1, type: 'Single', price: 80, status: 'Occupied', occupancy: '1/1' },
  ];

  const stats = [
    { label: 'Total', value: 48, icon: Hotel, colorClass: 'bg-primary/10 text-primary' },
    { label: 'Available', value: 24, icon: CheckCircle, colorClass: 'bg-success/10 text-success' },
    { label: 'Occupied', value: 18, icon: UserCheck, colorClass: 'bg-danger/10 text-danger' },
    { label: 'Cleaning', value: 4, icon: Sparkles, colorClass: 'bg-warning/10 text-warning' },
    { label: 'Maintenance', value: 2, icon: Wrench, colorClass: 'bg-purple/10 text-purple' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Room Control Center" 
        subtitle="Manage rooms, availability and cleaning status across 4 floors."
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
          <div className="flex p-1 bg-background rounded-xl w-fit">
            {floors.map((floor) => (
              <button
                key={floor}
                onClick={() => setActiveFloor(floor)}
                className={cn(
                  "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                  activeFloor === floor 
                    ? "bg-surface text-primary" 
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
                placeholder="Search room #" 
                className="pl-10 pr-4 py-2 bg-background border border-transparent focus:border-accent/20 rounded-lg text-sm outline-none w-full sm:w-48"
              />
            </div>
            <button className="p-2 border border-border rounded-lg hover:bg-background transition-all text-text-secondary">
              <Filter className="w-4 h-4" />
            </button>
            <div className="flex p-1 bg-background rounded-lg border border-border">
              <button 
                onClick={() => setViewMode('grid')}
                className={cn("p-1.5 rounded-md transition-all", viewMode === 'grid' ? "bg-surface border border-border text-primary" : "text-text-secondary")}
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setViewMode('list')}
                className={cn("p-1.5 rounded-md transition-all", viewMode === 'list' ? "bg-surface border border-border text-primary" : "text-text-secondary")}
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid View */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {rooms.map((room) => (
            <RoomCard key={room.number} room={room} />
          ))}
        </div>
      ) : (
        <div className="bg-surface rounded-card border border-border overflow-hidden">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-background">
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Room</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Type</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Floor</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Price</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {rooms.map((room) => (
                <tr key={room.number} className="hover:bg-background/50 transition-colors">
                  <td className="px-6 py-4 text-sm font-bold text-primary">Room {room.number}</td>
                  <td className="px-6 py-4 text-sm font-medium text-text-primary">{room.type}</td>
                  <td className="px-6 py-4 text-sm text-text-secondary">{room.floor}</td>
                  <td className="px-6 py-4 text-sm font-bold text-text-primary">${room.price}</td>
                  <td className="px-6 py-4 text-sm">
                    <StatusBadge status={room.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-accent text-sm font-bold hover:underline">Edit</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
