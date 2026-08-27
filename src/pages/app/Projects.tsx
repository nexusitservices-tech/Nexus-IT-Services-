import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Project, Client } from '@/types';
import { Briefcase, AlertCircle, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [clients, setClients] = useState<Record<string, Client>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const projectsSnap = await getDocs(collection(db, 'organizations', 'demo-org', 'projects'));
        setProjects(projectsSnap.docs.map(d => ({ id: d.id, ...d.data() } as Project)));
        
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

  if (loading) return <div className="p-8 text-slate-500">Loading projects...</div>;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800">Projects & Delivery</h2>
        <button className="bg-[#0066CC] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
          New Project
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <div key={project.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-slate-900 text-lg mb-1">{project.name}</h3>
                <p className="text-xs text-slate-500 flex items-center gap-1">
                  <Briefcase className="w-3 h-3" />
                  {clients[project.clientId]?.name || 'Unknown Client'}
                </p>
              </div>
              <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${
                project.status === 'Active' ? 'bg-blue-50 text-blue-700 border border-blue-200' :
                project.status === 'Completed' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                project.status === 'At Risk' ? 'bg-rose-50 text-rose-700 border border-rose-200' :
                'bg-slate-100 text-slate-700 border border-slate-200'
              }`}>
                {project.status}
              </span>
            </div>
            
            <p className="text-sm text-slate-600 mb-6 flex-1">{project.description}</p>
            
            <div className="border-t border-slate-100 pt-4 flex items-center justify-between text-xs text-slate-500">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                Due {new Date(project.endDate).toLocaleDateString()}
              </span>
            </div>
          </div>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full p-12 text-center text-slate-500 border-2 border-dashed border-slate-200 rounded-xl">
            No active projects found.
          </div>
        )}
      </div>
    </motion.div>
  );
}
