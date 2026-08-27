import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Zap, Briefcase, LifeBuoy, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuthStore } from '@/store/authStore';
import { Skeleton } from '@/components/ui/skeleton';

const mockPipelineData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];

const fetchDashboardStats = async (orgId: string) => {
  const clientsQuery = query(collection(db, 'organizations', orgId, 'clients'));
  const clientsSnap = await getDocs(clientsQuery);
  
  const oppsQuery = query(collection(db, 'organizations', orgId, 'opportunities'), where('stage', 'not-in', ['Won', 'Lost']));
  const oppsSnap = await getDocs(oppsQuery);

  const projectsQuery = query(collection(db, 'organizations', orgId, 'projects'), where('status', 'in', ['Active', 'At Risk']));
  const projectsSnap = await getDocs(projectsQuery);

  const ticketsQuery = query(collection(db, 'organizations', orgId, 'tickets'), where('status', 'not-in', ['Resolved', 'Closed']));
  const ticketsSnap = await getDocs(ticketsQuery);

  return {
    activeClients: clientsSnap.size,
    openOpportunities: oppsSnap.size,
    projectsInProgress: projectsSnap.size,
    unresolvedTickets: ticketsSnap.size
  };
};

export default function Dashboard() {
  const { user } = useAuthStore();
  
  const { data: stats, isLoading } = useSWR(
    user?.organizationId ? ['dashboardStats', user.organizationId] : null,
    ([, orgId]) => fetchDashboardStats(orgId),
    { revalidateOnFocus: false }
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.displayName?.split(' ')[0] || 'User'}</h1>
          <p className="text-slate-500">Here's what's happening in your organization today.</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard title="Active Clients" value={stats?.activeClients} icon={Users} color="text-blue-600" bg="bg-blue-50" isLoading={isLoading} />
        <StatCard title="Open Opportunities" value={stats?.openOpportunities} icon={Zap} color="text-amber-600" bg="bg-amber-50" isLoading={isLoading} />
        <StatCard title="Active Projects" value={stats?.projectsInProgress} icon={Briefcase} color="text-emerald-600" bg="bg-emerald-50" isLoading={isLoading} />
        <StatCard title="Unresolved Tickets" value={stats?.unresolvedTickets} icon={LifeBuoy} color="text-rose-600" bg="bg-rose-50" isLoading={isLoading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pipeline Chart */}
        <Card className="lg:col-span-2 shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800">Pipeline Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockPipelineData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} />
                  <RechartsTooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Activity Feed */}
        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-slate-800">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[
                { time: '10m ago', text: 'Sarah closed the Acme Corp opportunity', icon: Target, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { time: '1h ago', text: 'New support ticket #4422 from TechLogistics', icon: LifeBuoy, color: 'text-rose-600', bg: 'bg-rose-50' },
                { time: '3h ago', text: 'Project Milestone approved for Oasis Estates', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
                { time: 'Yesterday', text: 'Proposal sent to Alpha Startups', icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
              ].map((activity, i) => (
                <div key={i} className="flex gap-4">
                  <div className={`w-8 h-8 rounded-full ${activity.bg} ${activity.color} flex items-center justify-center shrink-0`}>
                    <activity.icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-800">{activity.text}</p>
                    <p className="text-xs text-slate-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, color, bg, isLoading }: any) {
  return (
    <Card className="shadow-sm border-slate-200">
      <CardContent className="p-6 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          {isLoading ? (
            <Skeleton className="h-8 w-16 mt-1" />
          ) : (
            <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
