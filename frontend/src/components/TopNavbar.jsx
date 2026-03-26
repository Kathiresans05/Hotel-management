import React from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  Globe,
  Plus,
  ChevronDown
} from 'lucide-react';

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';

const TopNavbar = ({ toggleSidebar, isOpen }) => {
  const { user } = useAuth();
  const { isDarkMode } = useTheme();
  
  const userName = user?.name || 'Guest User';
  const userRole = user?.role ? user.role.replace('_', ' ').toUpperCase() : 'NO ROLE';
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className={cn(
      "h-20 border-b sticky top-0 z-40 flex items-center justify-between px-6 shrink-0 transition-all duration-300",
      isDarkMode 
        ? "bg-[#020617] border-white/5 shadow-black/20 shadow-lg" 
        : "bg-white border-slate-200 shadow-sm"
    )}>
      {/* Left Area: Toggle + Search */}
      <div className="flex items-center flex-1 max-w-xl mr-6">
        <button 
          onClick={toggleSidebar}
          className={cn(
            "p-2 mr-4 rounded-lg transition-colors lg:hidden",
            isDarkMode ? "hover:bg-white/5 text-white/60" : "hover:bg-slate-50 text-slate-500"
          )}
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="relative flex-1 group hidden md:block text-[#94A3B8]">
          <Search className={cn(
            "w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 transition-colors",
            isDarkMode ? "text-white/30 group-focus-within:text-accent" : "text-slate-400 group-focus-within:text-accent"
          )} />
          <input 
            type="text" 
            placeholder="Search bookings, guests, or rooms..." 
            className={cn(
              "w-full pl-11 pr-4 py-2.5 border transition-all outline-none rounded-2xl text-sm",
              isDarkMode 
                ? "bg-white/5 border-white/10 text-white focus:border-accent/40 focus:ring-4 focus:ring-accent/5"
                : "bg-slate-50 border-slate-200 text-slate-900 focus:border-accent/30 focus:bg-white focus:ring-4 focus:ring-accent/5"
            )}
          />
        </div>
      </div>

      {/* Right Area: Actions + Profile */}
      <div className="flex items-center space-x-3">
        {/* Quick Action */}
        <button className="hidden sm:flex items-center px-5 py-2.5 bg-accent text-white rounded-2xl text-sm font-bold shadow-lg shadow-accent/20 hover:bg-accent-hover hover:-translate-y-0.5 transition-all active:scale-95 group">
          <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          Quick Book
        </button>

        <div className={cn(
          "h-8 w-[1px] mx-2 hidden sm:block",
          isDarkMode ? "bg-white/10" : "bg-slate-200"
        )}></div>

        {/* Icons */}
        <button className={cn(
          "p-2.5 rounded-xl relative transition-colors group",
          isDarkMode ? "hover:bg-white/5 text-white/60" : "hover:bg-slate-50 text-slate-500"
        )}>
          <Globe className="w-5 h-5 group-hover:text-accent transition-colors" />
        </button>

        <button className={cn(
          "p-2.5 rounded-xl relative transition-colors group",
          isDarkMode ? "hover:bg-white/5 text-white/60" : "hover:bg-slate-50 text-slate-500"
        )}>
          <Bell className="w-5 h-5 group-hover:text-accent transition-colors" />
          <span className={cn(
            "absolute top-2.5 right-2.5 w-2 h-2 rounded-full border-2 ring-1 ring-accent/40 bounce",
            isDarkMode ? "bg-accent border-[#020617]" : "bg-accent border-white"
          )}></span>
        </button>

        {/* Profile Dropdown */}
        <button className={cn(
          "flex items-center pl-1.5 pr-3 py-1.5 rounded-2xl border transition-all group relative overflow-hidden",
          isDarkMode ? "bg-white/5 border-white/5 hover:border-accent/40" : "bg-slate-50 border-slate-200 hover:border-accent/30"
        )}>
          {isDarkMode && <div className="absolute top-0 right-0 w-8 h-8 bg-accent/10 rounded-bl-full blur-sm" />}
          <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center text-white font-bold text-sm shrink-0 shadow-lg shadow-accent/20">
            {userInitial}
          </div>
          <div className="ml-3 hidden lg:block text-left">
            <p className={cn(
              "text-[11px] font-bold leading-tight uppercase tracking-wider",
              isDarkMode ? "text-white/50" : "text-slate-400"
            )}>{userRole}</p>
            <div className="flex items-center mt-0.5">
              <span className={cn(
                "text-sm font-bold leading-none",
                isDarkMode ? "text-white" : "text-slate-900"
               )}>{userName}</span>
            </div>
          </div>
          <ChevronDown className={cn(
            "w-4 h-4 ml-4 transition-all",
            isDarkMode ? "text-white/30 group-hover:translate-y-0.5 group-hover:text-accent" : "text-slate-300 group-hover:translate-y-0.5 group-hover:text-accent"
          )} />
        </button>
      </div>
    </header>
  );
};

export default TopNavbar;
