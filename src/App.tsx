/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import PublicHome from './pages/PublicHome';
import About from './pages/public/About';
import Services from './pages/public/Services';
import Contact from './pages/public/Contact';
import Login from './pages/Login';
import AppLayout from './components/layout/AppLayout';
import Dashboard from './pages/app/Dashboard';
import Leads from './pages/app/Leads';
import Opportunities from './pages/app/Opportunities';
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
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Login isRegister={true} />} />
        
        <Route path="/app" element={<ProtectedRoute><AppLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="/app/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="opportunities" element={<Opportunities />} />
          <Route path="*" element={<div className="p-8 text-center text-slate-500">Module coming soon in next phase</div>} />
        </Route>
        
        <Route path="/portal/*" element={
          <ProtectedRoute requireClient>
            <div>Client Portal (TODO)</div>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}
