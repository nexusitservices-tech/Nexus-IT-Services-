import { useState, useEffect } from 'react';
import { collection, query, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Task } from '@/types';
import { CheckSquare, Plus, Search, Filter, Clock, MoreVertical } from 'lucide-react';
import { motion } from 'motion/react';
import { format } from 'date-fns';

export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tasksSnap = await getDocs(collection(db, 'organizations', 'demo-org', 'tasks'));
        setTasks(tasksSnap.docs.map(d => ({ id: d.id, ...d.data() } as Task)));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredTasks = tasks.filter(t => 
    t.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    t.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderStatus = (status: string) => {
    switch (status) {
      case 'Done': return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">Done</span>;
      case 'Review': return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">Review</span>;
      case 'In Progress': return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">In Progress</span>;
      default: return <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">Todo</span>;
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Task Management</h2>
          <p className="text-sm text-slate-500">Track and manage internal and project tasks.</p>
        </div>
        <button className="bg-[#0066CC] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2">
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-200px)] min-h-[500px]">
        <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row gap-4 items-center justify-between bg-slate-50/50">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search tasks..." 
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

        <div className="flex-1 overflow-auto p-4 bg-slate-50">
          {loading ? (
            <div className="w-full h-full flex items-center justify-center text-slate-500">Loading tasks...</div>
          ) : filteredTasks.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 items-start">
              {['Todo', 'In Progress', 'Review', 'Done'].map(status => (
                <div key={status} className="bg-slate-100/50 rounded-lg p-3 min-h-[300px] border border-slate-200">
                  <h3 className="font-bold text-slate-800 text-sm mb-3 flex items-center justify-between">
                    {status}
                    <span className="bg-white px-2 py-0.5 rounded text-xs text-slate-500 shadow-sm">
                      {filteredTasks.filter(t => t.status === status || (status === 'Todo' && !t.status)).length}
                    </span>
                  </h3>
                  <div className="space-y-3">
                    {filteredTasks.filter(t => t.status === status || (status === 'Todo' && !t.status)).map(task => (
                      <div key={task.id} className="bg-white p-3 rounded shadow-sm border border-slate-200 hover:border-blue-300 transition-colors cursor-pointer group">
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="text-sm font-semibold text-slate-800 line-clamp-2">{task.title}</h4>
                          <button className="text-slate-400 hover:text-slate-600 opacity-0 group-hover:opacity-100 transition-opacity">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                        {task.dueDate && (
                          <div className="flex items-center gap-1.5 text-xs text-slate-500 mb-2">
                            <Clock className="w-3 h-3" />
                            {format(new Date(task.dueDate), 'MMM d')}
                          </div>
                        )}
                        <div className="flex items-center justify-between mt-3">
                          <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center text-[10px] font-bold">
                            UN
                          </div>
                          {renderStatus(task.status || 'Todo')}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-500">
              <CheckSquare className="w-10 h-10 text-slate-300 mb-3" />
              <p>No tasks found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
