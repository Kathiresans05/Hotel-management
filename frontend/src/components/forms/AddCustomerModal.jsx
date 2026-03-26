import React from 'react';
import Modal from '../Modal';
import { User, Mail, Phone, MapPin, Shield } from 'lucide-react';

const AddCustomerModal = ({ isOpen, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register New Customer" maxWidth="max-w-xl">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Full Name</label>
            <div className="relative group">
              <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
              <input 
                type="text" 
                placeholder="e.g. John Doe" 
                className="w-full pl-11 pr-4 py-3 bg-background/30 border border-border rounded-xl focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Email */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Email Address</label>
              <div className="relative group">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
                <input 
                  type="email" 
                  placeholder="john@example.com" 
                  className="w-full pl-11 pr-4 py-3 bg-background/30 border border-border rounded-xl focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none text-sm"
                />
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Phone Number</label>
              <div className="relative group">
                <Phone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
                <input 
                  type="tel" 
                  placeholder="+1 (555) 000-0000" 
                  className="w-full pl-11 pr-4 py-3 bg-background/30 border border-border rounded-xl focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Address</label>
            <div className="relative group">
              <MapPin className="w-4 h-4 absolute left-4 top-3 text-text-secondary group-focus-within:text-accent transition-colors" />
              <textarea 
                placeholder="Enter full residential address" 
                rows="3"
                className="w-full pl-11 pr-4 py-3 bg-background/30 border border-border rounded-xl focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none text-sm resize-none"
              />
            </div>
          </div>

          {/* Identification */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">ID Type & Number</label>
            <div className="flex gap-3">
              <select className="px-4 py-3 bg-background/30 border border-border rounded-xl text-sm outline-none focus:border-accent/40">
                <option>Passport</option>
                <option>Driver License</option>
                <option>National ID</option>
              </select>
              <div className="relative flex-1 group">
                <Shield className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
                <input 
                  type="text" 
                  placeholder="ID Number" 
                  className="w-full pl-11 pr-4 py-3 bg-background/30 border border-border rounded-xl focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none text-sm"
                />
              </div>
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
            className="px-8 py-3 bg-primary text-white text-sm font-bold rounded-xl hover:bg-primary-dark transition-all transform active:scale-[0.98]"
          >
            Create Customer
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddCustomerModal;
