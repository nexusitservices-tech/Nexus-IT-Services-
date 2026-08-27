import { motion } from 'motion/react';
import { Wrench } from 'lucide-react';

export default function PlaceholderModule({ title }: { title: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center h-[70vh] text-center px-4"
    >
      <div className="w-20 h-20 bg-blue-50 border border-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
        <Wrench className="w-10 h-10" />
      </div>
      <h2 className="text-3xl font-bold text-slate-900 mb-4">{title}</h2>
      <p className="text-slate-500 max-w-lg leading-relaxed text-lg">
        This module is part of the Nexus IT Services architecture and is scheduled for implementation in the next MVP phase.
      </p>
    </motion.div>
  );
}
