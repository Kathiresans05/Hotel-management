import React from 'react';
import { 
  Settings as SettingsIcon, 
  Bell, 
  Shield, 
  User, 
  Smartphone, 
  Cloud, 
  Database,
  ChevronRight,
  Save,
  Moon,
  Globe,
  Palette
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../utils/cn';
import { useLanguage } from '../context/LanguageContext';

const Settings = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const { t } = useLanguage();
  const sections = [
    { id: 'general', title: t('GENERAL'), icon: SettingsIcon },
    { id: 'security', title: t('PERMISSIONS_SECURITY'), icon: Shield },
    { id: 'notifications', title: t('NOTIFICATIONS'), icon: Bell },
    { id: 'branding', title: t('BRAND_IDENTITY'), icon: Palette },
    { id: 'backup', title: t('BACKUP_RESTORE_MENU'), icon: Cloud },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title={t('SYSTEM_SETTINGS')} 
        subtitle={t('SYSTEM_SETTINGS_DESC')}
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Left Side: Navigation Panels */}
        <div className="lg:col-span-1 space-y-3">
          {sections.map((section) => (
            <button
              key={section.id}
              className={cn(
                "w-full flex items-center justify-between p-4 rounded-xl transition-all border group text-left",
                section.id === 'general' 
                  ? "bg-primary text-white border-primary" 
                  : "bg-surface text-text-secondary border-border hover:bg-background hover:text-primary"
              )}
            >
              <div className="flex items-center">
                <section.icon className="w-5 h-5 mr-3" />
                <span className="text-sm font-bold">{section.title}</span>
              </div>
              <ChevronRight className={cn("w-4 h-4 transition-transform group-hover:translate-x-1", section.id === 'general' ? "text-white/50" : "text-border")} />
            </button>
          ))}
        </div>

        {/* Right Side: Settings Form */}
        <div className="lg:col-span-3 space-y-6">
          <div className="bg-surface rounded-card border border-border overflow-hidden">
            <div className="p-6 border-b border-border flex justify-between items-center">
              <h3 className="font-bold text-text-primary uppercase tracking-widest text-xs">{t('GENERAL_APPLICATION_CONFIG')}</h3>
              <button className="flex items-center px-4 py-2 bg-success text-white rounded-lg text-xs font-bold hover:bg-success-dark transition-all">
                <Save className="w-4 h-4 mr-2" />
                {t('SAVE_CHANGES')}
              </button>
            </div>
            
            <div className="p-8 space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-secondary uppercase">{t('ORGANIZATION_NAME')}</label>
                  <input type="text" defaultValue="HostelPro Management" className="w-full px-4 py-2.5 bg-background border border-transparent rounded-input text-text-primary focus:bg-surface focus:border-accent/40 outline-none transition-all" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text-secondary uppercase">{t('CONTACT_EMAIL')}</label>
                  <input type="email" defaultValue="admin@hostelpro.io" className="w-full px-4 py-2.5 bg-background border border-transparent rounded-input text-text-primary focus:bg-surface focus:border-accent/40 outline-none transition-all" />
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-background/50 rounded-2xl border border-border/50">
                  <div className="flex items-center">
                    <div className="p-2.5 bg-surface rounded-lg border border-border/50 mr-4 text-accent">
                      <Smartphone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-primary">{t('OTP_VERIFICATION')}</p>
                      <p className="text-[10px] text-text-secondary italic">{t('OTP_DESC')}</p>
                    </div>
                  </div>
                  <div className="w-11 h-6 bg-accent rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-surface rounded-full"></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-background/50 rounded-2xl border border-border/50">
                  <div className="flex items-center">
                    <div className="p-2.5 bg-surface rounded-lg border border-border/50 mr-4 text-purple">
                      <Moon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-primary">{t('DARK_MODE')}</p>
                      <p className="text-[10px] text-text-secondary italic">{t('DARK_MODE_DESC')}</p>
                    </div>
                  </div>
                  <div 
                    onClick={toggleTheme}
                    className={cn(
                      "w-11 h-6 rounded-full relative cursor-pointer transition-all duration-300",
                      isDarkMode ? "bg-accent" : "bg-slate-300"
                    )}
                  >
                    <div className={cn(
                      "absolute top-1 w-4 h-4 bg-surface rounded-full transition-all duration-300",
                      isDarkMode ? "right-1" : "left-1"
                    )}></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-background/50 rounded-2xl border border-border/50">
                  <div className="flex items-center">
                    <div className="p-2.5 bg-surface rounded-lg border border-border/50 mr-4 text-success">
                      <Globe className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-text-primary">{t('AUTO_BACKUP')}</p>
                      <p className="text-[10px] text-text-secondary italic">{t('AUTO_BACKUP_DESC')}</p>
                    </div>
                  </div>
                  <div className="w-11 h-6 bg-accent rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-surface rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


export default Settings;
