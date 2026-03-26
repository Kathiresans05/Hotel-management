import React, { useState } from 'react';
import { 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle2, 
  User, 
  Bed, 
  Receipt, 
  CreditCard,
  Plus
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const CheckIn = () => {
  const [step, setStep] = useState(1);
  
  const steps = [
    { id: 1, name: 'Select Room', icon: Bed },
    { id: 2, name: 'Customer Details', icon: User },
    { id: 3, name: 'Add Services', icon: Plus },
    { id: 4, name: 'Billing & Payment', icon: Receipt },
  ];

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      <PageHeader 
        title="Quick Check-In" 
        subtitle="Complete the guest registration and room assignment process."
      />

      {/* Progress Indicator */}
      <div className="mb-10">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute h-0.5 bg-border top-1/2 -translate-y-1/2 left-0 right-0 -z-10"></div>
          <div 
            className="absolute h-0.5 bg-accent top-1/2 -translate-y-1/2 left-0 transition-all duration-500 -z-10" 
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          ></div>

          {steps.map((s) => (
            <div key={s.id} className="flex flex-col items-center">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center border-4 border-background transition-all duration-300",
                step === s.id ? "bg-accent text-white scale-110" : 
                step > s.id ? "bg-success text-white" : "bg-surface text-text-secondary border-border"
              )}>
                {step > s.id ? <CheckCircle2 className="w-6 h-6" /> : <s.icon className="w-5 h-5" />}
              </div>
              <span className={cn(
                "mt-3 text-xs font-bold uppercase tracking-widest",
                step === s.id ? "text-accent" : "text-text-secondary"
              )}>
                {s.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Area */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface p-8 rounded-card border border-border">
            {step === 1 && (
              <div className="animate-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl font-bold text-text-primary mb-6">Select Available Room</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['101', '103', '107', '201', '205', '302'].map((num) => (
                    <div key={num} className="p-4 border-2 border-border rounded-xl hover:border-accent cursor-pointer transition-all group active:scale-95">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-text-primary">Room {num}</span>
                        <span className="text-xs font-bold text-success bg-success/10 px-2 py-0.5 rounded">AVAILABLE</span>
                      </div>
                      <p className="text-xs text-text-secondary mt-1">Single Deluxe • Floor {num.charAt(0)}</p>
                      <p className="text-sm font-bold text-accent mt-3">$120 <span className="text-[10px] text-text-secondary">/ night</span></p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in slide-in-from-right-4 duration-300 space-y-4">
                <h3 className="text-xl font-bold text-text-primary mb-6">Guest Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase">Full Name</label>
                    <input type="text" placeholder="e.g. John Doe" className="w-full px-4 py-2.5 bg-background border border-border rounded-input text-text-primary focus:border-accent/40 outline-none" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase">Phone Number</label>
                    <input type="text" placeholder="+1 (555) 000-0000" className="w-full px-4 py-2.5 bg-background border border-border rounded-input text-text-primary focus:border-accent/40 outline-none" />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-secondary uppercase">Email Address</label>
                  <input type="email" placeholder="john@example.com" className="w-full px-4 py-2.5 bg-background border border-border rounded-input text-text-primary focus:border-accent/40 outline-none" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase">ID Type</label>
                    <select className="w-full px-4 py-2.5 bg-background border border-border rounded-input text-text-primary focus:border-accent/40 outline-none">
                      <option>Passport</option>
                      <option>Driver's License</option>
                      <option>National ID</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text-secondary uppercase">ID Number</label>
                    <input type="text" placeholder="Enter ID number" className="w-full px-4 py-2.5 bg-background border border-border rounded-input text-text-primary focus:border-accent/40 outline-none" />
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl font-bold text-text-primary mb-6">Additional Services</h3>
                <div className="space-y-3">
                  {[
                    { name: 'Breakfast', price: 15, desc: 'Full English breakfast delivered to room' },
                    { name: 'Laundry', price: 20, desc: 'Wash and fold service' },
                    { name: 'Airport Shuttle', price: 40, desc: 'One-way premium transport' },
                    { name: 'Extra Bed', price: 30, desc: 'Rollaway bed for additional guest' }
                  ].map((service) => (
                    <div key={service.name} className="flex items-center justify-between p-4 border border-border rounded-xl hover:bg-background/50 transition-colors cursor-pointer group">
                      <div className="flex items-center">
                        <div className="w-6 h-6 rounded border-2 border-border mr-4 group-hover:border-accent"></div>
                        <div>
                          <p className="text-sm font-bold text-text-primary">{service.name}</p>
                          <p className="text-xs text-text-secondary">{service.desc}</p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-text-primary">+${service.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="animate-in slide-in-from-right-4 duration-300">
                <h3 className="text-xl font-bold text-text-primary mb-6">Payment Method</h3>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[
                    { id: 'cash', name: 'Cash', icon: Receipt },
                    { id: 'card', name: 'Card', icon: CreditCard },
                    { id: 'upi', name: 'UPI', icon: DollarSign }
                  ].map((method) => (
                    <div key={method.id} className="p-6 border-2 border-border rounded-xl flex flex-col items-center justify-center hover:border-accent cursor-pointer transition-all active:scale-95 bg-background/30">
                      <method.icon className="w-8 h-8 text-text-secondary mb-3" />
                      <span className="text-xs font-bold text-text-primary uppercase tracking-widest">{method.name}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-success-soft p-6 rounded-2xl border border-success/20">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-xs font-bold text-success uppercase">Total Amount Due</p>
                      <h2 className="text-3xl font-bold text-text-primary mt-1">$455.00</h2>
                    </div>
                    <button className="px-6 py-3 bg-success text-white rounded-xl font-bold hover:bg-success-dark transition-all">
                      Confirm Payment
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10 pt-6 border-t border-border">
              <button 
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
                className="flex items-center px-5 py-2.5 text-text-secondary font-bold text-sm hover:bg-background rounded-xl transition-all disabled:opacity-30"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </button>
              
              {step < 4 ? (
                <button 
                  onClick={() => setStep(step + 1)}
                  className="flex items-center px-6 py-2.5 bg-primary text-white font-bold text-sm rounded-xl hover:bg-primary-dark transition-all"
                >
                  Continue
                  <ChevronRight className="w-4 h-4 ml-2" />
                </button>
              ) : (
                <button className="flex items-center px-6 py-2.5 bg-accent text-white font-bold text-sm rounded-xl hover:bg-accent-hover transition-all">
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  Finalize Check-In
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Summary Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-surface rounded-card border border-border overflow-hidden sticky top-24">
            <div className="bg-primary p-6 text-white">
              <h4 className="font-bold text-sm uppercase tracking-widest opacity-60">Booking Summary</h4>
              <p className="text-xs mt-1">Ref: #NEW-CHECKIN</p>
            </div>
            <div className="p-6 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-bold text-text-secondary uppercase mb-3">
                  <span>Room Details</span>
                  <span className="text-accent cursor-pointer hover:underline">Edit</span>
                </div>
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center text-primary mr-3">
                    <Bed className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-text-primary">Room 101</p>
                    <p className="text-[10px] text-text-secondary">Deluxe Single • 3 Nights</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <div className="flex justify-between text-xs font-bold text-text-secondary uppercase mb-3">
                  <span>Bill Breakdown</span>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Room Charge</span>
                    <span className="font-medium text-text-primary">$360.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Services</span>
                    <span className="font-medium text-text-primary">$55.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">GST (10%)</span>
                    <span className="font-medium text-text-primary">$41.50</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-border mt-2">
                    <span className="font-bold text-text-primary">Grand Total</span>
                    <span className="font-bold text-accent text-lg">$456.50</span>
                  </div>
                </div>
              </div>
              
              <button className="w-full py-3 bg-background text-text-secondary rounded-xl text-xs font-bold hover:bg-border transition-all">
                Save Draft
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckIn;
