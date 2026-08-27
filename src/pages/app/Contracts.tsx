import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { FileText, Plus, Search, Filter, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { format } from 'date-fns';

export default function Contracts() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating load for now
    setTimeout(() => setLoading(false), 500);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Contracts & Billing</h2>
          <p className="text-sm text-slate-500">Manage MSAs, SLAs, and recurring billing agreements.</p>
        </div>
        <button className="bg-[#0066CC] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Contract
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Contracts', value: '48', color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'MRR', value: 'AED 385k', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Expiring Soon (30d)', value: '3', color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Pending Signature', value: '5', color: 'text-slate-600', bg: 'bg-slate-50' }
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between hover:shadow-md transition-shadow">
            <span className="text-sm font-medium text-slate-500 mb-2">{kpi.label}</span>
            <span className={`text-2xl font-bold ${kpi.color}`}>{kpi.value}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden min-h-[400px]">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search contracts..." 
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium text-slate-600 hover:bg-slate-50">
            <Filter className="w-4 h-4" />
            Filter
          </button>
        </div>

        <div className="flex flex-col items-center justify-center h-[300px] text-slate-500">
          <FileText className="w-12 h-12 text-slate-300 mb-4" />
          <p>No contracts configured yet.</p>
        </div>
      </div>
    </motion.div>
  );
}
