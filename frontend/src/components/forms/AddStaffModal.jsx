import React, { useState } from 'react';
import Modal from '../Modal';
import { User, Mail, Phone, Shield, Briefcase, Lock } from 'lucide-react';

const AddStaffModal = ({ isOpen, onClose, onAdd }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'Receptionist',
    shift: 'Day',
    password: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    setFormData({ name: '', email: '', phone: '', role: 'Receptionist', shift: 'Day', password: '' });
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Register New Employee" maxWidth="max-w-xl">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-6">
          {/* Basic Info */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Full Name</label>
            <div className="relative group">
              <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                placeholder="e.g. Alina Becker" 
                className="w-full pl-11 pr-4 py-3 bg-background/30 border border-border rounded-xl focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Email Address</label>
              <div className="relative group">
                <Mail className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
                <input 
                  type="email" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="alina.b@hostel.com" 
                  className="w-full pl-11 pr-4 py-3 bg-background/30 border border-border rounded-xl focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Phone Number</label>
              <div className="relative group">
                <Phone className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
                <input 
                  type="tel" 
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  placeholder="+1 555-000-0000" 
                  className="w-full pl-11 pr-4 py-3 bg-background/30 border border-border rounded-xl focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Role & Department */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Department</label>
              <div className="relative group">
                <Briefcase className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
                <select 
                  value={formData.shift}
                  onChange={(e) => setFormData({...formData, shift: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 bg-background/30 border border-border rounded-xl text-sm outline-none focus:border-accent/40 transition-all appearance-none"
                >
                  <option>Day</option>
                  <option>Night</option>
                  <option>Weekend</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">System Role</label>
              <div className="relative group">
                <Shield className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
                <select 
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                  className="w-full pl-11 pr-4 py-3 bg-background/30 border border-border rounded-xl text-sm outline-none focus:border-accent/40 transition-all appearance-none"
                >
                  <option>Receptionist</option>
                  <option>Sub Admin</option>
                  <option>Super Admin</option>
                </select>
              </div>
            </div>
          </div>

          {/* Password for system access */}
          <div className="space-y-2 p-4 bg-background border border-border rounded-2xl">
            <div className="flex items-center mb-4">
              <Lock className="w-4 h-4 text-accent mr-2" />
              <p className="text-xs font-bold text-text-primary">System Access Credentials</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              <input 
                type="password" 
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                placeholder="Initial Password" 
                className="w-full px-4 py-2.5 bg-surface border border-border rounded-xl focus:border-accent/40 outline-none text-sm"
                required
              />
              <p className="text-[10px] text-text-secondary italic">User will be prompted to change password on first login.</p>
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
            Create Staff Account
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddStaffModal;
