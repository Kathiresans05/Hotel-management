import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  MoreVertical, 
  Mail, 
  Phone, 
  Shield, 
  Clock,
  Calendar,
  ChevronRight
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import KPIStatCard from '../components/KPIStatCard';
import AddStaffModal from '../components/forms/AddStaffModal';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Staff = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [staffList, setStaffList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Fetch staff from backend
  useEffect(() => {
    const fetchStaff = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/users');
        const data = await response.json();
        
        // Map backend formatting to UI formatting
        const formattedData = data.map(user => ({
          id: user._id.slice(-5).toUpperCase(), // Simulating short ID for UI
          name: user.name,
          role: user.role === 'super_admin' ? 'Super Admin' : (user.role === 'sub_admin' ? 'Sub Admin' : 'Reception'),
          email: user.email,
          phone: user.phone || 'N/A',
          status: user.status === 'active' ? 'Active' : 'Inactive',
          shift: 'Day', // Default for now
          joined: new Date(user.createdAt || Date.now()).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
        }));
        
        setStaffList(formattedData);
      } catch (error) {
        console.error('Failed to fetch staff:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStaff();
  }, []);

  const handleAddStaff = async (newStaff) => {
    try {
      const response = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newStaff)
      });

      if (!response.ok) {
        const err = await response.json();
        alert(err.message || 'Failed to add employee');
        return;
      }

      const savedUser = await response.json();
      
      const staffMember = {
        id: savedUser._id.slice(-5).toUpperCase(),
        name: savedUser.name,
        role: savedUser.role === 'super_admin' ? 'Super Admin' : (savedUser.role === 'sub_admin' ? 'Sub Admin' : 'Reception'),
        email: savedUser.email,
        phone: savedUser.phone || 'N/A',
        status: 'Active',
        shift: newStaff.shift || 'Day',
        joined: new Date(savedUser.joined).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      };
      
      setStaffList(prev => [...prev, staffMember]);
    } catch (error) {
      console.error('Error adding staff:', error);
      alert('Error connecting to server');
    }
  };

  const stats = [
    { title: 'Total Staff', value: '12', trend: '+1', trendType: 'up', icon: Users, colorClass: 'bg-accent/10 text-accent' },
    { title: 'Receptionists', value: '4', trend: '0%', trendType: 'neutral', icon: Users, colorClass: 'bg-purple/10 text-purple' },
    { title: 'Active Today', value: '8', trend: '85%', trendType: 'neutral', icon: Clock, colorClass: 'bg-success/10 text-success' },
    { title: 'Open Shifts', value: '2', trend: '-1', trendType: 'up', icon: Calendar, colorClass: 'bg-warning/10 text-warning' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title="Staff Management" 
        subtitle="Manage employee roles, performance and access permissions."
        actions={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-button text-sm font-medium hover:bg-primary-dark transition-all"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Add Employee
          </button>
        }
      />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <KPIStatCard key={idx} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        <div className="xl:col-span-3">
          <div className="bg-surface rounded-card border border-border overflow-hidden">
            <div className="p-4 border-b border-border bg-background/30 flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input 
                  type="text" 
                  placeholder="Search staff by name or email..." 
                  className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-sm outline-none"
                />
              </div>
              <button className="flex items-center px-3 py-2 bg-surface border border-border rounded-lg text-xs font-bold text-text-secondary hover:bg-background ml-4">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-background">
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Employee</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Role</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Shift</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Joined</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">Status</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {isLoading ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-10 text-center text-text-secondary italic">
                        Loading employee data...
                      </td>
                    </tr>
                  ) : staffList.length === 0 ? (
                    <tr>
                      <td colSpan="6" className="px-6 py-10 text-center text-text-secondary italic">
                        No employees found. Add your first employee to get started!
                      </td>
                    </tr>
                  ) : (
                    staffList.map((person) => (
                      <tr key={person.id} className="hover:bg-background/30 transition-colors group cursor-pointer">
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <div className="w-9 h-9 rounded-lg bg-background flex items-center justify-center text-primary font-bold text-xs uppercase mr-3">
                              {person.name.charAt(0)}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-text-primary">{person.name}</p>
                              <p className="text-[10px] text-text-secondary">ID: {person.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 px-4">
                          <div className="flex items-center">
                            <Shield className="w-3 h-3 text-accent mr-2" />
                            <span className="text-sm font-medium text-text-primary">{person.role}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-text-secondary">{person.shift}</td>
                        <td className="px-6 py-4 text-sm text-text-secondary">{person.joined}</td>
                        <td className="px-6 py-4">
                          <StatusBadge status={person.status} />
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button className="p-2 hover:bg-background rounded-lg text-text-secondary">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="xl:col-span-1">
          <div className="bg-surface rounded-card border border-border p-6">
            <h3 className="font-bold text-lg text-text-primary mb-6">Security & Roles</h3>
            <div className="space-y-4">
              {[
                { name: 'Super Admin', count: 1, color: 'bg-accent' },
                { name: 'Sub Admin', count: 2, color: 'bg-purple' },
                { name: 'Receptionist', count: 8, color: 'bg-success' },
                { name: 'Housekeeping', count: 12, color: 'bg-warning' },
              ].map((role) => (
                <div key={role.name} className="flex items-center justify-between p-3 rounded-xl hover:bg-background transition-colors cursor-pointer group">
                  <div className="flex items-center">
                    <div className={cn("w-1.5 h-6 rounded-full mr-3", role.color)}></div>
                    <span className="text-sm font-medium text-text-primary">{role.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs font-bold text-text-secondary mr-2">{role.count}</span>
                    <ChevronRight className="w-4 h-4 text-text-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 bg-background text-text-secondary rounded-xl text-xs font-bold hover:bg-border transition-all">
              Manage Permissions
            </button>
          </div>
        </div>
      </div>
      <AddStaffModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onAdd={handleAddStaff}
      />
    </div>
  );
};

export default Staff;
