import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  BarChart3,
  Bell,
  Bed,
  CalendarCheck,
  CheckCircle2,
  Users,
  ListTodo,
  Users2,
  Fingerprint,
  Banknote,
  CreditCard,
  Wallet,
  Receipt,
  ClipboardList,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils/cn';

const SubAdminSidebar = ({ isOpen, setIsOpen }) => {
  const { logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuSections = [
    {
      section: t('OVERVIEW'),
      items: [
        { name: t('DASHBOARD'), icon: LayoutDashboard, path: '/sub-admin/dashboard' },
        { name: t('ANALYTICS'), icon: BarChart3, path: '/sub-admin/analytics' },
        {
          name: t('NOTIFICATIONS'),
          icon: Bell,
          path: '/sub-admin/notifications',
          badge: { text: '3', bgColor: 'rgba(249, 115, 22, 0.15)', textColor: '#F97316' },
        },
      ],
    },
    {
      section: t('OPERATIONS'),
      items: [
        { name: t('ROOMS'), icon: Bed, path: '/sub-admin/rooms' },
        {
          name: t('BOOKINGS'),
          icon: CalendarCheck,
          path: '/sub-admin/bookings',
          badge: { text: '8', bgColor: 'rgba(34, 197, 94, 0.15)', textColor: '#22C55E' },
        },
        { name: t('CHECK_IN_OUT'), icon: CheckCircle2, path: '/sub-admin/check-in' },
        { name: t('CUSTOMERS'), icon: Users, path: '/sub-admin/customers' },
        { name: t('SERVICES'), icon: ListTodo, path: '/sub-admin/services' },
      ],
    },
    {
      section: t('PEOPLE_MANAGEMENT'),
      items: [
        { name: t('STAFF'), icon: Users2, path: '/sub-admin/staff' },
        { name: t('ATTENDANCE'), icon: Fingerprint, path: '/sub-admin/attendance' },
        { name: t('PAYROLL'), icon: Banknote, path: '/sub-admin/payroll' },
      ],
    },
    {
      section: t('FINANCE'),
      items: [
        { name: t('BILLING'), icon: CreditCard, path: '/sub-admin/billing' },
        {
          name: t('PAYMENTS'),
          icon: Wallet,
          path: '/sub-admin/payments',
          badge: { text: 'Pending', bgColor: 'rgba(249, 115, 22, 0.15)', textColor: '#F97316' },
        },
        { name: t('EXPENSES'), icon: Receipt, path: '/sub-admin/expenses' },
        { name: t('REPORTS'), icon: ClipboardList, path: '/sub-admin/reports' },
      ],
    },
  ];

  return (
    <aside
      className={cn(
        "h-screen flex flex-col transition-all duration-300 ease-in-out relative z-50",
        isOpen ? "w-64" : "w-20"
      )}
      style={{
        background: 'linear-gradient(180deg, #020617 0%, #0F172A 100%)',
        borderRight: '1px solid rgba(249, 115, 22, 0.25)',
        boxShadow: 'inset 0 0 20px rgba(249, 115, 22, 0.02)',
      }}
    >
      {/* Logo Area */}
      <div className="h-[88px] flex items-center justify-between px-6 border-b border-white/5 shrink-0">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="w-10 h-10 rounded-xl bg-[#F97316] flex items-center justify-center shrink-0 shadow-lg shadow-orange-500/20">
            <span className="font-bold text-white text-xl">H</span>
          </div>
          {isOpen && (
            <span className="font-poppins font-bold text-xl tracking-tight text-white whitespace-nowrap">
              HOSTEL<span className="text-[#F97316]">PRO</span>
            </span>
          )}
        </div>
        
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-1.5 rounded-lg border border-white/10 bg-white/5 text-slate-400 hover:text-[#F97316] hover:border-[#F97316]/30 transition-all"
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>
      </div>

      {/* Menu Sections */}
      <div className="flex-1 overflow-y-auto px-5 py-6 space-y-8 scrollbar-hide">
        {menuSections.map((section, idx) => (
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
                  <item.icon className={cn(
                    "shrink-0 transition-transform duration-200",
                    isOpen ? "w-[22px] h-[22px]" : "w-6 h-6 mx-auto",
                    "group-hover:scale-110",
                    ({ isActive }) => isActive && "stroke-[2.5px]"
                  )} size={isOpen ? 22 : 24} />
                  
                  {isOpen && (
                    <>
                      <span className="font-medium text-[15px] tracking-wide flex-1 whitespace-nowrap">
                        {item.name}
                      </span>
                      {item.badge && (
                        <span 
                          className="text-[11px] font-bold px-2.5 py-0.5 rounded-full z-10"
                          style={{ backgroundColor: item.badge.bgColor, color: item.badge.textColor }}
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

      <div className="p-5 mt-auto">
        <button 
          onClick={handleLogout}
          className="w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl text-[#EF4444] hover:bg-[#EF4444]/10 transition-all group"
        >
          <LogOut className="w-[22px] h-[22px] shrink-0 group-hover:rotate-12 transition-transform" />
          {isOpen && <span className="font-medium text-[15px] tracking-wide">{t('SIGN_OUT')}</span>}
          
          {!isOpen && (
            <div className="absolute left-16 px-3 py-2 bg-[#0F172A] border border-white/10 text-[#EF4444] text-[13px] font-medium rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all whitespace-nowrap z-[100] shadow-2xl">
              {t('SIGN_OUT')}
            </div>
          )}
        </button>
      </div>
    </aside>
  );
};

export default SubAdminSidebar;
