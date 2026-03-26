import React, { useState, useEffect, useRef } from 'react';
import { 
  Search, 
  Bell, 
  Menu, 
  Globe,
  Plus,
  ChevronDown,
  Check,
  User,
  Settings,
  LogOut,
  MailOpen
} from 'lucide-react';
import axios from 'axios';

import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { cn } from '../utils/cn';

const TopNavbar = ({ toggleSidebar, isOpen }) => {
  const { user, logout } = useAuth();
  const { isDarkMode } = useTheme();
  // Bring in true Language context
  const { currentLang, changeLanguage, t } = useLanguage();
  
  // Dropdown States
  const [activeDropdown, setActiveDropdown] = useState(null); // 'lang', 'notif', 'profile', null
  const [notifications, setNotifications] = useState([]);
  
  const dropdownRef = useRef(null);

  const userName = user?.name || t('GUEST_USER');
  const userRole = user?.role ? t(user.role.toUpperCase()) : t('NO_ROLE');
  const userInitial = userName.charAt(0).toUpperCase();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setActiveDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch Notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await axios.get('/api/notifications', {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.data.success) {
          setNotifications(res.data.data);
        }
      } catch (err) {
        console.error("Error fetching notifications:", err);
      }
    };
    
    if (activeDropdown === 'notif') {
      fetchNotifications();
    }
  }, [activeDropdown]);

  const toggleDropdown = (dropdownName) => {
    setActiveDropdown(prev => prev === dropdownName ? null : dropdownName);
  };

  const handleLangSelect = (lang) => {
    changeLanguage(lang);
    setActiveDropdown(null);
  };

  const markAllRead = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.put('/api/notifications/read-all', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    } catch (err) {
      console.error("Error marking read:", err);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

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
            placeholder={t('SEARCH_PLACEHOLDER')}
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
      <div className="flex items-center space-x-3" ref={dropdownRef}>
        
        {/* Quick Action */}
        <button className="hidden sm:flex items-center px-5 py-2.5 bg-accent text-white rounded-2xl text-sm font-bold shadow-lg shadow-accent/20 hover:bg-accent-hover hover:-translate-y-0.5 transition-all active:scale-95 group">
          <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform duration-300" />
          {t('QUICK_BOOK')}
        </button>

        <div className={cn(
          "h-8 w-[1px] mx-2 hidden sm:block",
          isDarkMode ? "bg-white/10" : "bg-slate-200"
        )}></div>

        {/* --- Language (Globe) Dropdown --- */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('lang')}
            className={cn(
              "p-2.5 rounded-xl transition-colors group flex items-center justify-center",
              isDarkMode ? "hover:bg-white/5 text-white/60" : "hover:bg-slate-50 text-slate-500",
              activeDropdown === 'lang' && (isDarkMode ? "bg-white/10 text-white" : "bg-slate-200 text-slate-800")
            )}
          >
            <Globe className={cn("w-5 h-5 transition-colors", activeDropdown === 'lang' ? "text-accent" : "group-hover:text-accent")} />
          </button>

          {activeDropdown === 'lang' && (
            <div className={cn(
              "absolute top-full right-0 mt-3 w-40 rounded-2xl shadow-xl border overflow-hidden animate-in slide-in-from-top-2",
              isDarkMode ? "bg-[#0F172A] border-white/10" : "bg-white border-slate-200"
            )}>
              <div className={cn("px-4 py-2 border-b text-xs font-bold tracking-wider", isDarkMode ? "border-white/10 text-white/50" : "border-slate-100 text-slate-400")}>
                {t('LANGUAGE')}
              </div>
              <div className="py-1">
                {['English', 'Tamil'].map(lang => (
                  <button 
                    key={lang}
                    onClick={() => handleLangSelect(lang)}
                    className={cn(
                      "w-full px-4 py-2.5 text-left text-sm font-medium flex items-center justify-between transition-colors",
                      isDarkMode ? "hover:bg-white/5 text-white/80" : "hover:bg-slate-50 text-slate-700",
                      currentLang === lang && "text-accent"
                    )}
                  >
                    {lang}
                    {currentLang === lang && <Check className="w-4 h-4 text-accent" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* --- Notifications Dropdown --- */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('notif')}
            className={cn(
              "p-2.5 rounded-xl transition-colors group flex items-center justify-center",
              isDarkMode ? "hover:bg-white/5 text-white/60" : "hover:bg-slate-50 text-slate-500",
              activeDropdown === 'notif' && (isDarkMode ? "bg-white/10 text-white" : "bg-slate-200 text-slate-800")
            )}
          >
            <Bell className={cn("w-5 h-5 transition-colors", activeDropdown === 'notif' ? "text-accent" : "group-hover:text-accent")} />
            {unreadCount > 0 && (
              <span className={cn(
                "absolute top-2.5 right-2.5 w-2.5 h-2.5 rounded-full border-2 ring-1 ring-accent/40 animate-pulse",
                isDarkMode ? "bg-accent border-[#020617]" : "bg-accent border-white"
              )}></span>
            )}
          </button>

          {activeDropdown === 'notif' && (
            <div className={cn(
              "absolute top-full right-0 mt-3 w-80 rounded-2xl shadow-2xl border overflow-hidden animate-in slide-in-from-top-2",
              isDarkMode ? "bg-[#0F172A] border-white/10" : "bg-white border-slate-200"
            )}>
              <div className={cn(
                "px-5 py-3 border-b flex items-center justify-between",
                isDarkMode ? "border-white/10" : "border-slate-100"
              )}>
                <span className={cn("font-bold text-sm", isDarkMode ? "text-white" : "text-slate-800")}>{t('NOTIFICATIONS')}</span>
                {notifications.length > 0 && (
                  <button onClick={markAllRead} className="text-xs text-accent hover:underline font-medium">{t('MARK_ALL_READ')}</button>
                )}
              </div>
              <div className="max-h-72 overflow-y-auto no-scrollbar py-2">
                {notifications.length === 0 ? (
                  <div className="px-5 py-8 text-center flex flex-col items-center">
                    <MailOpen className={cn("w-8 h-8 mb-2", isDarkMode ? "text-white/20" : "text-slate-300")} />
                    <span className={cn("text-sm", isDarkMode ? "text-white/50" : "text-slate-400")}>{t('NO_NOTIFICATIONS')}</span>
                  </div>
                ) : (
                  notifications.map(n => (
                    <div key={n._id} className={cn(
                      "px-5 py-3 hover:bg-black/5 cursor-pointer border-l-4 transition-all",
                      isDarkMode ? "hover:bg-white/5" : "hover:bg-slate-50",
                      n.isRead ? "border-transparent opacity-60" : "border-accent bg-accent/5"
                    )}>
                      <p className={cn("text-sm font-semibold mb-1", isDarkMode ? "text-white" : "text-slate-800")}>{n.title}</p>
                      <p className={cn("text-xs line-clamp-2", isDarkMode ? "text-white/60" : "text-slate-500")}>{n.message}</p>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* --- Profile Dropdown --- */}
        <div className="relative">
          <button 
            onClick={() => toggleDropdown('profile')}
            className={cn(
              "flex items-center pl-1.5 pr-3 py-1.5 rounded-2xl border transition-all group relative overflow-hidden",
              isDarkMode ? "bg-[#0F172A] border-white/10 hover:border-accent/40" : "bg-white border-slate-200 hover:border-accent/30",
              activeDropdown === 'profile' && "border-accent"
            )}
          >
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
              isDarkMode ? "text-white/30 group-hover:text-accent" : "text-slate-300 group-hover:text-accent",
              activeDropdown === 'profile' && "rotate-180 text-accent"
            )} />
          </button>

          {activeDropdown === 'profile' && (
            <div className={cn(
              "absolute top-full right-0 mt-3 w-56 rounded-2xl shadow-2xl border overflow-hidden animate-in slide-in-from-top-2",
              isDarkMode ? "bg-[#0F172A] border-white/10" : "bg-white border-slate-200"
            )}>
              <div className={cn(
                "p-4 border-b lg:hidden",
                isDarkMode ? "border-white/10" : "border-slate-100"
              )}>
                <p className={cn("text-sm font-bold", isDarkMode ? "text-white" : "text-slate-800")}>{userName}</p>
                <p className="text-xs text-accent mt-0.5">{userRole}</p>
              </div>
              <div className="p-2 space-y-1">
                <button className={cn(
                  "w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isDarkMode ? "text-white/70 hover:bg-white/5 hover:text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}>
                  <User className="w-4 h-4 mr-3" /> {t('MY_PROFILE')}
                </button>
                <button className={cn(
                  "w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium transition-colors",
                  isDarkMode ? "text-white/70 hover:bg-white/5 hover:text-white" : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                )}>
                  <Settings className="w-4 h-4 mr-3" /> {t('SETTINGS')}
                </button>
                <hr className={cn("my-1 border-t", isDarkMode ? "border-white/5" : "border-slate-100")} />
                <button 
                  onClick={logout}
                  className="w-full flex items-center px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-3" /> {t('SIGN_OUT')}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
