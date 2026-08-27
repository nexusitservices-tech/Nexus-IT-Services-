import { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Ticket, User, Client } from '@/types';
import { LifeBuoy } from 'lucide-react';

export default function ServiceDesk() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [users, setUsers] = useState<Record<string, User>>({});
  const [clients, setClients] = useState<Record<string, Client>>({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const ticketsSnap = await getDocs(collection(db, 'organizations', 'demo-org', 'tickets'));
      setTickets(ticketsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Ticket)));
      
      const usersSnap = await getDocs(collection(db, 'users'));
      const userMap: Record<string, User> = {};
      usersSnap.docs.forEach(d => { userMap[d.id] = d.data() as User; });
      setUsers(userMap);

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

  useEffect(() => {
    fetchData();
  }, []);

  const handleUpdateStatus = async (ticketId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'organizations', 'demo-org', 'tickets', ticketId), { 
        status, 
        updatedAt: new Date().toISOString() 
      });
      fetchData();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  if (loading) return <div className="p-8 text-slate-500">Loading service desk...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Service Desk</h2>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <LifeBuoy className="w-5 h-5 text-slate-400" />
            <h3 className="font-semibold text-slate-800">Client Requests</h3>
          </div>
        </div>
        
        {tickets.length === 0 ? (
          <div className="p-12 text-center text-slate-500">No service requests found.</div>
        ) : (
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ticket</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Requester</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {tickets.map((t) => (
                <tr key={t.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{t.ticketNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <p className="text-sm font-medium text-slate-900">{users[t.requesterId]?.displayName || 'Unknown User'}</p>
                    <p className="text-xs text-slate-500">{t.clientId !== 'unverified' && clients[t.clientId] ? clients[t.clientId].name : 'Unverified Client'}</p>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-900 max-w-xs truncate">{t.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                     <select 
                       value={t.status}
                       onChange={(e) => handleUpdateStatus(t.id, e.target.value)}
                       className="text-sm border-slate-300 rounded-md focus:ring-[#0066CC] focus:border-[#0066CC]"
                     >
                       <option value="New">New</option>
                       <option value="In Progress">In Progress</option>
                       <option value="Waiting for Client">Waiting for Client</option>
                       <option value="Resolved">Resolved</option>
                     </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(t.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
