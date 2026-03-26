import React from 'react';
import Modal from '../Modal';
import { Hash, Home, DollarSign, Users, Info, Wind, Snowflake } from 'lucide-react';
import { cn } from '../../utils/cn';

const AddRoomModal = ({ isOpen, onClose }) => {
  const [category, setCategory] = React.useState('AC');

  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Room" maxWidth="max-w-xl">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-2 gap-4">
            {/* Room Number */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-text-secondary/70 uppercase tracking-[0.15em] ml-1">Room Number</label>
              <div className="relative group">
                <Hash className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors duration-300" />
                <input 
                  type="text" 
                  placeholder="e.g. 101" 
                  className="w-full pl-11 pr-4 py-3.5 bg-background border border-border rounded-xl focus:border-accent/40 focus:ring-4 focus:ring-accent/10 transition-all outline-none text-sm font-medium"
                />
              </div>
            </div>

            {/* Room Type */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-text-secondary/70 uppercase tracking-[0.15em] ml-1">Room Type</label>
              <div className="relative">
                <select className="w-full px-4 py-3.5 bg-background border border-border rounded-xl text-sm outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent/10 transition-all font-medium cursor-pointer appearance-none">
                  <option>Single</option>
                  <option>Double</option>
                  <option>Family</option>
                  <option>Suite</option>
                  <option>Single Plus</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-text-secondary">
                  <Home className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Price */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-text-secondary/70 uppercase tracking-[0.15em] ml-1">Price per Night</label>
              <div className="relative group">
                <DollarSign className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors duration-300" />
                <input 
                  type="number" 
                  placeholder="0.00" 
                  className="w-full pl-11 pr-4 py-3.5 bg-background border border-border rounded-xl focus:border-accent/40 focus:ring-4 focus:ring-accent/10 transition-all outline-none text-sm font-medium"
                />
              </div>
            </div>

            {/* Max Occupancy */}
            <div className="space-y-3">
              <label className="text-xs font-bold text-text-secondary/70 uppercase tracking-[0.15em] ml-1">Max Occupancy</label>
              <div className="relative group">
                <Users className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors duration-300" />
                <input 
                  type="text" 
                  placeholder="e.g. 2 Adults" 
                  className="w-full pl-11 pr-4 py-3.5 bg-background border border-border rounded-xl focus:border-accent/40 focus:ring-4 focus:ring-accent/10 transition-all outline-none text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* Room Category (A/C vs Non-A/C) */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-text-secondary/70 uppercase tracking-[0.15em] ml-1">Room Category</label>
            <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'AC', label: 'A/C Room', icon: Snowflake },
                { id: 'NON-AC', label: 'Non A/C', icon: Wind }
              ].map((item) => (
                <label key={item.id} className="cursor-pointer group">
                  <input 
                    type="radio" 
                    name="category" 
                    value={item.id} 
                    className="hidden peer" 
                    checked={category === item.id}
                    onChange={() => setCategory(item.id)}
                  />
                  <div className="flex items-center justify-center space-x-3 py-3 px-4 border border-border bg-background/50 rounded-2xl text-text-secondary peer-checked:bg-accent peer-checked:text-white peer-checked:border-accent hover:border-accent/30 transition-all duration-300 shadow-sm relative overflow-hidden">
                    <item.icon className={cn("w-4 h-4 transition-transform duration-300 group-hover:scale-110", category === item.id ? "text-white" : "text-text-secondary/60")} />
                    <span className="text-sm font-bold tracking-tight">{item.label}</span>
                    {category === item.id && (
                      <div className="absolute top-0 right-0 w-8 h-8 bg-white/10 rounded-bl-full animate-in fade-in duration-500" />
                    )}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Floor */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-text-secondary/70 uppercase tracking-[0.15em] ml-1">Floor Assignment</label>
            <div className="grid grid-cols-4 gap-3">
              {['Floor 1', 'Floor 2', 'Floor 3', 'Floor 4'].map((floor) => (
                <label key={floor} className="cursor-pointer">
                  <input type="radio" name="floor" value={floor} className="hidden peer" defaultChecked={floor === 'Floor 1'} />
                  <div className="py-2.5 text-center border border-border bg-background/50 rounded-xl text-xs font-bold text-text-secondary peer-checked:bg-accent peer-checked:text-white peer-checked:border-accent hover:border-accent/30 transition-all duration-300 shadow-sm">
                    {floor}
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Amenities/Notes */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-text-secondary/70 uppercase tracking-[0.15em] ml-1">Room Features & Description</label>
            <div className="relative group">
              <Info className="w-4 h-4 absolute left-4 top-4 text-text-secondary group-focus-within:text-accent transition-colors duration-300" />
              <textarea 
                placeholder="e.g. Ocean view, Balcony, Mini-fridge..." 
                rows="3"
                className="w-full pl-11 pr-4 py-3.5 bg-background border border-border rounded-xl focus:border-accent/40 focus:ring-4 focus:ring-accent/10 transition-all outline-none text-sm font-medium resize-none"
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end space-x-4 pt-6 border-t border-border mt-8">
          <button 
            type="button"
            onClick={onClose}
            className="px-6 py-3 text-sm font-bold text-text-secondary hover:text-text-primary transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="px-10 py-3.5 bg-accent text-white text-sm font-bold rounded-2xl shadow-lg shadow-accent/20 hover:bg-accent-hover hover:shadow-accent/40 transition-all duration-300 transform active:scale-[0.98]"
          >
            Create Room
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddRoomModal;
