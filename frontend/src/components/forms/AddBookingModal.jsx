import React from 'react';
import Modal from '../Modal';
import { User, Calendar, Home, CreditCard, Clock } from 'lucide-react';

const AddBookingModal = ({ isOpen, onClose }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Reservation" maxWidth="max-w-2xl">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Guest Selection */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Select Guest</label>
            <div className="relative group">
              <User className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
              <select className="w-full pl-11 pr-4 py-3 bg-background/30 border border-border rounded-xl text-sm outline-none focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all appearance-none cursor-pointer">
                <option>Search existing customer...</option>
                <option>Alexandre Mitchell</option>
                <option>Sarah Wilson</option>
                <option>David Chen</option>
                <option>+ Register New Guest</option>
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Check-In Date</label>
            <div className="relative group">
              <Calendar className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
              <input 
                type="date" 
                className="w-full pl-11 pr-4 py-3 bg-background/30 border border-border rounded-xl focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none text-sm"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Check-Out Date</label>
            <div className="relative group">
              <Calendar className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
              <input 
                type="date" 
                className="w-full pl-11 pr-4 py-3 bg-background/30 border border-border rounded-xl focus:border-accent/40 focus:ring-4 focus:ring-accent/5 transition-all outline-none text-sm"
              />
            </div>
          </div>

          {/* Room Selection */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Select Room</label>
            <div className="relative group">
              <Home className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
              <select className="w-full pl-11 pr-4 py-3 bg-background/30 border border-border rounded-xl text-sm outline-none focus:border-accent/40 transition-all appearance-none cursor-pointer">
                <option>Room 101 (Single)</option>
                <option>Room 104 (Single Plus)</option>
                <option>Room 205 (Double)</option>
                <option>Room 302 (Suite)</option>
              </select>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text-secondary uppercase tracking-widest">Payment Method</label>
            <div className="relative group">
              <CreditCard className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-accent transition-colors" />
              <select className="w-full pl-11 pr-4 py-3 bg-background/30 border border-border rounded-xl text-sm outline-none focus:border-accent/40 transition-all appearance-none cursor-pointer">
                <option>Credit / Debit Card</option>
                <option>Cash at Reception</option>
                <option>Bank Transfer</option>
                <option>UPI / QR Code</option>
              </select>
            </div>
          </div>

          {/* Total Summary Tooltip-like Area */}
          <div className="md:col-span-2 p-4 bg-background border border-border rounded-2xl flex items-center justify-between">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent mr-4">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-text-primary">Estimated Stay Duration</p>
                <p className="text-[10px] text-text-secondary uppercase tracking-wider">3 Nights • 2 Guests</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xs font-bold text-text-secondary">Estimated Total</p>
              <p className="text-lg font-bold text-primary font-poppins">$360.00</p>
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
            Confirm Booking
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default AddBookingModal;
