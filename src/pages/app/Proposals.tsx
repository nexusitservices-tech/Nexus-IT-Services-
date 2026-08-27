import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Proposal, Client } from '@/types';
import { FileSignature, Plus, Search, Filter, FileText, Send } from 'lucide-react';
import { motion } from 'motion/react';
import { format } from 'date-fns';

export default function Proposals() {
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [clients, setClients] = useState<Record<string, Client>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propsSnap = await getDocs(collection(db, 'organizations', 'demo-org', 'proposals'));
        setProposals(propsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Proposal)));
        
        const clientsSnap = await getDocs(collection(db, 'organizations', 'demo-org', 'clients'));
        const clientMap: Record<string, Client> = {};
        clientsSnap.docs.forEach(d => { clientMap[d.id] = d.data() as Client; });
        setClients(clientMap);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredProposals = proposals.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    clients[p.clientId || '']?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Proposals & Quoting</h2>
          <p className="text-sm text-slate-500">Draft, send, and track client proposals.</p>
        </div>
        <button className="bg-[#0066CC] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Proposal
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search proposals..." 
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
                <th className="p-4 font-medium">Title</th>
                <th className="p-4 font-medium">Client</th>
                <th className="p-4 font-medium">Value</th>
                <th className="p-4 font-medium">Valid Until</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">Loading proposals...</td>
                </tr>
              ) : filteredProposals.length > 0 ? (
                filteredProposals.map((proposal) => (
                  <tr key={proposal.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{proposal.title}</td>
                    <td className="p-4 text-slate-600">{clients[proposal.clientId || '']?.name || 'Unknown'}</td>
                    <td className="p-4 font-medium text-slate-900">AED {proposal.value?.toLocaleString() || '0'}</td>
                    <td className="p-4 text-slate-500 text-sm">
                      {proposal.validUntil ? format(new Date(proposal.validUntil), 'MMM d, yyyy') : 'N/A'}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        proposal.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        proposal.status === 'Sent' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        proposal.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {proposal.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors" title="View PDF">
                          <FileText className="w-4 h-4" />
                        </button>
                        {proposal.status === 'Draft' && (
                          <button className="p-1.5 text-slate-400 hover:text-emerald-600 transition-colors" title="Send to Client">
                            <Send className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <FileSignature className="w-10 h-10 text-slate-300 mb-3" />
                      <p>No proposals found matching your criteria.</p>
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
