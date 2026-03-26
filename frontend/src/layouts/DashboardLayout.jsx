import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';

const DashboardLayout = ({ children }) => {
    const [collapsed, setCollapsed] = useState(false);

    return (
        <div className="flex min-h-screen bg-background">
            <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
            <div className="flex-1 flex flex-col min-w-0">
                <TopNavbar setCollapsed={setCollapsed} />
                <main className="p-8 flex-1">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
