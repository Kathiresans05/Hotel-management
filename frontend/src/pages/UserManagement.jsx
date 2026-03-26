import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { 
    Plus, Search, Filter, MoreVertical, 
    Edit2, Trash2, Mail, Phone, 
    User as UserIcon, ShieldAlert, Key
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const dummyUsers = [
    { id: 1, name: 'John Doe', email: 'john@hostel.com', role: 'reception', phone: '9876543210', status: 'active', joined: '2024-01-15' },
    { id: 2, name: 'Jane Smith', email: 'jane@hostel.com', role: 'sub_admin', phone: '9876543211', status: 'active', joined: '2024-02-10' },
    { id: 3, name: 'Mike Ross', email: 'mike@hostel.com', role: 'reception', phone: '9876543212', status: 'inactive', joined: '2024-03-05' },
];

const UserManagement = () => {
    const { t } = useLanguage();
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <DashboardLayout>
            <div className="space-y-6">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-textPrimary">{t('STAFF_MANAGEMENT')}</h1>
                        <p className="text-textSecondary text-sm">{t('STAFF_MGMT_DESC')}</p>
                    </div>
                    <button className="btn-accent py-2.5 flex items-center gap-2">
                        <UserIcon size={18} />
                        {t('ADD_NEW_STAFF')}
                    </button>
                </div>

                <div className="card p-4 flex flex-col md:flex-row items-center justify-between gap-4">
                    <div className="relative w-full md:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input 
                            type="text" 
                            placeholder={t('SEARCH_STAFF_PLACEHOLDER')} 
                            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm outline-none focus:ring-2 focus:ring-accent/10 focus:border-accent"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium outline-none cursor-pointer">
                            <option>{t('ALL_ROLES')}</option>
                            <option>{t('SUB_ADMIN')}</option>
                            <option>{t('RECEPTION')}</option>
                        </select>
                        <button className="p-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-500 transition-all">
                            <Filter size={18} />
                        </button>
                    </div>
                </div>

                <div className="card overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-slate-50 border-b border-border">
                                <tr>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{t('STAFF_INFO')}</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{t('CONTACT')}</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{t('ROLE')}</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{t('JOINED_DATE')}</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{t('STATUS')}</th>
                                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">{t('ACTIONS')}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {dummyUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50/50 transition-all">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400 font-bold border border-slate-200">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-textPrimary text-sm">{user.name}</p>
                                                    <p className="text-xs text-textSecondary font-medium flex items-center gap-1">
                                                        <Mail size={12} />
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-textSecondary font-medium">
                                            <div className="flex items-center gap-1">
                                                <Phone size={14} className="text-slate-400" />
                                                {user.phone}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${user.role === 'sub_admin' ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                                                {t(user.role.toUpperCase())}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-textSecondary font-medium">{user.joined}</td>
                                        <td className="px-6 py-4"><StatusBadge status={user.status} /></td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-all" title={t('RESET_PASSWORD')}>
                                                    <Key size={18} />
                                                </button>
                                                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-all" title={t('EDIT_STAFF')}>
                                                    <Edit2 size={18} />
                                                </button>
                                                <button className="p-2 hover:bg-slate-100 rounded-lg text-rose-400 transition-all" title={t('DEACTIVATE')}>
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    {dummyUsers.length === 0 && (
                        <div className="py-20 text-center">
                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-border">
                                <UserIcon size={40} className="text-slate-300" />
                            </div>
                            <h3 className="text-lg font-bold text-textPrimary">{t('NO_STAFF_FOUND')}</h3>
                            <p className="text-textSecondary text-sm">{t('NO_STAFF_DESC')}</p>
                        </div>
                    )}
                </div>
            </div>
        </DashboardLayout>
    );
};

export default UserManagement;
