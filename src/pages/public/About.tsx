import { motion } from 'motion/react';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';
import { Target, Lightbulb, Users, CheckCircle, ShieldCheck, Zap, Handshake, BarChart } from 'lucide-react';
import { cn } from '@/lib/utils';

const VALUES = [
  { icon: ShieldCheck, title: 'Integrity', desc: 'Transparent pricing and honest recommendations — always.' },
  { icon: Target, title: 'Excellence', desc: 'Professional-grade delivery on every engagement, regardless of size.' },
  { icon: Zap, title: 'Innovation', desc: 'Continuous adoption of new AI and automation capability, ahead of the curve.' },
  { icon: Handshake, title: 'Partnership', desc: 'We treat every client relationship as a long-term partnership, not a transaction.' },
  { icon: CheckCircle, title: 'Accountability', desc: 'Clear ownership and clear reporting on everything we deliver.' },
  { icon: BarChart, title: 'Agility', desc: 'Fast, responsive scoping and delivery — built for how businesses actually move.' }
];

export default function About() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#0066CC] selection:text-white overflow-x-hidden">
      <PublicNavbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative">
        <div className="absolute top-20 right-20 w-[400px] h-[400px] bg-blue-400/10 rounded-full blur-[80px] -z-10 animate-pulse"></div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-[#0066CC] font-bold tracking-widest uppercase text-sm mb-4">About Nexus IT Services</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
            One technology partner.<br />
            <span className="text-[#0066CC]">Every capability your business needs.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Nexus IT Services is a UAE-based technology and business solutions company built for organizations that want to grow without the complexity of managing five different vendors.
          </p>
        </motion.div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12">
            <div className="bg-blue-50/50 rounded-3xl p-10 border border-blue-100">
              <div className="w-14 h-14 bg-[#0066CC] text-white rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                To empower businesses and individuals through innovative technology, professional services, and digital transformation that simplify operations, improve efficiency, and deliver measurable results.
              </p>
            </div>
            <div className="bg-teal-50/50 rounded-3xl p-10 border border-teal-100">
              <div className="w-14 h-14 bg-[#00C9A7] text-white rounded-2xl flex items-center justify-center mb-6">
                <Lightbulb className="w-7 h-7" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Our Vision</h2>
              <p className="text-lg text-slate-700 leading-relaxed">
                To become a leading technology and business solutions company across the GCC — and beyond — known for integrated, innovative, and customer-focused delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Our Values</h2>
          <p className="text-lg text-slate-600 mt-4">The principles that guide our work and client relationships.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {VALUES.map((v, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="w-12 h-12 bg-slate-50 text-[#0066CC] rounded-xl flex items-center justify-center mb-6 border border-slate-100 shadow-sm">
                <v.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{v.title}</h3>
              <p className="text-slate-600 leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-[#0F172A] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-[#00C9A7] font-bold tracking-widest uppercase text-sm mb-4">Why Businesses Choose Us</p>
              <h2 className="text-3xl md:text-5xl font-extrabold mb-8 tracking-tight">We remove the complexity of modern technology.</h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                So you can focus on running your business. Start with one project, scale into an ongoing managed relationship as your needs grow.
              </p>
            </div>
            <div className="space-y-6">
              {[
                { title: 'One partner, not five vendors', desc: 'Every capability under one roof means less coordination, fewer handoffs, and one team that truly understands your business.' },
                { title: 'AI built in, not bolted on', desc: 'We design automation and AI into your systems from day one — not as an expensive afterthought.' },
                { title: 'Transparent, fixed pricing', desc: 'Clear packages and proposals, agreed upfront — no surprise invoices.' },
                { title: 'Local presence, responsive delivery', desc: 'A UAE-based team that understands the market you operate in and responds when you need us.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#0066CC] flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-slate-400">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
