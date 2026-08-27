import { Link } from 'react-router-dom';
import { useAuthStore } from '@/store/authStore';
import { Briefcase, MessageSquare, AlertCircle, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export default function PortalDashboard() {
  const { user } = useAuthStore();
  
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 100 } }
  };

  return (
    <motion.div 
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={itemVariants} layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div layout className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <motion.div layout className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Active Projects</h3>
            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
              <Briefcase className="w-5 h-5" />
            </div>
          </motion.div>
          <motion.p layout className="text-3xl font-bold text-slate-900">0</motion.p>
          <motion.p layout className="text-sm text-slate-500 mt-2">Awaiting admin assignment</motion.p>
        </motion.div>
        
        <motion.div layout className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
          <motion.div layout className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-slate-800">Open Requests</h3>
            <div className="w-10 h-10 rounded-full bg-amber-50 flex items-center justify-center text-amber-600">
              <MessageSquare className="w-5 h-5" />
            </div>
          </motion.div>
          <motion.p layout className="text-3xl font-bold text-slate-900">0</motion.p>
          <motion.p layout className="text-sm text-slate-500 mt-2">No active service tickets</motion.p>
        </motion.div>
      </motion.div>

      <motion.div variants={itemVariants} layout className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <motion.div layout className="border-b border-slate-100 p-6">
          <h2 className="text-lg font-semibold text-slate-800">Account Status</h2>
        </motion.div>
        <motion.div layout className="p-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 shrink-0">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-medium text-slate-900">Pending Verification</h3>
              <p className="text-slate-600 mt-1">
                Your account is currently unverified. An administrator will review your account and link it to your company profile to unlock your project details and service history.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
