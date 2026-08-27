import { motion } from 'motion/react';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';

export default function Blog() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans">
      <PublicNavbar />
      <div className="pt-32 pb-20 px-4 max-w-7xl mx-auto text-center">
        <h1 className="text-4xl font-extrabold text-[#0B163B] mb-6">Latest Insights</h1>
        <p className="text-slate-600 text-lg mb-12">Read our latest articles on technology, business growth, and AI.</p>
        
        <div className="max-w-4xl mx-auto space-y-6 text-left">
           {[
             "How to Optimize Your Website Performance in 2026",
             "Growth Strategies For Small Businesses",
             "Understanding the Impact of AI on Logistics",
             "Cybersecurity Essentials for Remote Teams"
           ].map((title, i) => (
             <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:shadow-md transition-shadow">
               <div>
                 <span className="text-xs font-bold text-[#2563EB] uppercase tracking-wider mb-1 block">Technology</span>
                 <h3 className="font-bold text-xl mb-2">{title}</h3>
                 <p className="text-sm text-slate-500">Discover actionable insights and strategies to leverage modern technology for your business operations.</p>
               </div>
               <button className="shrink-0 bg-slate-50 text-[#0B163B] px-5 py-2 rounded-md font-semibold text-sm border border-slate-200 hover:bg-slate-100 transition-colors">
                 Read Article
               </button>
             </div>
           ))}
        </div>
      </div>
      <PublicFooter />
    </div>
  );
}
