import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Bed, 
  CalendarCheck, 
  Users, 
  Users2, 
  CreditCard, 
  BarChart3, 
  ShieldCheck, 
  Settings, 
  LogOut,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Wallet,
  Bell,
  CheckCircle2,
  ListTodo,
  Fingerprint,
  Banknote,
  Receipt,
  Network,
  Database,
  Search,
  History,
  Activity
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { user, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();
  const role = user?.role || 'reception';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRolePath = (path) => {
    const prefix = role === 'super_admin' ? '/super-admin' : role === 'sub_admin' ? '/sub-admin' : '/reception';
    return `${prefix}/${path}`;
  };

  const menuItems = [
    { section: 'OVERVIEW', items: [
      { name: 'Dashboard', icon: LayoutDashboard, path: getRolePath('dashboard') },
      { name: 'Analytics', icon: BarChart3, path: '/super-admin/analytics' },
      { name: 'Notifications', icon: Bell, path: '/super-admin/notifications', badge: { text: '12', color: 'bg-accent/15 text-accent' } },
    ]},
    { section: 'OPERATIONS', items: [
      { name: 'Rooms', icon: Bed, path: getRolePath('rooms') },
      { name: 'Bookings', icon: CalendarCheck, path: getRolePath('bookings'), badge: { text: '8', color: 'bg-emerald-500/10 text-emerald-500' } },
      { name: 'Check-In / Out', icon: CheckCircle2, path: '/super-admin/check-in' },
      { name: 'Customers', icon: Users, path: getRolePath('customers') },
      { name: 'Services', icon: ListTodo, path: '/super-admin/services' },
    ]},
    { section: 'PEOPLE MANAGEMENT', items: [
      { name: 'Staff', icon: Users2, path: '/super-admin/staff' },
      { name: 'Roles & Permissions', icon: ShieldCheck, path: '/super-admin/roles' },
      { name: 'Attendance', icon: Fingerprint, path: '/super-admin/attendance' },
      { name: 'Payroll', icon: Banknote, path: '/super-admin/payroll' },
    ]},
    { section: 'FINANCE', items: [
      { name: 'Billing', icon: CreditCard, path: getRolePath('billing') },
      { name: 'Payments', icon: Wallet, path: '/super-admin/payments', badge: { text: 'Pending', color: 'bg-orange-500/10 text-orange-400' } },
      { name: 'Expenses', icon: Receipt, path: '/super-admin/expenses' },
      { name: 'Finance Overview', icon: BarChart3, path: '/super-admin/finance' },
      { name: 'Reports', icon: ClipboardList, path: '/super-admin/reports' },
      { name: 'GST / Tax', icon: Banknote, path: '/super-admin/tax' },
    ]},
    { section: 'SYSTEM', items: [
      { name: 'Settings', icon: Settings, path: getRolePath('settings') },
      { name: 'Branches', icon: Network, path: '/super-admin/branches' },
      { name: 'Integrations', icon: Activity, path: '/super-admin/integrations' },
      { name: 'Backup & Restore', icon: Database, path: '/super-admin/backup' },
      { name: 'Audit Logs', icon: History, path: '/super-admin/audit-logs' },
    ]},
  ];

  return (
    <aside 
      className={cn(
        "transition-all duration-300 z-50 flex flex-col group h-full",
        isOpen ? "w-64" : "w-20"
      )}
      style={{
        backgroundColor: '#111827',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '4px 0 24px rgba(0, 0, 0, 0.15)'
      }}
    >
      {/* Header / Logo */}
      <div className={cn(
        "h-20 flex items-center justify-between px-6 border-b shrink-0 transition-colors border-white/5"
      )}>
        <div className="flex items-center overflow-hidden">
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center shrink-0 shadow-lg shadow-accent/20">
            <span className="font-bold text-white text-lg">H</span>
          </div>
          {isOpen && (
            <span className={cn(
              "ml-3 font-poppins font-bold text-lg tracking-tight whitespace-nowrap transition-colors text-white"
            )}>
              HOSTEL<span className="text-accent underline decoration-accent/30 decoration-2 underline-offset-4">PRO</span>
            </span>
          )}
        </div>
        
        {isOpen && (
          <button 
            onClick={() => setIsOpen(false)}
            className={cn(
              "p-1.5 rounded-lg border transition-all bg-white/5 border-white/10 text-white/40 hover:text-white hover:bg-white/10"
            )}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto px-4 py-6 thin-scrollbar space-y-8 animate-in fade-in duration-500">
        {menuItems.map((section, idx) => (
          <div key={idx}>
            {isOpen && (
              <p className={cn(
                "px-3 mb-4 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors text-slate-500"
              )}>
                {section.section}
              </p>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center px-3 py-2.5 rounded-xl transition-all duration-300 group relative text-white/70",
                    isActive && "bg-accent/35 border-l-[3px] border-accent rounded-l-none text-accent shadow-sm shadow-accent/5"
                  )}
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className={cn(
                        "w-5 h-5 shrink-0 transition-transform duration-300 text-accent",
                        !isOpen && "mx-auto",
                        isActive ? "stroke-[2.5px]" : "group-hover:scale-110"
                      )} />
                      {isOpen && <span className="ml-4 font-bold text-[13px] tracking-tight">{item.name}</span>}
                      
                      {/* Active Corner Decoration */}
                      {isActive && (
                        <div className="absolute top-0 right-0 w-8 h-8 bg-accent/10 rounded-bl-full pointer-events-none blur-[2px]" />
                      )}

                      {/* Badge Support */}
                      {isOpen && item.badge && (
                        <span className={cn(
                          "ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full transition-colors",
                          item.badge.color
                        )}>
                          {item.badge.text}
                        </span>
                      )}

                      {!isOpen && (
                        <div className={cn(
                          "absolute left-16 text-[11px] font-bold px-3 py-2 rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-50 border shadow-2xl bg-[#111827] text-white border-white/10"
                        )}>
                          {item.name}
                          {item.badge && <span className="ml-2 text-accent">({item.badge.text})</span>}
                        </div>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className={cn(
        "p-4 border-t mt-auto transition-colors border-white/5 bg-black/10"
      )}>
        <button 
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 rounded-xl text-[#EF4444] hover:bg-[#EF4444]/10 transition-all duration-300 group"
        >
          <LogOut className="w-5 h-5 shrink-0 group-hover:rotate-180 transition-transform duration-500" />
          {isOpen && <span className="ml-4 font-bold text-[13px] tracking-tight">Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
