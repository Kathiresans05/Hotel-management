import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Rooms from './pages/Rooms';
import Bookings from './pages/Bookings';
import Customers from './pages/Customers';
import Staff from './pages/Staff';
import CheckIn from './pages/CheckIn';
import Billing from './pages/Billing';
import Analytics from './pages/Analytics';
import Finance from './pages/Finance';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import Login from './pages/Login';
import VerifyOTP from './pages/VerifyOTP';
import ReceptionDashboard from './pages/ReceptionDashboard';
import SubAdminDashboard from './pages/SubAdminDashboard';

const MaintenancePlaceholder = ({ title }) => (
  <div className="p-8 max-w-2xl animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div className="bg-accent/5 border border-accent/10 rounded-3xl p-10 backdrop-blur-sm">
      <div className="w-16 h-16 bg-accent/20 rounded-2xl flex items-center justify-center mb-6">
        <div className="w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
      <h1 className="text-3xl font-bold mb-3 tracking-tight">{title}</h1>
      <p className="text-text-secondary text-lg leading-relaxed">
        We are currently upgrading this module to a premium SaaS experience. 
        It will be available for Super Admin use shortly.
      </p>
      <div className="mt-8 flex items-center gap-3 text-accent font-bold text-sm uppercase tracking-widest">
        <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
        Development in Progress
      </div>
    </div>
  </div>
);

function App() {
  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* Roles Protected Routes */}
        <Route path="/super-admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="customers" element={<Customers />} />
          <Route path="staff" element={<Staff />} />
          <Route path="check-in" element={<CheckIn />} />
          <Route path="billing" element={<Billing />} />
          <Route path="finance" element={<Finance />} />
          <Route path="reports" element={<Reports />} />
          <Route path="settings" element={<Settings />} />
          <Route path="audit-logs" element={<div className="p-8"><h1 className="text-2xl font-bold">Audit Logs System</h1><p className="text-text-secondary mt-2 text-sm italic">This component is under maintenance. Accessing via Super Admin terminal.</p></div>} />
          
          {/* New SaaS Modules - Maintenance Placeholders */}
          <Route path="notifications" element={<MaintenancePlaceholder title="Notifications Center" />} />
          <Route path="check-out" element={<MaintenancePlaceholder title="Express Check-Out" />} />
          <Route path="services" element={<MaintenancePlaceholder title="Housekeeping & Services" />} />
          <Route path="roles" element={<MaintenancePlaceholder title="Roles & Permissions" />} />
          <Route path="attendance" element={<MaintenancePlaceholder title="Staff Attendance" />} />
          <Route path="payroll" element={<MaintenancePlaceholder title="Payroll Management" />} />
          <Route path="payments" element={<MaintenancePlaceholder title="Payment Gateway" />} />
          <Route path="expenses" element={<MaintenancePlaceholder title="Expense Tracker" />} />
          <Route path="tax" element={<MaintenancePlaceholder title="GST & Tax Reports" />} />
          <Route path="branches" element={<MaintenancePlaceholder title="Branch Management" />} />
          <Route path="integrations" element={<MaintenancePlaceholder title="System Integrations" />} />
          <Route path="backup" element={<MaintenancePlaceholder title="Cloud Backup" />} />
        </Route>

        <Route path="/sub-admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<SubAdminDashboard />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="customers" element={<Customers />} />
        </Route>

        <Route path="/reception" element={<AdminLayout />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<ReceptionDashboard />} />
          <Route path="rooms" element={<Rooms />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="check-in" element={<CheckIn />} />
        </Route>

        <Route path="/dashboard" element={<Navigate to="/login" replace />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
