import { useState, useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuthStore } from '@/store/authStore';
import { Project } from '@/types';
import { Briefcase } from 'lucide-react';

export default function PortalProjects() {
  const { user } = useAuthStore();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      if (!user?.clientId) {
        setLoading(false);
        return;
      }
      try {
        const q = query(
          collection(db, 'organizations', 'demo-org', 'projects'),
          where('clientId', '==', user.clientId)
        );
        const snapshot = await getDocs(q);
        const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Project));
        setProjects(data);
      } catch (err) {
        console.error('Error fetching projects:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [user]);

  if (loading) return <div className="p-8 text-slate-500">Loading projects...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-800">Projects & Onboarding</h2>
      </div>

      {!user?.clientId ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
          <div className="w-16 h-16 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 mx-auto mb-4">
             <Briefcase className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-medium text-slate-900 mb-2">Account Not Verified</h3>
          <p className="text-slate-500 max-w-md mx-auto">
            Your account has not been linked to a client profile yet. Please wait for an administrator to verify your account to view your projects.
          </p>
        </div>
      ) : projects.length === 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 p-12 text-center shadow-sm">
          <p className="text-slate-500">You don't have any active projects at this time.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map(project => (
            <div key={project.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="font-semibold text-slate-900">{project.name}</h3>
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700">
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-slate-600 mb-4">{project.description || 'No description provided.'}</p>
              <div className="text-xs text-slate-500">
                Started: {new Date(project.startDate).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
