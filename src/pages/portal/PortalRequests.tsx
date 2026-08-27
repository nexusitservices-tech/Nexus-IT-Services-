import React from "react";
import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuthStore } from '@/store/authStore';
import { Ticket } from '@/types';
import { MessageSquare, Plus, X } from 'lucide-react';

export default function PortalRequests() {
  const { user } = useAuthStore();
  const [requests, setRequests] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newRequest, setNewRequest] = useState({ subject: '', category: 'General', description: '' });

  const fetchRequests = async () => {
    if (!user?.id) return;
    try {
      const q = query(
        collection(db, 'organizations', 'demo-org', 'tickets'),
        where('requesterId', '==', user.id)
      );
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Ticket));
      setRequests(data);
    } catch (err) {
      console.error('Error fetching requests:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    try {
      await addDoc(collection(db, 'organizations', 'demo-org', 'tickets'), {
        requesterId: user.id,
        clientId: user.clientId || 'unverified',
        subject: newRequest.subject,
        category: newRequest.category,
        description: newRequest.description,
        status: 'New',
        priority: 'Medium',
        ticketNumber: `REQ-${Math.floor(Math.random() * 10000)}`,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
      setIsModalOpen(false);
      setNewRequest({ subject: '', category: 'General', description: '' });
      fetchRequests();
    } catch (err) {
      console.error('Error submitting request:', err);
    }
  };

  if (loading) return <div className="p-8 text-slate-500">Loading requests...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Service Requests</h2>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-[#0066CC] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          New Request
        </button>
      </div>

      {requests.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mx-auto mb-4">
             <MessageSquare className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">No Service Requests</h3>
          <p className="text-slate-500 max-w-md mx-auto mb-6">
            You haven't submitted any service requests yet. If you need assistance or a new service, click the button below.
          </p>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="text-[#0066CC] font-medium hover:underline"
          >
            Create a new request
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Ticket</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900">{request.ticketNumber}</td>
                  <td className="px-6 py-4 text-sm text-slate-500">{request.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-amber-100 text-amber-800">
                      {request.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                    {new Date(request.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* New Request Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-slate-100">
              <h3 className="text-lg font-semibold text-slate-900">New Service Request</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <input 
                  type="text" 
                  required
                  value={newRequest.subject}
                  onChange={e => setNewRequest({...newRequest, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500" 
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                <select 
                  value={newRequest.category}
                  onChange={e => setNewRequest({...newRequest, category: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                >
                  <option value="General">General Inquiry</option>
                  <option value="IT Support">IT Support</option>
                  <option value="New Project">New Project Request</option>
                  <option value="Billing">Billing Question</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
                <textarea 
                  required
                  rows={4}
                  value={newRequest.description}
                  onChange={e => setNewRequest({...newRequest, description: e.target.value})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                ></textarea>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-sm font-medium text-white bg-[#0066CC] rounded-md hover:bg-blue-700"
                >
                  Submit Request
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
