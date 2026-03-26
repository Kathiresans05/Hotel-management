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
        "transition-all duration-300 z-50 flex flex-col group h-full relative",
        isOpen ? "w-64" : "w-20"
      )}
      style={{
        backgroundColor: '#111827',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)',
        boxShadow: '4px 0 24px rgba(0, 0, 0, 0.15)'
      }}
    >
      {/* Floating Edge Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        title={isOpen ? 'Collapse sidebar' : 'Expand sidebar'}
        style={{
          position: 'absolute',
          top: '50%',
          right: '-14px',
          transform: 'translateY(-50%)',
          zIndex: 100,
          width: '28px',
          height: '56px',
          backgroundColor: '#1f2937',
          border: '1px solid rgba(255,255,255,0.1)',
          borderLeft: 'none',
          borderRadius: '0 10px 10px 0',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '4px 0 12px rgba(0,0,0,0.3)',
          transition: 'background 0.2s, box-shadow 0.2s',
          color: 'rgba(255,255,255,0.5)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.backgroundColor = '#374151';
          e.currentTarget.style.color = '#f97316';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.backgroundColor = '#1f2937';
          e.currentTarget.style.color = 'rgba(255,255,255,0.5)';
        }}
      >
        {isOpen
          ? <ChevronLeft style={{ width: '14px', height: '14px' }} />
          : <ChevronRight style={{ width: '14px', height: '14px' }} />
        }
      </button>

      {/* Header / Logo */}
      <div className={cn(
        "h-[88px] flex items-center justify-between px-6 border-b shrink-0 transition-colors border-white/5"
      )}>
        <div className="flex items-center overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center shrink-0 shadow-lg shadow-accent/20">
            <span className="font-bold text-white text-xl">H</span>
          </div>
          {isOpen && (
            <span className={cn(
              "ml-3 font-poppins font-bold text-xl tracking-tight whitespace-nowrap transition-colors text-white"
            )}>
              HOSTEL<span className="text-accent underline decoration-accent/30 decoration-2 underline-offset-4">PRO</span>
            </span>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto px-5 py-6 scrollbar-hide space-y-8 animate-in fade-in duration-500">
        {menuItems.map((section, idx) => (
          <div key={idx} className="space-y-3">
            {isOpen && (
              <h3 className="px-3 text-xs font-bold tracking-[0.2em] text-[#64748B] uppercase">
                {section.section}
              </h3>
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) => cn(
                    "flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group relative",
                    isActive 
                      ? "bg-[#F97316]/10 text-[#F97316] border-l-[3px] border-[#F97316] rounded-l-none" 
                      : "text-[#94A3B8] hover:bg-white/5 hover:text-white"
                  )}
                >
                  {({ isActive }) => (
                    <>
                      <item.icon className={cn(
                        "shrink-0 transition-transform duration-200",
                        isOpen ? "w-[22px] h-[22px]" : "w-6 h-6 mx-auto",
                        "group-hover:scale-110",
                        isActive && "stroke-[2.5px]"
                      )} size={isOpen ? 22 : 24} />
                      
                      {isOpen && (
                        <>
                          <span className="font-medium text-[15px] tracking-wide flex-1 whitespace-nowrap">
                            {item.name}
                          </span>
                          
                          {/* Badge Support */}
                          {item.badge && (
                            <span 
                              className={cn(
                                "text-[11px] font-bold px-2.5 py-0.5 rounded-full transition-colors",
                                item.badge.color
                              )}
                            >
                              {item.badge.text}
                            </span>
                          )}
                        </>
                      )}

                      {/* Tooltip for collapsed state */}
                      {!isOpen && (
                        <div className="absolute left-16 px-3 py-2 bg-[#0F172A] border border-white/10 text-white text-[13px] font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-[100] shadow-2xl">
                          {item.name}
                          {item.badge && <span className="ml-2 text-[#F97316]">({item.badge.text})</span>}
                        </div>
                      )}

                      {/* Active Glow Effect */}
                      <div className="absolute inset-0 rounded-xl pointer-events-none group-[.active]:shadow-[0_0_15px_rgba(249,115,22,0.05)]" />
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="px-5">
        <div className="h-px bg-white/5 w-full" />
      </div>

      {/* Bottom Section */}
      <div className="p-5 mt-auto">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[#EF4444] hover:bg-[#EF4444]/10 transition-all duration-300 group"
        >
          <LogOut className="w-[22px] h-[22px] shrink-0 group-hover:rotate-12 transition-transform duration-500" />
          {isOpen && <span className="font-medium text-[15px] tracking-wide">Sign Out</span>}
          
          {!isOpen && (
            <div className="absolute left-16 px-3 py-2 bg-[#0F172A] border border-white/10 text-[#EF4444] text-[13px] font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-[100] shadow-2xl">
              Sign Out
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
