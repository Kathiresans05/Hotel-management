import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  UserPlus, 
  MoreVertical, 
  Mail, 
  Phone, 
  MapPin, 
  History,
  FileText
} from 'lucide-react';
import PageHeader from '../components/PageHeader';
import StatusBadge from '../components/StatusBadge';
import AddCustomerModal from '../components/forms/AddCustomerModal';
import { useLanguage } from '../context/LanguageContext';

const Customers = () => {
  const { t } = useLanguage();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const customers = [
    { id: 'C-001', name: 'Alexandre Mitchell', email: 'mitchell.alex@email.com', phone: '+1 (555) 000-1234', stays: 12, lastStay: '25 Mar 2024', status: 'Active', room: '305' },
    { id: 'C-002', name: 'Sarah Wilson', email: 's.wilson@email.com', phone: '+1 (555) 000-5678', stays: 4, lastStay: '12 Feb 2024', status: 'Inactive', room: 'N/A' },
    { id: 'C-003', name: 'David Chen', email: 'd.chen@email.com', phone: '+1 (555) 000-9012', stays: 8, lastStay: '20 Mar 2024', status: 'Active', room: '102' },
    { id: 'C-004', name: 'Emma Davis', email: 'e.davis@email.com', phone: '+1 (555) 000-3456', stays: 1, lastStay: '26 Mar 2024', status: 'Active', room: '201' },
    { id: 'C-005', name: 'Michael Brown', email: 'm.brown@email.com', phone: '+1 (555) 000-7890', stays: 22, lastStay: '01 Jan 2024', status: 'Inactive', room: 'N/A' },
  ];

  return (
    <div className="animate-in fade-in duration-500">
      <PageHeader 
        title={t('CUSTOMER_DIRECTORY')} 
        subtitle={t('CUSTOMER_DESC')}
        actions={
          <button 
            onClick={() => setIsModalOpen(true)}
            className="flex items-center px-4 py-2 bg-primary text-white rounded-button text-sm font-medium hover:bg-primary-dark transition-all"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            {t('ADD_CUSTOMER')}
          </button>
        }
      />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
        {/* Main List Area */}
        <div className="xl:col-span-3 space-y-6">
          <div className="bg-surface rounded-card border border-border overflow-hidden">
            <div className="p-4 border-b border-border bg-background/30 flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" />
                <input 
                  type="text" 
                  placeholder={t('SEARCH_CUSTOMERS_PLACEHOLDER')} 
                  className="w-full pl-10 pr-4 py-2.5 bg-surface border border-border rounded-lg text-sm outline-none focus:border-accent/40 transition-all"
                />
              </div>
              <button className="flex items-center px-3 py-2 bg-surface border border-border rounded-lg text-xs font-bold text-text-secondary hover:bg-background ml-4">
                <Filter className="w-4 h-4 mr-2" />
                {t('FILTER')}
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-background">
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">{t('GUEST')}</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">{t('CONTACT')}</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">{t('STATUS')}</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase text-center">{t('STAYS')}</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase">{t('LAST_VISIT')}</th>
                    <th className="px-6 py-4 text-xs font-bold text-text-secondary uppercase text-right">{t('ACTIONS')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {customers.map((customer) => (
                    <tr key={customer.id} className="hover:bg-background/30 transition-colors cursor-pointer group">
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-sm mr-3">
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div>
                            <p className="text-sm font-bold text-text-primary leading-none">{customer.name}</p>
                            <p className="text-[10px] text-text-secondary mt-1">ID: {customer.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-xs text-text-secondary">
                            <Mail className="w-3 h-3 mr-1.5 opacity-60" />
                            {customer.email}
                          </div>
                          <div className="flex items-center text-xs text-text-secondary">
                            <Phone className="w-3 h-3 mr-1.5 opacity-60" />
                            {customer.phone}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <StatusBadge status={customer.status} />
                      </td>
                      <td className="px-6 py-4 text-center">
                        <span className="text-sm font-bold text-text-primary bg-background px-2.5 py-1 rounded-lg border border-border">{customer.stays}</span>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-text-primary font-medium">{customer.lastStay}</p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 hover:bg-background rounded-lg text-text-secondary transition-all">
                          <MoreVertical className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Profile Side Panel (Sample View) */}
        <div className="xl:col-span-1">
          <div className="bg-surface rounded-card border border-border shadow-soft overflow-hidden sticky top-24">
            <div className="h-24 bg-primary relative">
              <div className="absolute -bottom-10 left-6">
                <div className="w-20 h-20 rounded-2xl bg-surface p-1">
                  <div className="w-full h-full rounded-xl bg-accent flex items-center justify-center text-white font-bold text-2xl">
                    AM
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-14 p-6 space-y-8">
              <div>
                <h3 className="text-xl font-bold text-text-primary tracking-tight">Alexandre Mitchell</h3>
                <div className="flex items-center mt-2">
                  <span className="px-2.5 py-1 bg-purple-soft text-purple text-[10px] font-bold rounded-full mr-2 uppercase">{t('PLATINUM_MEMBER')}</span>
                  <StatusBadge status={customer.status} />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center text-sm text-text-secondary">
                  <MapPin className="w-4 h-4 mr-3 opacity-60" />
                  San Francisco, CA
                </div>
                <div className="flex items-center text-sm text-text-secondary">
                  <History className="w-4 h-4 mr-3 opacity-60" />
                  {t('MEMBER_SINCE')} Jan 2022
                </div>
                <div className="flex items-center text-sm text-text-secondary">
                  <FileText className="w-4 h-4 mr-3 opacity-60" />
                  12 {t('TOTAL_INVOICES')}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t border-border">
                <button className="py-2.5 px-4 bg-background text-text-primary rounded-xl text-xs font-bold hover:bg-border transition-all">
                  {t('EDIT_PROFILE')}
                </button>
                <button className="py-2.5 px-4 bg-accent text-white rounded-xl text-xs font-bold hover:bg-accent-hover transition-all">
                  {t('VIEW_HISTORY')}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <AddCustomerModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default Customers;
