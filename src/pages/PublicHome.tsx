import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Monitor, Megaphone, Target, Building2, Briefcase, 
  Code, Shield, CheckCircle2, PlayCircle, Globe,
  Layout
} from 'lucide-react';
import { cn } from '@/lib/utils';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';

export default function PublicHome() {
  const [formData, setFormData] = useState({ name: '', email: '', service: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleConsultationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setFormData({ name: '', email: '', service: '' });
      setTimeout(() => setIsSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#2563EB] selection:text-white">
      <PublicNavbar />

      {/* --- HERO SECTION --- */}
      <section 
        className="relative pt-32 pb-64 overflow-hidden bg-[#0B163B]"
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 82%, 0 100%)' }}
      >
        {/* Subtle background glow/effects */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent blur-3xl mix-blend-overlay"></div>
        <div className="absolute top-20 right-40 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Text */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              Technology.<br/>Simplified. Delivered.
            </h1>
            <p className="text-blue-100/80 text-lg mb-10 max-w-lg leading-relaxed font-light">
              Nexus IT Services is a UAE-based technology and business solutions company built for organizations that want to grow without the complexity of managing five different vendors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services" className="bg-[#2563EB] text-white px-8 py-3.5 rounded-md font-bold text-center hover:bg-blue-600 transition-colors shadow-lg shadow-blue-900/20">
                Our Services
              </Link>
              <Link to="/contact" className="bg-transparent border border-white/30 text-white px-8 py-3.5 rounded-md font-bold text-center hover:bg-white/10 transition-colors">
                Get Started Today
              </Link>
            </div>
          </motion.div>

          {/* Right Image/Graphic placeholder */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="relative hidden lg:block">
             <div className="w-[450px] h-[450px] ml-auto relative flex items-center justify-center">
               <div className="absolute inset-0 bg-gradient-to-tr from-[#2563EB]/20 to-transparent rounded-full blur-3xl"></div>
               
               {/* Central Hub */}
               <div className="relative z-20 w-32 h-32 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md border border-white/20 rounded-full flex flex-col items-center justify-center shadow-2xl shadow-blue-900/50">
                  <div className="w-10 h-10 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-xl italic mb-1 shadow-md">N</div>
                  <span className="text-white font-bold text-[10px] tracking-widest text-center uppercase">One Partner</span>
               </div>

               {/* Orbiting Elements */}
               <div className="absolute inset-4 border border-white/10 rounded-full animate-[spin_60s_linear_infinite]">
                  {/* IT Services */}
                  <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#0B163B] border border-blue-500/50 p-3 rounded-xl shadow-lg shadow-blue-900/20 flex items-center gap-2 -rotate-[0deg] animate-[spin_60s_linear_infinite_reverse]">
                     <Shield className="w-5 h-5 text-blue-400" />
                     <span className="text-white text-xs font-semibold whitespace-nowrap hidden sm:block">IT Support</span>
                  </div>
                  
                  {/* Software */}
                  <div className="absolute top-1/4 -right-6 bg-[#0B163B] border border-blue-500/50 p-3 rounded-xl shadow-lg flex items-center gap-2 -rotate-[0deg] animate-[spin_60s_linear_infinite_reverse]">
                     <Code className="w-5 h-5 text-emerald-400" />
                     <span className="text-white text-xs font-semibold whitespace-nowrap hidden sm:block">Software</span>
                  </div>

                  {/* AI */}
                  <div className="absolute bottom-1/4 -right-4 bg-[#0B163B] border border-blue-500/50 p-3 rounded-xl shadow-lg flex items-center gap-2 -rotate-[0deg] animate-[spin_60s_linear_infinite_reverse]">
                     <Target className="w-5 h-5 text-amber-400" />
                     <span className="text-white text-xs font-semibold whitespace-nowrap hidden sm:block">AI & Auto</span>
                  </div>

                  {/* Creative */}
                  <div className="absolute -bottom-5 left-1/4 bg-[#0B163B] border border-blue-500/50 p-3 rounded-xl shadow-lg flex items-center gap-2 -rotate-[0deg] animate-[spin_60s_linear_infinite_reverse]">
                     <Megaphone className="w-5 h-5 text-purple-400" />
                     <span className="text-white text-xs font-semibold whitespace-nowrap hidden sm:block">Creative</span>
                  </div>

                  {/* Consulting */}
                  <div className="absolute top-1/4 -left-6 bg-[#0B163B] border border-blue-500/50 p-3 rounded-xl shadow-lg flex items-center gap-2 -rotate-[0deg] animate-[spin_60s_linear_infinite_reverse]">
                     <Briefcase className="w-5 h-5 text-rose-400" />
                     <span className="text-white text-xs font-semibold whitespace-nowrap hidden sm:block">Consulting</span>
                  </div>
               </div>
               
               {/* Connecting lines - SVG overlay */}
               <svg className="absolute inset-0 w-full h-full z-10 opacity-20 pointer-events-none" viewBox="0 0 450 450">
                 <circle cx="225" cy="225" r="160" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-blue-300" />
                 <circle cx="225" cy="225" r="110" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="2 6" className="text-blue-300" />
               </svg>
             </div>
          </motion.div>
        </div>
      </section>

      {/* --- OVERLAPPING SERVICES & FORM --- */}
      <section className="-mt-32 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 mb-20">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Services Grid (Left 2 columns) */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-[#0B163B] mb-6 pl-2 hidden lg:block">Our Services</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { icon: Shield, title: 'IT Services & Infrastructure', desc: 'Keep your business running — securely and reliably.' },
                { icon: Code, title: 'Software & Web Development', desc: 'Digital tools built around how you actually work.' },
                { icon: Target, title: 'AI & Automation Solutions', desc: 'Do more with the team you already have.' },
                { icon: Megaphone, title: 'Multimedia & Creative', desc: 'A brand that looks as good as your work is.' },
                { icon: Briefcase, title: 'Business Consulting', desc: 'Strategic guidance, not just technical delivery.' }
              ].map((s, i) => (
                <div key={i} className="bg-white rounded-xl shadow-xl shadow-blue-900/5 p-6 border border-slate-100 flex flex-col items-center text-center hover:-translate-y-1 transition-transform">
                  <div className="w-16 h-16 mb-4 flex items-center justify-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-blue-100 blur-md rounded-full transform translate-y-2 scale-90"></div>
                      <div className="relative w-12 h-12 bg-gradient-to-br from-[#2563EB] to-blue-800 rounded-lg shadow-inner flex items-center justify-center text-white rotate-3">
                         <s.icon className="w-6 h-6 -rotate-3" />
                      </div>
                    </div>
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{s.title}</h3>
                  <p className="text-xs text-slate-500 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Consultation Form (Right column) */}
          <div className="bg-white rounded-xl shadow-2xl shadow-blue-900/10 p-8 border border-slate-100 relative">
            <h3 className="font-bold text-slate-900 text-lg mb-6">Request Free Consultation</h3>
            
            {isSuccess ? (
              <div className="text-center py-10">
                <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <p className="font-bold text-slate-900">Request Sent!</p>
                <p className="text-sm text-slate-500 mt-2">We'll contact you shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleConsultationSubmit} className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    required 
                    placeholder="Full name" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <input 
                    type="email" 
                    required 
                    placeholder="Email address" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <select 
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#2563EB] text-sm text-slate-600 appearance-none"
                    value={formData.service}
                    onChange={e => setFormData({...formData, service: e.target.value})}
                  >
                    <option value="" disabled>Select a service</option>
                    <option value="IT Support">IT Services & Support</option>
                    <option value="Software">Software Development</option>
                    <option value="AI">AI & Automation</option>
                    <option value="Consulting">Business Consulting</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#FACC15] text-slate-900 font-bold py-3 rounded-md hover:bg-yellow-500 transition-colors mt-2"
                >
                  {isSubmitting ? 'Sending...' : 'Send Request'}
                </button>
                <p className="text-[10px] text-slate-400 text-center mt-4 leading-tight">
                  By submitting this form, you agree to our privacy policy and terms of service regarding data usage.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* --- INDUSTRIES WE SERVE --- */}
      <section className="border-y border-slate-200 bg-white py-8 mb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">Industries We Serve in the UAE</p>
          <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 opacity-70">
             <div className="flex items-center gap-2 font-semibold text-slate-700 text-sm md:text-base"><Briefcase className="w-4 h-4"/> Retail & E-Commerce</div>
             <div className="flex items-center gap-2 font-semibold text-slate-700 text-sm md:text-base"><Building2 className="w-4 h-4"/> Real Estate</div>
             <div className="flex items-center gap-2 font-semibold text-slate-700 text-sm md:text-base"><Target className="w-4 h-4"/> Healthcare</div>
             <div className="flex items-center gap-2 font-semibold text-slate-700 text-sm md:text-base"><Globe className="w-4 h-4"/> Logistics & Trade</div>
             <div className="flex items-center gap-2 font-semibold text-slate-700 text-sm md:text-base"><Briefcase className="w-4 h-4"/> Consulting</div>
             <div className="flex items-center gap-2 font-semibold text-slate-700 text-sm md:text-base"><Monitor className="w-4 h-4"/> Startups</div>
          </div>
        </div>
      </section>

      {/* --- WHY CHOOSE US --- */}
      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-3xl font-extrabold text-[#0B163B] mb-6">Why Choose Us?</h2>
            <p className="text-slate-600 mb-8 leading-relaxed">
              We remove the complexity of modern technology so you can focus on running your business. Start with one project, scale into an ongoing relationship as your needs grow.
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FACC15] mt-2 shrink-0"></div>
                <span className="text-slate-700"><strong>One partner, not five vendors:</strong> Every capability under one roof.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FACC15] mt-2 shrink-0"></div>
                <span className="text-slate-700"><strong>AI built in, not bolted on:</strong> We design automation from day one.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FACC15] mt-2 shrink-0"></div>
                <span className="text-slate-700"><strong>Transparent, fixed pricing:</strong> Clear packages agreed upfront.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FACC15] mt-2 shrink-0"></div>
                <span className="text-slate-700"><strong>Built for growing businesses:</strong> Enterprise-grade capability for SMEs.</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-[#FACC15] mt-2 shrink-0"></div>
                <span className="text-slate-700"><strong>Local presence, responsive delivery:</strong> A UAE-based team that responds when you need us.</span>
              </li>
            </ul>
            <Link to="/portfolio" className="bg-[#2563EB] text-white px-6 py-3 rounded-md font-bold hover:bg-blue-600 transition-colors shadow-md shadow-blue-900/10">
              View All Projects
            </Link>
          </div>
          
          <div className="relative h-[300px] flex items-end justify-center perspective-[1000px]">
            {/* 3D abstract graphic / chart representation */}
            <div className="absolute bottom-0 w-[400px] h-[100px] bg-slate-200 rounded-[50%] shadow-2xl border-b-8 border-slate-300"></div>
            
            <div className="relative z-10 flex items-end gap-4 pb-12">
               <div className="w-12 h-24 bg-slate-300 rounded-t-sm shadow-md"></div>
               <div className="w-12 h-32 bg-[#2563EB] rounded-t-sm shadow-md"></div>
               <div className="w-12 h-40 bg-[#FACC15] rounded-t-sm shadow-md relative">
                 <div className="absolute -top-6 -right-10 hidden sm:block">
                    <svg className="w-16 h-16 text-[#0B163B]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                       <path d="M 0 50 Q 25 20 50 40 T 100 10" strokeLinecap="round" />
                    </svg>
                 </div>
               </div>
               <div className="w-12 h-28 bg-slate-800 rounded-t-sm shadow-md"></div>
               <div className="w-12 h-48 bg-slate-400 rounded-t-sm shadow-md"></div>
            </div>

            {/* Floating abstract UI card */}
            <div className="absolute right-0 bottom-16 bg-white/90 backdrop-blur-sm p-4 rounded-lg shadow-xl border border-slate-100 w-48 rotate-y-[-15deg] rotate-x-[5deg]">
               <div className="h-2 w-16 bg-slate-200 rounded mb-3"></div>
               <div className="h-4 w-32 bg-slate-800 rounded mb-4"></div>
               <div className="flex gap-2">
                 <div className="h-8 w-8 bg-blue-100 rounded"></div>
                 <div className="h-8 flex-1 bg-slate-100 rounded"></div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- HOW WE WORK --- */}
      <section className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-extrabold text-[#0B163B] mb-4">How We Work</h2>
            <p className="text-slate-600 text-lg">A simple, transparent process from first conversation to ongoing support.</p>
          </div>
          
          <div className="grid md:grid-cols-5 gap-8 relative">
            {/* Connecting Line for Desktop */}
            <div className="hidden md:block absolute top-8 left-10 right-10 h-0.5 bg-slate-200 z-0"></div>
            
            {[
              { num: '1', title: 'Discover', desc: 'Understanding your business and goals, not pitching a generic package.' },
              { num: '2', title: 'Propose', desc: 'Clear, fixed-scope proposal with defined deliverables and pricing.' },
              { num: '3', title: 'Build & Deliver', desc: 'Our team gets to work, with regular check-ins so you know where things stand.' },
              { num: '4', title: 'Launch', desc: 'We deliver, document, and train your team for day-one success.' },
              { num: '5', title: 'Support & Grow', desc: 'Ongoing managed relationship as your business needs scale.' }
            ].map((step, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-full bg-white border-4 border-slate-50 shadow-md flex items-center justify-center text-xl font-bold text-[#2563EB] mb-4 group-hover:scale-110 group-hover:border-blue-100 transition-all duration-300">
                  {step.num}
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-500 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEW TO UAE CALLOUT --- */}
      <section className="py-16 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#0B163B] rounded-2xl p-8 md:p-12 shadow-2xl overflow-hidden relative border border-slate-800">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600/20 rounded-full blur-3xl"></div>
            
            <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">New to the UAE market?</h3>
                <p className="text-blue-100/80 leading-relaxed mb-6">
                  Nexus IT Services supports newly formed companies and free zone entrants with the essential digital foundations — website, branding, systems, and socials — needed in the first 90 days of operation.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">Company Registration Support</span>
                  <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">Initial Digital Setup</span>
                  <span className="bg-white/10 text-white text-xs font-semibold px-3 py-1.5 rounded-full border border-white/20">90-Day Roadmap</span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <Link to="/contact" className="inline-block bg-[#FACC15] text-slate-900 px-6 py-3 rounded-md font-bold hover:bg-yellow-500 transition-colors shadow-lg w-full md:w-auto text-center">
                  Get Startup Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] py-16 text-center">
         <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-8">Looking for a professional business solution?</h2>
            <Link to="/contact" className="inline-block bg-[#FACC15] text-slate-900 px-8 py-3.5 rounded-md font-bold text-lg hover:bg-yellow-500 shadow-xl transition-all hover:scale-105">
              Get a Free Consultation
            </Link>
         </div>
      </section>

      <PublicFooter />
    </div>
  );
}
