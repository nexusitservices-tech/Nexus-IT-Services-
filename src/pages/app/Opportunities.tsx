import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuthStore } from '@/store/authStore';
import { Opportunity, OpportunityStage } from '@/types';
import { Plus, Search, MoreHorizontal, Calendar, DollarSign } from 'lucide-react';

const STAGES: OpportunityStage[] = [
  'Discovery', 'Qualification', 'Solution Design', 'Proposal Sent', 'Negotiation', 'Won', 'Lost'
];

export default function Opportunities() {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuthStore();

  useEffect(() => {
    async function fetchOpps() {
      if (!user?.organizationId) return;
      try {
        const q = query(collection(db, 'organizations', user.organizationId, 'opportunities'));
        const querySnapshot = await getDocs(q);
        const fetched = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Opportunity));
        setOpportunities(fetched);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchOpps();
  }, [user]);

  const getOppsByStage = (stage: OpportunityStage) => {
    return opportunities.filter(opp => opp.stage === stage);
  };

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-AE', { style: 'currency', currency: 'AED', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Opportunities Pipeline</h1>
          <p className="text-slate-500">Track and manage your sales pipeline.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search..." 
              className="w-64 pl-9 pr-4 py-2 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 bg-white"
            />
          </div>
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
            <Plus className="w-5 h-5" />
            New Opportunity
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-300">
        <div className="flex gap-4 h-full min-w-max">
          {STAGES.map(stage => (
            <div key={stage} className="w-72 flex flex-col bg-slate-100/50 rounded-xl border border-slate-200/60 overflow-hidden">
              <div className="p-3 border-b border-slate-200 bg-slate-100 flex justify-between items-center shrink-0">
                <h3 className="font-semibold text-slate-800 text-sm">{stage}</h3>
                <span className="bg-white text-slate-600 text-xs font-bold px-2 py-0.5 rounded-full border border-slate-200">
                  {getOppsByStage(stage).length}
                </span>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-3">
                {getOppsByStage(stage).map(opp => (
                  <div key={opp.id} className="bg-white p-4 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-grab active:cursor-grabbing">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-slate-900 text-sm leading-tight">{opp.name}</h4>
                      <button className="text-slate-400 hover:text-blue-600 -mt-1 -mr-1 p-1">
                        <MoreHorizontal className="w-4 h-4" />
                      </button>
                    </div>
                    <p className="text-xs text-slate-500 mb-3">{opp.servicePillar}</p>
                    
                    <div className="flex items-center gap-4 text-xs text-slate-600">
                      <div className="flex items-center gap-1 font-medium text-slate-700">
                        <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                        {formatCurrency(opp.estimatedValue)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
