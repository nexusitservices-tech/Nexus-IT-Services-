import { useState, useEffect } from 'react';
import useSWR from 'swr';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, Users, Zap, Briefcase, LifeBuoy, DollarSign, Bot, Clock, Plus, Upload, Sparkles } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { db } from '@/lib/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useAuthStore } from '@/store/authStore';
import { Skeleton } from '@/components/ui/skeleton';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const fetchDashboardStats = async (orgId: string) => {
  const clientsSnap = await getDocs(query(collection(db, 'organizations', orgId, 'clients')));
  
  const oppsSnap = await getDocs(query(collection(db, 'organizations', orgId, 'opportunities')));
  let openOpportunitiesCount = 0;
  let pipelineValue = 0;
  const stageData: Record<string, number> = {};

  oppsSnap.docs.forEach(doc => {
    const data = doc.data();
    if (data.stage !== 'Won' && data.stage !== 'Lost') {
      openOpportunitiesCount++;
      if (data.estimatedValue) {
        pipelineValue += data.estimatedValue;
        stageData[data.stage] = (stageData[data.stage] || 0) + data.estimatedValue;
      }
    }
  });

  const pipelineChartData = Object.entries(stageData).map(([name, value]) => ({ name, value })).sort((a, b) => b.value - a.value);

  const projectsSnap = await getDocs(query(collection(db, 'organizations', orgId, 'projects')));
  let projectsInProgress = 0;
  const projectHealthData: Record<string, number> = {};

  projectsSnap.docs.forEach(doc => {
    const data = doc.data();
    if (data.status === 'Active' || data.status === 'At Risk' || data.status === 'Blocked') {
      projectsInProgress++;
    }
    projectHealthData[data.status] = (projectHealthData[data.status] || 0) + 1;
  });

  const healthChartData = Object.entries(projectHealthData).map(([name, value]) => ({ name, value }));

  const ticketsSnap = await getDocs(query(collection(db, 'organizations', orgId, 'tickets')));
  let unresolvedTickets = 0;
  ticketsSnap.docs.forEach(doc => {
    if (doc.data().status !== 'Resolved' && doc.data().status !== 'Closed') {
      unresolvedTickets++;
    }
  });

  return {
    activeClients: clientsSnap.size,
    openOpportunities: openOpportunitiesCount,
    pipelineValue,
    projectsInProgress,
    unresolvedTickets,
    pipelineChartData,
    healthChartData
  };
};

const PROJECT_COLORS = {
  'Active': '#2563eb',    // blue-600
  'At Risk': '#f59e0b',   // amber-500
  'Blocked': '#ef4444',   // red-500
  'Completed': '#10b981', // emerald-500
  'Planning': '#64748b',  // slate-500
  'On Hold': '#94a3b8'    // slate-400
};

export default function Dashboard() {
  const { user } = useAuthStore();
  
  const { data: stats, isLoading } = useSWR(
    user?.organizationId ? ['dashboardStats', user.organizationId] : null,
    ([, orgId]) => fetchDashboardStats(orgId),
    { revalidateOnFocus: false }
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="show" className="space-y-8">
      {/* Header & Quick Actions */}
      <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.displayName?.split(' ')[0] || 'User'}</h1>
          <p className="text-slate-500">Here's what's happening in your organization today.</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/app/leads" className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-sm">
            <Plus className="w-4 h-4 text-slate-500" /> Lead
          </Link>
          <Link to="/app/opportunities" className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-sm">
            <Plus className="w-4 h-4 text-slate-500" /> Opp
          </Link>
          <Link to="/app/projects" className="px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors flex items-center gap-1.5 shadow-sm">
            <Plus className="w-4 h-4 text-slate-500" /> Project
          </Link>
          <Link to="/app/ai" className="px-3 py-2 bg-blue-50 border border-blue-100 text-blue-700 rounded-lg text-sm font-medium hover:bg-blue-100 transition-colors flex items-center gap-1.5 shadow-sm">
            <Sparkles className="w-4 h-4" /> Ask AI
          </Link>
        </div>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard variants={itemVariants} title="Active Clients" value={stats?.activeClients} icon={Users} color="text-blue-600" bg="bg-blue-50" isLoading={isLoading} />
        <StatCard variants={itemVariants} title="Open Opps" value={stats?.openOpportunities} icon={Zap} color="text-amber-600" bg="bg-amber-50" isLoading={isLoading} />
        <StatCard variants={itemVariants} title="Pipeline (AED)" value={stats?.pipelineValue?.toLocaleString()} icon={DollarSign} color="text-emerald-600" bg="bg-emerald-50" isLoading={isLoading} />
        <StatCard variants={itemVariants} title="Active Projects" value={stats?.projectsInProgress} icon={Briefcase} color="text-indigo-600" bg="bg-indigo-50" isLoading={isLoading} />
        <StatCard variants={itemVariants} title="Open Tickets" value={stats?.unresolvedTickets} icon={LifeBuoy} color="text-rose-600" bg="bg-rose-50" isLoading={isLoading} />
        <StatCard variants={itemVariants} title="Avg Response" value="1.2h" icon={Clock} color="text-purple-600" bg="bg-purple-50" isLoading={isLoading} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Chart */}
        <motion.div variants={itemVariants} className="lg:col-span-2">
          <Card className="shadow-sm border-slate-200 h-full flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-slate-800">Pipeline by Stage</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-[300px]">
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center"><Skeleton className="w-3/4 h-3/4 rounded-lg" /></div>
              ) : stats?.pipelineChartData && stats.pipelineChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stats.pipelineChartData} margin={{ top: 10, right: 10, left: 20, bottom: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} dy={10} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12}} tickFormatter={(val) => `AED ${(val/1000).toFixed(0)}k`} />
                    <RechartsTooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} formatter={(val: number) => [`AED ${val.toLocaleString()}`, 'Value']} />
                    <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} maxBarSize={60} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">No pipeline data available.</div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Project Health */}
        <motion.div variants={itemVariants}>
          <Card className="shadow-sm border-slate-200 h-full flex flex-col">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg font-bold text-slate-800">Project Health</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 min-h-[300px] flex flex-col">
              {isLoading ? (
                <div className="w-full h-full flex items-center justify-center"><Skeleton className="w-48 h-48 rounded-full" /></div>
              ) : stats?.healthChartData && stats.healthChartData.length > 0 ? (
                <>
                  <div className="flex-1 relative">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={stats.healthChartData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {stats.healthChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={PROJECT_COLORS[entry.name as keyof typeof PROJECT_COLORS] || '#cbd5e1'} />
                          ))}
                        </Pie>
                        <RechartsTooltip contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                      </PieChart>
                    </ResponsiveContainer>
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none flex-col">
                      <span className="text-3xl font-bold text-slate-800">{stats.projectsInProgress}</span>
                      <span className="text-xs text-slate-500 font-medium">Active</span>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    {stats.healthChartData.map(entry => (
                      <div key={entry.name} className="flex items-center justify-between text-xs p-2 bg-slate-50 rounded-md">
                        <div className="flex items-center gap-1.5">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PROJECT_COLORS[entry.name as keyof typeof PROJECT_COLORS] || '#cbd5e1' }}></span>
                          <span className="text-slate-600 font-medium">{entry.name}</span>
                        </div>
                        <span className="font-bold text-slate-900">{entry.value}</span>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center text-slate-400 text-sm">No project data.</div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div variants={itemVariants}>
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-800">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-5">
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
                      <p className="text-sm font-medium text-slate-800">{activity.text}</p>
                      <p className="text-xs text-slate-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        <motion.div variants={itemVariants}>
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-slate-800">Nexus AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-blue-50 to-emerald-50 rounded-xl border border-blue-100 flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-blue-600">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">Pipeline Anomaly Detected</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      The "Oasis Estates - Phase 2" opportunity has been in the Solution Design stage for 14 days (avg is 4 days). Consider scheduling a follow-up call.
                    </p>
                    <button className="mt-2 text-xs font-semibold text-blue-700 hover:text-blue-800">Generate draft email &rarr;</button>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm text-slate-600">
                    <Bot className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-800 text-sm mb-1">Ticket Categorization Running</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      AI Automation successfully categorized 12 incoming support tickets this morning, routing them directly to the L2 Networking team.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}

function StatCard({ title, value, icon: Icon, color, bg, isLoading, variants }: any) {
  return (
    <motion.div variants={variants}>
      <Card className="shadow-sm border-slate-200 h-full overflow-hidden hover:shadow-md transition-shadow">
        <CardContent className="p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className={`w-10 h-10 rounded-lg ${bg} ${color} flex items-center justify-center shrink-0`}>
              <Icon className="w-5 h-5" />
            </div>
          </div>
          <div>
            {isLoading ? (
              <Skeleton className="h-7 w-16 mb-1" />
            ) : (
              <h3 className="text-xl lg:text-2xl font-bold text-slate-900">{value ?? 0}</h3>
            )}
            <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-0.5">{title}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
