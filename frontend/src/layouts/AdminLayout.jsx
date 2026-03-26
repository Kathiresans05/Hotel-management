import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import TopNavbar from '../components/TopNavbar';
import { cn } from '../utils/cn';
import { useTheme } from '../context/ThemeContext';

const AdminLayout = () => {
  const { isDarkMode } = useTheme();
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 1024);

  // Close sidebar on mobile when navigating
  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className={cn(
      "flex min-h-screen transition-colors duration-300",
      isDarkMode ? "bg-[#020617] text-white" : "bg-slate-50 text-slate-900"
    )}>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Position fixed for mobile drawer, relative for desktop */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 transition-all duration-300 transform lg:relative lg:translate-x-0 h-screen shrink-0",
        isSidebarOpen ? "translate-x-0 w-64" : "-translate-x-full lg:translate-x-0 w-20"
      )}>
        <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <TopNavbar toggleSidebar={toggleSidebar} isOpen={isSidebarOpen} />
        
        <main className={cn(
          "flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 transition-colors duration-300",
          isDarkMode ? "bg-[#0F172A]/30" : "bg-white"
        )}>
          <div className="max-w-[1600px] mx-auto animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
