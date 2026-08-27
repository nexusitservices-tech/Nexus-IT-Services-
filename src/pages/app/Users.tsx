import { useState, useEffect } from 'react';
import { collection, query, getDocs, doc, updateDoc, where } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { User, Client } from '@/types';
import { Users as UsersIcon, Shield, CheckCircle, Clock } from 'lucide-react';

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const usersSnap = await getDocs(query(collection(db, 'users'), where('organizationId', '==', 'demo-org')));
      setUsers(usersSnap.docs.map(d => ({ id: d.id, ...d.data() } as User)));
      
      const clientsSnap = await getDocs(collection(db, 'organizations', 'demo-org', 'clients'));
      setClients(clientsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Client)));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleVerifyClient = async (userId: string, clientId: string) => {
    try {
      await updateDoc(doc(db, 'users', userId), { clientId });
      fetchData();
    } catch (err) {
      console.error('Error verifying user:', err);
    }
  };

  const handleUpdateRole = async (userId: string, role: string) => {
    try {
      await updateDoc(doc(db, 'users', userId), { role });
      fetchData();
    } catch (err) {
      console.error('Error updating role:', err);
    }
  };

  if (loading) return <div className="p-8 text-slate-500">Loading users...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Users & Access Management</h2>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5 text-slate-400" />
            <h3 className="font-semibold text-slate-800">All Registered Users</h3>
          </div>
        </div>
        <table className="min-w-full divide-y divide-slate-200">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Client Association</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date Joined</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-slate-200">
            {users.map((u) => (
              <tr key={u.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs uppercase">
                      {u.displayName?.charAt(0) || 'U'}
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-slate-900">{u.displayName}</p>
                      <p className="text-sm text-slate-500">{u.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                   <select 
                     value={u.role}
                     onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                     className="text-sm border-slate-300 rounded-md focus:ring-[#0066CC] focus:border-[#0066CC]"
                   >
                     <option value="ADMIN">Admin</option>
                     <option value="CLIENT_USER">Client User</option>
                   </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {u.role === 'CLIENT_USER' ? (
                    <div className="flex items-center gap-2">
                      {u.clientId ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-emerald-500" />
                          <span className="text-sm text-slate-700">
                            {clients.find(c => c.id === u.clientId)?.name || 'Unknown Client'}
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4 text-amber-500" />
                          <select 
                            onChange={(e) => handleVerifyClient(u.id, e.target.value)}
                            className="text-sm border-amber-300 text-amber-700 bg-amber-50 rounded-md focus:ring-amber-500 focus:border-amber-500"
                          >
                            <option value="">Assign to Client...</option>
                            {clients.map(c => (
                              <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                          </select>
                        </>
                      )}
                    </div>
                  ) : (
                    <span className="text-sm text-slate-400 italic">Internal Staff</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                  {new Date(u.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
