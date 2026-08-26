import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Zap, Briefcase, LifeBuoy, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs, limit, orderBy } from 'firebase/firestore';
import { useAuthStore } from '@/store/authStore';

const mockPipelineData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
];

export default function Dashboard() {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    activeClients: 0,
    openOpportunities: 0,
    projectsInProgress: 0,
    unresolvedTickets: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!user?.organizationId) return;
      
      try {
        // In a real app with large collections, you might use aggregation queries or maintain a stats document.
        // For MVP, we'll do simple queries.
        
        const orgId = user.organizationId;
        
        const clientsQuery = query(collection(db, 'organizations', orgId, 'clients'));
        const clientsSnap = await getDocs(clientsQuery);
        
        const oppsQuery = query(collection(db, 'organizations', orgId, 'opportunities'), where('stage', 'not-in', ['Won', 'Lost']));
        const oppsSnap = await getDocs(oppsQuery);

        const projectsQuery = query(collection(db, 'organizations', orgId, 'projects'), where('status', 'in', ['Active', 'At Risk']));
        const projectsSnap = await getDocs(projectsQuery);

        const ticketsQuery = query(collection(db, 'organizations', orgId, 'tickets'), where('status', 'not-in', ['Resolved', 'Closed']));
        const ticketsSnap = await getDocs(ticketsQuery);

        setStats({
          activeClients: clientsSnap.size,
          openOpportunities: oppsSnap.size,
          projectsInProgress: projectsSnap.size,
          unresolvedTickets: ticketsSnap.size
        });
      } catch (error) {
        console.error("Failed to fetch dashboard stats", error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, [user]);

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
        <StatCard title="Active Clients" value={loading ? '...' : stats.activeClients} icon={Users} color="text-blue-600" bg="bg-blue-50" />
        <StatCard title="Open Opportunities" value={loading ? '...' : stats.openOpportunities} icon={Zap} color="text-amber-600" bg="bg-amber-50" />
        <StatCard title="Active Projects" value={loading ? '...' : stats.projectsInProgress} icon={Briefcase} color="text-emerald-600" bg="bg-emerald-50" />
        <StatCard title="Unresolved Tickets" value={loading ? '...' : stats.unresolvedTickets} icon={LifeBuoy} color="text-rose-600" bg="bg-rose-50" />
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

function StatCard({ title, value, icon: Icon, color, bg }: any) {
  return (
    <Card className="shadow-sm border-slate-200">
      <CardContent className="p-6 flex items-center gap-4">
        <div className={`w-12 h-12 rounded-xl ${bg} ${color} flex items-center justify-center shrink-0`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
        </div>
      </CardContent>
    </Card>
  );
}
