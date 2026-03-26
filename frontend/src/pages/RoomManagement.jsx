import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { 
    Plus, Search, Filter, LayoutGrid, List, 
} from 'lucide-react';
import StatusBadge from '../components/StatusBadge';
import { useLanguage } from '../context/LanguageContext';

const dummyRooms = [
    { id: 1, number: '101', floor: 'FLOOR_1ST', category: 'AC', type: 'SINGLE', price: 1200, status: 'Available' },
    { id: 2, number: '102', floor: 'FLOOR_1ST', category: 'AC', type: 'DOUBLE', price: 1800, status: 'Occupied' },
    { id: 3, number: '103', floor: 'FLOOR_1ST', category: 'NON_AC', type: 'SINGLE', price: 800, status: 'Cleaning' },
    { id: 4, number: '201', floor: 'FLOOR_2ND', category: 'AC', type: 'FAMILY', price: 2500, status: 'Maintenance' },
    { id: 5, number: '202', floor: 'FLOOR_2ND', category: 'AC', type: 'DOUBLE', price: 1800, status: 'Available' },
    { id: 6, number: '203', floor: 'FLOOR_2ND', category: 'NON_AC', type: 'DOUBLE', price: 1200, status: 'Waiting' },
];

const RoomManagement = () => {
    const { t } = useLanguage();
    const [view, setView] = useState('grid');
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-textPrimary">{t('ROOM_INVENTORY')}</h1>
                        <p className="text-textSecondary text-sm">{t('ROOM_INVENTORY_DESC')}</p>
                    </div>
                    <button className="btn-accent py-2.5 flex items-center justify-center gap-2">
                        <Plus size={18} />
                        {t('ADD_NEW_ROOM_BTN')}
                    </button>
                </div>

                {/* Filters Row */}
                <div className="card p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex flex-wrap items-center gap-4">
                        <div className="relative w-full sm:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input 
                                type="text" 
                                placeholder={t('SEARCH_ROOM_NUMBER_PLACEHOLDER')} 
                                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-accent/10 focus:border-accent outline-none transition-all text-sm"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium outline-none">
                            <option>{t('ALL_CATEGORIES')}</option>
                            <option>AC</option>
                            <option>NON-AC</option>
                        </select>
                        <select className="bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-medium outline-none">
                            <option>{t('ALL_STATUS')}</option>
                            <option>{t('AVAILABLE')}</option>
                            <option>{t('OCCUPIED')}</option>
                            <option>{t('MAINTENANCE')}</option>
                        </select>
                    </div>
                    <div className="flex items-center gap-2 bg-slate-50 p-1 rounded-lg border border-slate-200">
                        <button 
                            onClick={() => setView('grid')}
                            className={`p-1.5 rounded-md transition-all ${view === 'grid' ? 'bg-surface border border-border text-accent' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <LayoutGrid size={18} />
                        </button>
                        <button 
                            onClick={() => setView('table')}
                            className={`p-1.5 rounded-md transition-all ${view === 'table' ? 'bg-surface border border-border text-accent' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <List size={18} />
                        </button>
                    </div>
                </div>

                {/* Content */}
                {view === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {dummyRooms.map((room) => (
                            <div key={room.id} className="card overflow-hidden group hover:border-accent/30 transition-all">
                                <div className="h-40 bg-slate-100 relative overflow-hidden">
                                    <div className="absolute top-3 left-3">
                                        <StatusBadge status={room.status} />
                                    </div>
                                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <div className="bg-surface/90 backdrop-blur-sm p-2 rounded-lg cursor-pointer hover:bg-surface transition-all">
                                            <Edit2 size={16} className="text-slate-600" />
                                        </div>
                                    </div>
                                    <div className="w-full h-full flex items-center justify-center text-slate-300">
                                        <Camera size={40} />
                                    </div>
                                </div>
                                <div className="p-5">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="text-lg font-bold text-textPrimary">{t('ROOM')} {room.number}</h3>
                                            <p className="text-xs text-textSecondary font-medium flex items-center gap-1 mt-1">
                                                <MapPin size={12} />
                                                {t(room.floor)} {t('FLOOR')} • {t(room.type)}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-accent">₹{room.price}</p>
                                            <p className="text-[10px] font-bold text-slate-400 uppercase">{t('PER_NIGHT')}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 pt-4 border-t border-border">
                                        <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${room.category === 'AC' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                                            {t(room.category)}
                                        </div>
                                        <button className="ml-auto text-xs font-bold text-slate-400 hover:text-danger hover:underline transition-all flex items-center gap-1">
                                            <Trash2 size={12} />
                                            {t('DELETE')}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="card overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead className="bg-slate-50 border-b border-border">
                                    <tr>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{t('ROOM_INFO')}</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{t('CATEGORY')}</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{t('TYPE')}</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{t('PRICE')}</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">{t('STATUS')}</th>
                                        <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">{t('ACTIONS')}</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border">
                                    {dummyRooms.map((room) => (
                                        <tr key={room.id} className="hover:bg-slate-50/50 transition-all">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 font-bold">
                                                        {room.number}
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-textPrimary text-sm">{t('ROOM')} {room.number}</p>
                                                        <p className="text-xs text-textSecondary">{t(room.floor)} {t('FLOOR')}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${room.category === 'AC' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'}`}>
                                                    {t(room.category)}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm text-textSecondary font-medium">{t(room.type)}</td>
                                            <td className="px-6 py-4 text-sm font-bold text-textPrimary">₹{room.price}</td>
                                            <td className="px-6 py-4"><StatusBadge status={room.status} /></td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 transition-all">
                                                    <MoreVertical size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </DashboardLayout>
    );
};

export default RoomManagement;
