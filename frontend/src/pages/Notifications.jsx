import React, { useState } from 'react';
import { 
  Bell, 
  Search, 
  CheckCheck, 
  AlertCircle, 
  Info, 
  CreditCard, 
  UserPlus, 
  Calendar,
  Filter,
  MoreVertical,
  Trash2,
  Clock
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { useLanguage } from '../context/LanguageContext';

const initialNotifications = [
  {
    id: 1,
    type: 'booking',
    title: 'NEW_BOOKING_REQUEST',
    message: 'NEW_BOOKING_MSG',
    time: '2_MINS_AGO',
    unread: true,
    icon: Calendar,
    color: 'blue'
  },
  {
    id: 2,
    type: 'payment',
    title: 'PAYMENT_RECEIVED',
    message: 'PAYMENT_RECEIVED_MSG',
    time: '15_MINS_AGO',
    unread: true,
    icon: CreditCard,
    color: 'green'
  },
  {
    id: 3,
    type: 'system',
    title: 'SYSTEM_MAINTENANCE',
    message: 'SYSTEM_MAINTENANCE_MSG',
    time: '1_HOUR_AGO',
    unread: false,
    icon: Info,
    color: 'orange'
  },
  {
    id: 4,
    type: 'staff',
    title: 'STAFF_LEAVE_APPROVED',
    message: 'STAFF_LEAVE_MSG',
    time: '3_HOURS_AGO',
    unread: false,
    icon: UserPlus,
    color: 'purple'
  },
  {
    id: 5,
    type: 'alert',
    title: 'CRITICAL_WATER_ISSUE',
    message: 'CRITICAL_WATER_MSG',
    time: '5_HOURS_AGO',
    unread: true,
    icon: AlertCircle,
    color: 'red'
  },
  {
    id: 6,
    type: 'booking',
    title: 'BOOKING_CANCELLED',
    message: 'BOOKING_CANCELLED_MSG',
    time: 'YESTERDAY',
    unread: false,
    icon: Calendar,
    color: 'slate'
  }
];

const Notifications = () => {
  const { t } = useLanguage();
  const { isDarkMode } = useTheme();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [filter, setFilter] = useState('all');

  const filteredNotifications = filter === 'all' 
    ? notifications 
    : notifications.filter(n => n.type === filter);

  const markAllRead = () => {
    setNotifications(notifications.map(n => ({ ...n, unread: false })));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getColorClasses = (color) => {
    const colors = {
      blue: isDarkMode ? "bg-blue-500/10 text-blue-400" : "bg-blue-50 text-blue-600",
      green: isDarkMode ? "bg-emerald-500/10 text-emerald-400" : "bg-emerald-50 text-emerald-600",
      orange: isDarkMode ? "bg-orange-500/10 text-orange-400" : "bg-orange-50 text-orange-600",
      purple: isDarkMode ? "bg-purple-500/10 text-purple-400" : "bg-purple-50 text-purple-600",
      red: isDarkMode ? "bg-rose-500/10 text-rose-400" : "bg-rose-50 text-rose-600",
      slate: isDarkMode ? "bg-slate-500/10 text-slate-400" : "bg-slate-100 text-slate-600",
    };
    return colors[color] || colors.slate;
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-5xl mx-auto">
      <PageHeader 
        title={t('NOTIFICATIONS_CENTER')} 
        subtitle={t('NOTIFICATIONS_DESC')}
        actions={
          <button 
            onClick={markAllRead}
            className="flex items-center px-4 py-2 bg-accent text-white rounded-2xl text-sm font-bold shadow-lg shadow-accent/20 hover:bg-accent-hover transition-all active:scale-95"
          >
            <CheckCheck className="w-4 h-4 mr-2" />
            {t('MARK_ALL_READ')}
          </button>
        }
      />

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Filters */}
        <div className="w-full md:w-64 shrink-0 space-y-2">
          {[
            { id: 'all', label: t('ALL_NOTIFICATIONS'), icon: Bell },
            { id: 'booking', label: t('BOOKINGS'), icon: Calendar },
            { id: 'payment', label: t('PAYMENTS'), icon: CreditCard },
            { id: 'staff', label: t('STAFF'), icon: UserPlus },
            { id: 'system', label: t('SYSTEM'), icon: Info },
            { id: 'alert', label: t('ALERTS'), icon: AlertCircle },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setFilter(item.id)}
              className={cn(
                "w-full flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-bold transition-all group",
                filter === item.id
                  ? "bg-accent text-white shadow-lg shadow-accent/20"
                  : isDarkMode 
                    ? "text-slate-400 hover:bg-white/5 hover:text-white" 
                    : "text-slate-500 hover:bg-slate-100 hover:text-slate-900"
              )}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-4 h-4" />
                {item.label}
              </div>
              {item.id === 'all' && (
                <span className={cn(
                  "px-2 py-0.5 rounded-full text-[10px]",
                  filter === 'all' ? "bg-white/20 text-white" : "bg-accent/10 text-accent"
                )}>
                  {notifications.length}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        <div className="flex-1 space-y-4">
          <div className={cn(
            "p-3 rounded-2xl border flex items-center gap-3",
            isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-slate-200"
          )}>
            <Search className="w-4 h-4 text-slate-400 ml-2" />
            <input 
              type="text" 
              placeholder={t('SEARCH_NOTIFICATIONS_PLACEHOLDER')} 
              className="bg-transparent border-none outline-none text-sm w-full py-1 text-slate-400 placeholder:text-slate-500"
            />
            <button className={cn(
              "p-2 rounded-xl border border-white/5 hover:bg-white/5 transition-colors",
              isDarkMode ? "text-slate-400" : "text-slate-500"
            )}>
              <Filter className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-3">
            {filteredNotifications.length > 0 ? (
              filteredNotifications.map((n) => (
                <div 
                  key={n.id}
                  className={cn(
                    "p-5 rounded-[24px] border transition-all duration-300 group flex gap-4",
                    n.unread 
                      ? (isDarkMode ? "bg-accent/5 border-accent/20" : "bg-accent/[0.02] border-accent/20") 
                      : (isDarkMode ? "bg-[#0F172A]/40 border-white/5" : "bg-white border-slate-100"),
                    "hover:shadow-xl hover:shadow-black/5"
                  )}
                >
                  <div className={cn(
                    "w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-lg",
                    getColorClasses(n.color)
                  )}>
                    <n.icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className={cn(
                        "font-bold text-base truncate pr-4",
                        isDarkMode ? "text-white" : "text-slate-900"
                      )}>{t(n.title)}</h4>
                      <div className="flex items-center text-[10px] font-bold text-slate-400 uppercase tracking-widest gap-2">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {t(n.time)}
                      </div>
                    </div>
                    <p className={cn(
                      "text-sm leading-relaxed mb-3",
                      isDarkMode ? "text-slate-400" : "text-slate-500"
                    )}>{t(n.message)}</p>
                    
                    <div className="flex items-center gap-3">
                      <button className={cn(
                        "text-[10px] font-bold uppercase tracking-[0.15em] transition-colors py-1.5 px-3 rounded-lg",
                        isDarkMode ? "bg-white/5 text-slate-400 hover:text-white" : "bg-slate-50 text-slate-500 hover:text-slate-900"
                      )}>
                        {t('VIEW_DETAILS')}
                      </button>
                      {n.unread && (
                        <div className="flex items-center gap-1.5 px-2 py-1 bg-accent/10 border border-accent/20 rounded-lg">
                          <div className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                          <span className="text-[10px] font-bold text-accent uppercase tracking-widest">{t('NEW')}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 transition-all opacity-0 group-hover:opacity-100">
                    <button className={cn(
                      "p-2 rounded-xl transition-colors",
                      isDarkMode ? "bg-white/5 text-slate-400 hover:bg-white/10" : "bg-slate-50 text-slate-500 hover:bg-slate-100"
                    )}>
                      <MoreVertical className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => deleteNotification(n.id)}
                      className={cn(
                        "p-2 rounded-xl transition-colors",
                        isDarkMode ? "bg-white/5 text-red-400 hover:bg-red-500/10" : "bg-slate-50 text-red-500 hover:bg-red-50"
                      )}
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div className={cn(
                "p-12 text-center rounded-3xl border border-dashed flex flex-col items-center",
                isDarkMode ? "bg-white/5 border-white/10" : "bg-slate-50/50 border-slate-200"
              )}>
                <div className={cn(
                  "w-20 h-20 rounded-full flex items-center justify-center mb-6",
                  isDarkMode ? "bg-white/5" : "bg-white shadow-sm"
                )}>
                  <Bell className="w-8 h-8 text-slate-300" />
                </div>
                <h3 className={cn("text-lg font-bold mb-2", isDarkMode ? "text-white" : "text-slate-900")}>{t('NO_NOTIFICATIONS_FOUND')}</h3>
                <p className="text-sm text-slate-400 max-w-xs">{t('NO_NOTIFICATIONS_DESC')}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
