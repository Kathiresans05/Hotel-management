import React from 'react';
import { 
  Receipt, 
  Download, 
  Printer, 
  Send, 
  CreditCard, 
  DollarSign, 
  Smartphone,
  CheckCircle2,
  Clock,
  AlertCircle
} from 'lucide-react';
import PageHeader from '../components/PageHeader';

const Billing = () => {
  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Check-out & Billing" 
        subtitle="Review room charges, add services, and generate final invoices."
        actions={
          <>
            <button className="flex items-center px-4 py-2 border border-border bg-surface rounded-button text-sm font-medium hover:bg-background transition-all">
              <Printer className="w-4 h-4 mr-2" />
              Print
            </button>
            <button className="flex items-center px-4 py-2 bg-primary text-white rounded-button text-sm font-medium hover:bg-primary-dark transition-all">
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </button>
          </>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Invoice Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-surface rounded-card border border-border overflow-hidden">
            <div className="p-8 border-b border-border flex justify-between items-start">
              <div>
                <h3 className="text-2xl font-bold text-primary flex items-center">
                  <Receipt className="w-6 h-6 mr-3 text-accent" />
                  Invoice #INV-2024-8842
                </h3>
                <p className="text-sm text-text-secondary mt-1">Issued on Mar 25, 2024</p>
              </div>
              <div className="text-right">
                <span className="px-3 py-1 bg-success-soft text-success text-[10px] font-bold uppercase tracking-widest rounded-full border border-success/20">PAID</span>
              </div>
            </div>

            <div className="p-8">
              <div className="grid grid-cols-2 gap-8 mb-10">
                <div>
                  <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-4 italic">Billed To</h4>
                  <p className="font-bold text-text-primary text-lg">Alexandre Mitchell</p>
                  <p className="text-sm text-text-secondary mt-1">mitchell.alex@email.com</p>
                  <p className="text-sm text-text-secondary">+1 (555) 000-1234</p>
                </div>
                <div className="text-right">
                  <h4 className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-4 italic">Stay details</h4>
                  <p className="font-bold text-text-primary">Room 305 • Suite</p>
                  <p className="text-sm text-text-secondary mt-1">Mar 22 - Mar 25 (3 Nights)</p>
                </div>
              </div>

              <table className="w-full mb-10">
                <thead>
                  <tr className="border-b border-border">
                    <th className="py-4 text-left text-xs font-bold text-text-secondary uppercase">Description</th>
                    <th className="py-4 text-center text-xs font-bold text-text-secondary uppercase">Rate</th>
                    <th className="py-4 text-center text-xs font-bold text-text-secondary uppercase">Qty</th>
                    <th className="py-4 text-right text-xs font-bold text-text-secondary uppercase">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-5">
                      <p className="font-bold text-text-primary text-sm">Room Charge - Suite</p>
                      <p className="text-[10px] text-text-secondary mt-0.5">Premier ocean view suite</p>
                    </td>
                    <td className="py-5 text-center text-sm font-medium text-text-secondary">$350.00</td>
                    <td className="py-5 text-center text-sm font-medium text-text-secondary">3</td>
                    <td className="py-5 text-right text-sm font-bold text-text-primary">$1,050.00</td>
                  </tr>
                  <tr>
                    <td className="py-5">
                      <p className="font-bold text-text-primary text-sm">Breakfast Buffet</p>
                      <p className="text-[10px] text-text-secondary mt-0.5">Complimentary for 2 guests</p>
                    </td>
                    <td className="py-5 text-center text-sm font-medium text-text-secondary font-italic italic">Included</td>
                    <td className="py-5 text-center text-sm font-medium text-text-secondary">3</td>
                    <td className="py-5 text-right text-sm font-bold text-text-primary">$0.00</td>
                  </tr>
                  <tr>
                    <td className="py-5">
                      <p className="font-bold text-text-primary text-sm">Mini Bar</p>
                      <p className="text-[10px] text-text-secondary mt-0.5">Soda, Snacks, Bottled Water</p>
                    </td>
                    <td className="py-5 text-center text-sm font-medium text-text-secondary">$12.50</td>
                    <td className="py-5 text-center text-sm font-medium text-text-secondary">4</td>
                    <td className="py-5 text-right text-sm font-bold text-text-primary">$50.00</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-end pt-6 border-t border-border">
                <div className="w-64 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Subtotal</span>
                    <span className="font-bold text-text-primary">$1,100.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">GST (10%)</span>
                    <span className="font-bold text-text-primary">$110.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-text-secondary">Discount (LOYALTY)</span>
                    <span className="font-bold text-success">-$50.00</span>
                  </div>
                  <div className="flex justify-between pt-4 border-t-2 border-primary mt-2">
                    <span className="text-lg font-bold text-primary">Grand Total</span>
                    <span className="text-2xl font-bold text-accent">$1,160.00</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-background/50 p-6 flex items-center justify-between">
              <p className="text-xs text-text-secondary max-w-sm italic">
                Thank you for staying with HostelPro. Please allow 2-3 business days for electronic payments to reflect on your bank statement.
              </p>
              <button className="flex items-center px-4 py-2 bg-surface border border-border rounded-lg text-sm font-bold text-text-primary hover:bg-border transition-all">
                <Send className="w-4 h-4 mr-2" />
                Email Receipt
              </button>
            </div>
          </div>
        </div>

        {/* Right: Payment & Status */}
        <div className="space-y-6">
          <div className="bg-surface p-6 rounded-card border border-border">
            <h3 className="font-bold text-lg text-text-primary mb-6">Payment Status</h3>
            <div className="space-y-4">
              <div className="p-4 bg-success-soft border border-success/20 rounded-2xl flex items-center">
                <div className="w-10 h-10 bg-success text-white rounded-full flex items-center justify-center mr-4">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-xs font-bold text-success uppercase tracking-widest">Fully Paid</p>
                  <p className="text-sm font-bold text-text-primary mt-0.5">Visa Ending in **42</p>
                </div>
              </div>

              <div className="p-4 bg-background border border-border rounded-2xl">
                <p className="text-[10px] font-bold text-text-secondary uppercase tracking-widest mb-3">Transaction Details</p>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Auth ID</span>
                    <span className="font-bold text-text-primary">#AUTH-9812</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-text-secondary">Ref Number</span>
                    <span className="font-bold text-text-primary">#REF-4412-BB</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-surface p-6 rounded-card border border-border">
            <h3 className="font-bold text-lg text-text-primary mb-6">Quick Actions</h3>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-4 border border-border rounded-xl hover:bg-background transition-all group">
                <Printer className="w-5 h-5 text-text-secondary group-hover:text-accent mb-2" />
                <span className="text-[10px] font-bold text-text-primary uppercase">Print Info</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 border border-border rounded-xl hover:bg-background transition-all group">
                <Smartphone className="w-5 h-5 text-text-secondary group-hover:text-accent mb-2" />
                <span className="text-[10px] font-bold text-text-primary uppercase">Send SMS</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 border border-border rounded-xl hover:bg-background transition-all group col-span-2">
                <CreditCard className="w-5 h-5 text-text-secondary group-hover:text-accent mb-2" />
                <span className="text-[10px] font-bold text-text-primary uppercase">Add Extra Charges</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Billing;
