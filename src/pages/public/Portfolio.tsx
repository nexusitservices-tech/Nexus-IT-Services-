import { motion } from 'motion/react';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <PublicNavbar />
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-[#0B163B] mb-6">Our Portfolio</h1>
        <p className="text-slate-600 text-lg mb-12">Explore our successful projects across the GCC.</p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
           {[1, 2, 3, 4, 5, 6].map((i) => (
             <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-lg transition-shadow">
               <div className="h-48 bg-slate-200 flex items-center justify-center">
                 <span className="text-slate-400 font-medium">Project Preview</span>
               </div>
               <div className="p-6">
                 <h3 className="font-bold text-lg mb-2">Enterprise Solution {i}</h3>
                 <p className="text-sm text-slate-500 mb-4">A comprehensive digital transformation project delivering measurable growth and efficiency.</p>
                 <a href="#" className="text-[#2563EB] font-semibold text-sm hover:underline">View Case Study &rarr;</a>
               </div>
             </div>
           ))}
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}
