/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicHome from './pages/PublicHome';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Portfolio from './pages/public/Portfolio';
import Blog from './pages/public/Blog';
import Contact from './pages/public/Contact';
import Login from './pages/Login';

import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/app/Dashboard';
import Leads from './pages/app/Leads';
import Opportunities from './pages/app/Opportunities';
import Users from './pages/app/Users';
import ServiceDesk from './pages/app/ServiceDesk';
import Projects from './pages/app/Projects';
import Invoices from './pages/app/Invoices';
import Clients from './pages/app/Clients';
import Proposals from './pages/app/Proposals';
import Tasks from './pages/app/Tasks';
import Assets from './pages/app/Assets';
import Contracts from './pages/app/Contracts';
import AICopilot from './pages/app/AICopilot';
import PlaceholderModule from './pages/app/PlaceholderModule';

import PortalLayout from './components/portal/PortalLayout';
import PortalDashboard from './pages/portal/PortalDashboard';
import PortalProfile from './pages/portal/PortalProfile';
import PortalProjects from './pages/portal/PortalProjects';
import PortalRequests from './pages/portal/PortalRequests';

import { useAuthStore } from './store/authStore';

function ProtectedRoute({ children, requireClient = false }: { children: React.ReactNode, requireClient?: boolean }) {
  const { user, loading, initialized } = useAuthStore();

  if (!initialized || loading) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const isClientRole = user.role === 'CLIENT_USER' || user.role === 'CLIENT_ADMIN';
  
  if (requireClient && !isClientRole) {
    return <Navigate to="/app/dashboard" replace />;
  }
  
  if (!requireClient && isClientRole) {
    return <Navigate to="/portal" replace />;
  }

  return <>{children}</>;
}

export default function App() {
  const initialize = useAuthStore(state => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login isRegister={true} />} />
        
        <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="opportunities" element={<Opportunities />} />
          <Route path="users" element={<Users />} />
          <Route path="clients" element={<Clients />} />
          <Route path="proposals" element={<Proposals />} />
          <Route path="projects" element={<Projects />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="service-desk" element={<ServiceDesk />} />
          <Route path="assets" element={<Assets />} />
          <Route path="contracts" element={<Contracts />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="files" element={<PlaceholderModule title="File Management" />} />
          <Route path="messages" element={<PlaceholderModule title="Internal Communications" />} />
          <Route path="automations" element={<PlaceholderModule title="Automations Engine" />} />
          <Route path="ai" element={<AICopilot />} />
          <Route path="analytics" element={<PlaceholderModule title="Business Analytics" />} />
          <Route path="calendar" element={<PlaceholderModule title="Calendar" />} />
          <Route path="settings" element={<PlaceholderModule title="Settings" />} />
          <Route path="audit-log" element={<PlaceholderModule title="Audit Log" />} />
          <Route path="*" element={<div className="p-8 text-center text-slate-500">Module coming soon in next phase</div>} />
        </Route>
        
        <Route path="/portal" element={<ProtectedRoute requireClient><PortalLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/portal/dashboard" replace />} />
          <Route path="dashboard" element={<PortalDashboard />} />
          <Route path="profile" element={<PortalProfile />} />
          <Route path="projects" element={<PortalProjects />} />
          <Route path="requests" element={<PortalRequests />} />
        </Route>
      </Routes>
    </Router>
  );
}
