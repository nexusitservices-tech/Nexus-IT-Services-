import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Client } from '@/types';
import { Users, Plus, Search, Filter, Mail, Globe, Phone } from 'lucide-react';
import { motion } from 'motion/react';
import { format } from 'date-fns';

export default function Clients() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const clientsSnap = await getDocs(collection(db, 'organizations', 'demo-org', 'clients'));
        setClients(clientsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Client)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredClients = clients.filter(c => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.industry?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Client Management</h2>
          <p className="text-sm text-slate-500">Manage client relationships, profiles, and health scores.</p>
        </div>
        <button className="bg-[#0066CC] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Client
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Clients', value: clients.length.toString(), color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Avg Health Score', value: '92/100', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Active Projects', value: '14', color: 'text-indigo-600', bg: 'bg-indigo-50' },
          { label: 'At Risk', value: '0', color: 'text-rose-600', bg: 'bg-rose-50' }
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <span className="text-sm font-medium text-slate-500 mb-2">{kpi.label}</span>
            <span className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search clients..." 
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500">
                <th className="p-4 font-medium">Client Name</th>
                <th className="p-4 font-medium">Industry</th>
                <th className="p-4 font-medium">Contact</th>
                <th className="p-4 font-medium">Health</th>
                <th className="p-4 font-medium">Added</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">Loading clients...</td>
                </tr>
              ) : filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <tr key={client.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                          {client.name.substring(0,2).toUpperCase()}
                        </div>
                        {client.name}
                      </div>
                    </td>
                    <td className="p-4 text-slate-600">{client.industry || 'N/A'}</td>
                    <td className="p-4 text-slate-600">
                      <div className="flex items-center gap-2">
                        {client.website && (
                          <a href={client.website} target="_blank" rel="noreferrer" className="text-slate-400 hover:text-blue-600">
                            <Globe className="w-4 h-4" />
                          </a>
                        )}
                        <button className="text-slate-400 hover:text-blue-600">
                          <Mail className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-slate-200 rounded-full h-2 max-w-[80px]">
                          <div 
                            className={`h-2 rounded-full ${client.healthScore >= 80 ? 'bg-emerald-500' : client.healthScore >= 50 ? 'bg-amber-500' : 'bg-rose-500'}`} 
                            style={{ width: `${client.healthScore || 0}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-medium text-slate-600">{client.healthScore || 0}/100</span>
                      </div>
                    </td>
                    <td className="p-4 text-slate-500 text-sm">
                      {client.createdAt ? format(new Date(client.createdAt), 'MMM d, yyyy') : 'N/A'}
                    </td>
                    <td className="p-4 text-right">
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-800">View</button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <Users className="w-10 h-10 text-slate-300 mb-3" />
                      <p>No clients found matching your criteria.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.div>
  );
}
