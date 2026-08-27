import { useAuthStore } from '@/store/authStore';

export default function PortalProfile() {
  const { user } = useAuthStore();
  
  return (
    <div className="max-w-3xl space-y-6">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="border-b border-slate-100 p-6">
          <h2 className="text-lg font-semibold text-slate-800">My Profile</h2>
        </div>
        <div className="p-6 space-y-6">
          <div className="flex items-center gap-6">
             <div className="w-20 h-20 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-2xl uppercase">
               {user?.displayName?.charAt(0) || 'U'}
             </div>
             <div>
               <h3 className="text-xl font-semibold text-slate-900">{user?.displayName}</h3>
               <p className="text-slate-500">{user?.email}</p>
             </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-slate-100">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <input type="text" readOnly value={user?.displayName || ''} className="w-full px-3 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <input type="text" readOnly value={user?.email || ''} className="w-full px-3 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
              <input type="text" readOnly value="Client User" className="w-full px-3 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-600" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Account Status</label>
              <input type="text" readOnly value={user?.clientId ? 'Verified' : 'Pending Admin Verification'} className="w-full px-3 py-2 border border-slate-300 rounded-md bg-slate-50 text-slate-600" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
