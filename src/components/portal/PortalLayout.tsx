import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';
import { LayoutDashboard, User, Briefcase, MessageSquare, LogOut, Menu, X, Bell } from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/portal/dashboard', icon: LayoutDashboard },
  { name: 'My Profile', href: '/portal/profile', icon: User },
  { name: 'Projects & Onboarding', href: '/portal/projects', icon: Briefcase },
  { name: 'Service Requests', href: '/portal/requests', icon: MessageSquare },
];

export default function PortalLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuthStore();

  return (
    <div className="h-screen bg-slate-50 flex font-sans overflow-hidden">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-slate-900/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 text-slate-300 transform transition-transform duration-200 ease-in-out lg:translate-x-0 lg:static lg:flex lg:flex-col",
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="h-16 flex items-center px-6 bg-slate-950/50 justify-between">
          <Link to="/portal/dashboard" className="flex items-center gap-2">
            <span className="text-white font-bold text-lg">Client Portal</span>
          </Link>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1 scrollbar-thin scrollbar-thumb-slate-800">
          {navItems.map((item) => {
            const isActive = location.pathname.startsWith(item.href);
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                  isActive 
                    ? "bg-[#0066CC] text-white" 
                    : "text-slate-400 hover:bg-slate-800 hover:text-white"
                )}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon className="w-5 h-5" />
                {item.name}
              </Link>
            )
          })}
        </div>

        <div className="p-4 bg-slate-950/50">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-white font-bold uppercase overflow-hidden">
              {user?.avatarUrl ? <img src={user.avatarUrl} alt="" className="w-full h-full object-cover" /> : user?.displayName?.charAt(0) || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{user?.displayName}</p>
              <p className="text-xs text-slate-500 truncate">Client Account</p>
            </div>
          </div>
          <button 
            onClick={signOut}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm font-medium text-slate-400 rounded-lg hover:bg-slate-800 hover:text-white transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Topbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 sm:px-6 lg:px-8 z-10">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-slate-500 hover:text-slate-700"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-semibold text-slate-800 hidden sm:block">Welcome, {user?.displayName}</h1>
          </div>
          <div className="flex items-center gap-4">
             <button className="relative p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#0066CC] border border-white"></span>
                <Bell className="w-5 h-5" />
             </button>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
