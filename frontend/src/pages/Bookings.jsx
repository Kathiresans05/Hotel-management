import React, { useState } from 'react';
import { 
  CalendarCheck, 
  Search, 
  Filter, 
  Download, 
  Plus,
  MoreVertical,
  Eye,
  FileText,
  Trash2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import KPIStatCard from '../components/KPIStatCard';
import AddBookingModal from '../components/forms/AddBookingModal';

const Bookings = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const stats = [
    { title: 'Total Bookings', value: '1,284', trend: '+15%', trendType: 'up', icon: CalendarCheck, colorClass: 'bg-accent/10 text-accent' },
    { title: 'Active', value: '48', trend: '+2', trendType: 'up', icon: CalendarCheck, colorClass: 'bg-success/10 text-success' },
    { title: 'Cancelled', value: '12', trend: '-1.5%', trendType: 'down', icon: CalendarCheck, colorClass: 'bg-danger/10 text-danger' },
    { title: 'Pending Checkout', value: '8', trend: '0%', trendType: 'neutral', icon: CalendarCheck, colorClass: 'bg-warning/10 text-warning' },
  ];

  const bookings = [
    { id: 'BK-7214', guest: 'Emily Thompson', email: 'emily.t@example.com', room: '102', checkIn: '25 Mar', checkOut: '28 Mar', duration: '3 Nights', amount: '$360', status: 'Occupied', payment: 'Paid' },
    { id: 'BK-7215', guest: 'Robert Fox', email: 'r.fox@example.com', room: '305', checkIn: '26 Mar', checkOut: '31 Mar', duration: '5 Nights', amount: '$450', status: 'Pending', payment: 'Unpaid' },
    { id: 'BK-7216', guest: 'Jane Cooper', email: 'jane.c@example.com', room: '204', checkIn: '26 Mar', checkOut: '27 Mar', duration: '1 Night', amount: '$120', status: 'Available', payment: 'Paid' },
    { id: 'BK-7217', guest: 'Wade Warren', email: 'wade.w@example.com', room: '108', checkIn: '27 Mar', checkOut: '28 Mar', duration: '1 Night', amount: '$90', status: 'Maintenance', payment: 'Pending' },
    { id: 'BK-7218', guest: 'Guy Hawkins', email: 'guy.h@example.com', room: '201', checkIn: '27 Mar', checkOut: '30 Mar', duration: '3 Nights', amount: '$240', status: 'Cleaning', payment: 'Paid' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Booking Management" 
        subtitle="View and manage all guest reservations and check-in schedules."
        actions={
          <>
            <button className="flex items-center px-4 py-2 border border-border bg-surface rounded-button text-sm font-medium hover:bg-background transition-all">
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </button>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="flex items-center px-4 py-2 bg-primary text-white rounded-button text-sm font-medium hover:bg-primary-dark transition-all"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Booking
            </button>
          </>
        }
      />

      {/* Summary Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <KPIStatCard key={idx} {...stat} />
        ))}
      </div>

      {/* Filters & Table Card */}
      <div className="bg-surface rounded-card border border-border overflow-hidden">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-border bg-background/30 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input 
                type="text" 
                placeholder="Search guest or ID..." 
                className="pl-10 pr-4 py-2 bg-surface border border-border focus:border-accent/40 rounded-lg text-sm outline-none w-full sm:w-64"
              />
            </div>
            <button className="flex items-center px-3 py-2 bg-surface border border-border rounded-lg text-xs font-bold text-text-secondary hover:bg-background transition-all">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>

          <div className="flex items-center space-x-2 overflow-x-auto pb-1 md:pb-0">
            <span className="text-xs font-bold text-text-secondary uppercase whitespace-nowrap mr-2">Quick Filter:</span>
            {['All', 'Active', 'Pending', 'Cancelled'].map((f) => (
              <button 
                key={f}
                className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap transition-all ${f === 'All' ? 'bg-primary text-white' : 'bg-surface border border-border text-text-secondary hover:bg-background'}`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Main Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-background">
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Booking ID</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Room</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider text-center">Stay</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Amount</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {bookings.map((booking) => (
                <tr key={booking.id} className="hover:bg-background/50 transition-colors group">
                  <td className="px-6 py-4">
                    <span className="text-sm font-bold text-accent bg-accent/5 px-2 py-1 rounded">{booking.id}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-lg bg-background flex items-center justify-center text-primary font-bold text-xs uppercase mr-3 shrink-0">
                        {booking.guest.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-text-primary leading-none">{booking.guest}</p>
                        <p className="text-[10px] text-text-secondary mt-1">{booking.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-text-primary">{booking.room}</p>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-center">
                      <p className="text-sm font-medium text-text-primary">{booking.duration}</p>
                      <p className="text-[10px] text-text-secondary mt-0.5">{booking.checkIn} - {booking.checkOut}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-bold text-text-primary">{booking.amount}</p>
                      <p className={`text-[10px] font-bold uppercase mt-0.5 ${booking.payment === 'Paid' ? 'text-success' : 'text-danger'}`}>{booking.payment}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <StatusBadge status={booking.status} />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 hover:bg-background rounded-lg text-text-secondary" title="View Details">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-background rounded-lg text-text-secondary" title="Invoice">
                        <FileText className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 hover:bg-danger/10 rounded-lg text-danger" title="Cancel">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <button className="p-1.5 hover:bg-background rounded-lg text-text-secondary group-hover:hidden">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="px-6 py-4 border-t border-border flex items-center justify-between">
          <p className="text-sm text-text-secondary">Showing <span className="font-bold text-text-primary">1 to 5</span> of <span className="font-bold text-text-primary">248</span> bookings</p>
          <div className="flex items-center space-x-2">
            <button className="p-2 border border-border rounded-lg text-text-secondary disabled:opacity-50" disabled>
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center space-x-1">
              {[1, 2, 3, '...', 12].map((p, i) => (
                <button key={i} className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${p === 1 ? 'bg-primary text-white' : 'hover:bg-background text-text-secondary'}`}>
                  {p}
                </button>
              ))}
            </div>
            <button className="p-2 border border-border rounded-lg text-text-secondary">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      <AddBookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Bookings;
