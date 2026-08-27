import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Invoice, Client } from '@/types';
import { FileArchive, CheckCircle2, Clock, Plus, Search, Filter, Download } from 'lucide-react';
import { motion } from 'motion/react';
import { format } from 'date-fns';

export default function Invoices() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<Record<string, Client>>({});
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const invoicesSnap = await getDocs(collection(db, 'organizations', 'demo-org', 'invoices'));
        setInvoices(invoicesSnap.docs.map(d => ({ id: d.id, ...d.data() } as Invoice)));
        
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

  const filteredInvoices = invoices.filter(inv => 
    inv.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) || 
    clients[inv.clientId]?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Invoices & Billing</h2>
          <p className="text-sm text-slate-500">Manage client invoices and track payments.</p>
        </div>
        <button className="bg-[#0066CC] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Create Invoice
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Outstanding', value: 'AED 124,500', color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Overdue', value: 'AED 18,200', color: 'text-rose-600', bg: 'bg-rose-50' },
          { label: 'Collected (MTD)', value: 'AED 45,000', color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Drafts', value: '3', color: 'text-slate-600', bg: 'bg-slate-50' }
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
              placeholder="Search invoices..." 
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
                <th className="p-4 font-medium">Invoice Number</th>
                <th className="p-4 font-medium">Client</th>
                <th className="p-4 font-medium">Amount</th>
                <th className="p-4 font-medium">Due Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-500">Loading invoices...</td>
                </tr>
              ) : filteredInvoices.length > 0 ? (
                filteredInvoices.map((invoice) => (
                  <tr key={invoice.id} className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-medium text-slate-900">{invoice.invoiceNumber}</td>
                    <td className="p-4 text-slate-600">{clients[invoice.clientId]?.name || 'Unknown'}</td>
                    <td className="p-4 font-medium text-slate-900">AED {invoice.total?.toLocaleString()}</td>
                    <td className="p-4 text-slate-500 text-sm">
                      {invoice.dueDate ? format(new Date(invoice.dueDate), 'MMM d, yyyy') : 'N/A'}
                    </td>
                    <td className="p-4">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                        invoice.status === 'Paid' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                        invoice.status === 'Sent' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                        invoice.status === 'Overdue' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                        'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}>
                        {invoice.status}
                      </span>
                    </td>
                    <td className="p-4 text-right">
                      <button className="p-1.5 text-slate-400 hover:text-blue-600 transition-colors" title="Download PDF">
                        <Download className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center">
                      <FileArchive className="w-10 h-10 text-slate-300 mb-3" />
                      <p>No invoices found matching your criteria.</p>
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
