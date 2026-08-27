import { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { cn } from '@/lib/utils';
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '@/components/ui/tooltip';
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Target,
  FileText,
  CheckSquare,
  LifeBuoy,
  Monitor,
  FileSignature,
  FileArchive,
  MessageSquare,
  Zap,
  Sparkles,
  BarChart3,
  LogOut,
  Bell,
  Search,
  Menu,
  X,
  FolderOpen,
  Bot,
  Calendar,
  Settings,
  ShieldAlert
} from 'lucide-react';

const navItems = [
  { name: 'Dashboard', href: '/app/dashboard', icon: LayoutDashboard },
  { name: 'Leads', href: '/app/leads', icon: Target },
  { name: 'Opportunities', href: '/app/opportunities', icon: Zap },
  { name: 'Clients', href: '/app/clients', icon: Users },
  { name: 'Proposals', href: '/app/proposals', icon: FileSignature },
  { name: 'Projects', href: '/app/projects', icon: Briefcase },
  { name: 'Tasks', href: '/app/tasks', icon: CheckSquare },
  { name: 'Service Desk', href: '/app/service-desk', icon: LifeBuoy },
  { name: 'Assets', href: '/app/assets', icon: Monitor },
  { name: 'Contracts', href: '/app/contracts', icon: FileText },
  { name: 'Invoices', href: '/app/invoices', icon: FileArchive },
  { name: 'Files', href: '/app/files', icon: FolderOpen },
  { name: 'Messages', href: '/app/messages', icon: MessageSquare },
  { name: 'Automations', href: '/app/automations', icon: Bot },
  { name: 'AI Copilot', href: '/app/ai', icon: Sparkles },
  { name: 'Analytics', href: '/app/analytics', icon: BarChart3 },
  { name: 'Team', href: '/app/users', icon: Users },
  { name: 'Calendar', href: '/app/calendar', icon: Calendar },
  { name: 'Settings', href: '/app/settings', icon: Settings },
  { name: 'Audit Log', href: '/app/audit-log', icon: ShieldAlert },
];

export default function AppLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuthStore();

  return (
    <TooltipProvider>
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
            <Link to="/app/dashboard" className="flex items-center gap-2">
              <img 
                src="/logo.gif" 
                alt="Nexus IT Services" 
                className="h-8 object-contain bg-white/10 p-1 rounded" 
              />
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
                      ? "bg-blue-600 text-white" 
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
                <p className="text-xs text-slate-500 truncate">{user?.role?.replace('_', ' ')}</p>
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
              <div className="relative hidden sm:block">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-slate-400" />
                </div>
                <input 
                  type="text" 
                  placeholder="Search..." 
                  className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg text-sm placeholder-slate-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-slate-50"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button className="relative p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors">
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 border border-white"></span>
                    <Bell className="w-5 h-5" />
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Notifications</p>
                </TooltipContent>
              </Tooltip>
              <button className="hidden sm:flex bg-blue-600 text-white px-3 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                + Quick Create
              </button>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
            <Outlet />
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
