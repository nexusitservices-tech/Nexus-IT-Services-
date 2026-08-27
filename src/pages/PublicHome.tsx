import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Monitor, Megaphone, Target, Building2, Briefcase, 
  Code, Shield, CheckCircle2, PlayCircle, Globe,
  Layout, Star, ArrowRight, Zap, Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const fadeUpItem = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100 } }
};

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
        style={{ clipPath: 'polygon(0 0, 100% 0, 100% 88%, 0 100%)' }}
      >
        {/* Subtle background glow/effects */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-blue-600/20 to-transparent blur-3xl mix-blend-overlay"></div>
        <div className="absolute top-20 right-40 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 items-center mt-10">
          
          {/* Left Text */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }} 
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm font-medium mb-6"
            >
              <Zap className="w-4 h-4 text-yellow-400" />
              <span>Transforming UAE Businesses</span>
            </motion.div>
            
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight">
              Technology.<br/><span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Simplified.</span> Delivered.
            </h1>
            <p className="text-blue-100/80 text-lg mb-10 max-w-lg leading-relaxed font-light">
              Nexus IT Services is a UAE-based technology and business solutions company built for organizations that want to grow without the complexity of managing five different vendors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services" className="bg-[#2563EB] text-white px-8 py-3.5 rounded-md font-bold text-center hover:bg-blue-600 transition-all shadow-lg shadow-blue-900/40 hover:-translate-y-0.5 flex items-center justify-center gap-2 group">
                Explore Services
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/portfolio" className="border border-white/20 text-white px-8 py-3.5 rounded-md font-bold text-center hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
                View Our Work
              </Link>
            </div>
            
            <div className="mt-12 flex items-center gap-4 text-slate-400 text-sm">
               <div className="flex -space-x-3">
                 {[1,2,3,4].map((i) => (
                   <div key={i} className={`w-10 h-10 rounded-full border-2 border-[#0B163B] bg-slate-${200 + i*100} flex items-center justify-center`}>
                      <Users className="w-4 h-4 text-slate-500" />
                   </div>
                 ))}
               </div>
               <p>Trusted by 100+ businesses across the UAE.</p>
            </div>
          </motion.div>

          {/* Right Image/Graphic placeholder */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 1, ease: "easeOut" }} 
            className="relative hidden lg:block"
          >
             <div className="w-[450px] h-[450px] ml-auto relative flex items-center justify-center">
               <motion.div 
                 animate={{ rotate: 360 }} 
                 transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-0 bg-gradient-to-tr from-[#2563EB]/20 to-emerald-500/10 rounded-full blur-3xl"
               ></motion.div>
               
               {/* Central Hub */}
               <motion.div 
                 animate={{ y: [0, -10, 0] }}
                 transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                 className="relative z-20 w-36 h-36 bg-gradient-to-b from-white/10 to-transparent backdrop-blur-md border border-white/20 rounded-full flex flex-col items-center justify-center shadow-2xl shadow-blue-900/50"
               >
                  <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-2xl italic mb-1 shadow-md">N</div>
                  <span className="text-white font-bold text-[10px] tracking-widest text-center uppercase">Nexus IT Services</span>
               </motion.div>

               {/* Orbiting Elements */}
               <motion.div 
                 animate={{ rotate: 360 }}
                 transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-4 border border-white/5 rounded-full"
               >
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center shadow-lg -rotate-45">
                    <Globe className="w-5 h-5 text-blue-400" />
                  </div>
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center shadow-lg -rotate-45">
                    <Monitor className="w-5 h-5 text-blue-400" />
                  </div>
               </motion.div>

               <motion.div 
                 animate={{ rotate: -360 }}
                 transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
                 className="absolute inset-[-40px] border border-white/5 rounded-full"
               >
                  <div className="absolute top-1/4 -left-4 w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center shadow-lg">
                    <Code className="w-5 h-5 text-emerald-400" />
                  </div>
                  <div className="absolute bottom-1/4 -right-4 w-12 h-12 bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center shadow-lg">
                    <Megaphone className="w-5 h-5 text-yellow-400" />
                  </div>
               </motion.div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* --- OVERLAPPING SERVICES & FORM --- */}
      <section className="-mt-40 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 mb-20">
        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Services Grid (Left 2 columns) */}
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="lg:col-span-2"
          >
            <motion.h2 variants={fadeUpItem} className="text-2xl font-bold text-white mb-8 pl-2 hidden lg:block">Our Core Expertise</motion.h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { title: 'IT Setup & Support', desc: 'Hardware, networking, and ongoing technical support for your office.', icon: Monitor, color: 'text-blue-600', bg: 'bg-blue-50' },
                { title: 'Web Development', desc: 'Corporate websites, e-commerce, and custom web applications.', icon: Code, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                { title: 'Digital Marketing', desc: 'SEO, social media, and performance marketing to drive growth.', icon: Megaphone, color: 'text-amber-600', bg: 'bg-amber-50' },
                { title: 'App Development', desc: 'Native and cross-platform mobile applications for iOS and Android.', icon: Layout, color: 'text-purple-600', bg: 'bg-purple-50' },
                { title: 'Business Branding', desc: 'Logos, guidelines, and visual identity for modern businesses.', icon: Target, color: 'text-rose-600', bg: 'bg-rose-50' },
                { title: 'Company Setup', desc: 'PRO services and freezone registration for new market entrants.', icon: Building2, color: 'text-indigo-600', bg: 'bg-indigo-50' }
              ].map((service, i) => (
                <motion.div 
                  key={i} 
                  variants={fadeUpItem}
                  whileHover={{ y: -5 }}
                  className="bg-white p-6 rounded-xl shadow-xl shadow-slate-200/50 border border-slate-100 flex flex-col items-start group transition-all"
                >
                  <div className={`w-12 h-12 rounded-lg ${service.bg} ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-slate-900 mb-2">{service.title}</h3>
                  <p className="text-sm text-slate-600 leading-relaxed">{service.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Contact Form (Right 1 column) */}
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl p-8 shadow-2xl shadow-blue-900/10 border border-slate-100 sticky top-24"
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-2">Start a Project</h3>
            <p className="text-slate-500 text-sm mb-6">Tell us about your needs and we'll get back to you within 24 hours.</p>
            
            {isSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
                className="bg-emerald-50 border border-emerald-100 p-6 rounded-xl text-center"
              >
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-emerald-900 mb-1">Request Sent!</h4>
                <p className="text-sm text-emerald-700">We will be in touch shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleConsultationSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input 
                    type="text" required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    placeholder="John Doe"
                    value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input 
                    type="email" required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    placeholder="john@company.com"
                    value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Service Needed</label>
                  <select 
                    required
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})}
                  >
                    <option value="">Select a service...</option>
                    <option value="it_support">IT Support</option>
                    <option value="web_dev">Web Development</option>
                    <option value="marketing">Digital Marketing</option>
                    <option value="branding">Branding & Design</option>
                    <option value="comprehensive">Comprehensive Setup</option>
                  </select>
                </div>
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-[#0B163B] text-white py-3 rounded-lg font-bold hover:bg-slate-800 transition-colors flex justify-center items-center gap-2 mt-4 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full" />
                    </motion.div>
                  ) : (
                    'Request Consultation'
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <section className="py-16 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {[
              { label: 'Successful Projects', value: '500+' },
              { label: 'Client Retention', value: '98%' },
              { label: 'Years Experience', value: '12+' },
              { label: 'Support Uptime', value: '24/7' },
            ].map((stat, i) => (
              <motion.div key={i} variants={fadeUpItem} className="text-center">
                <p className="text-4xl md:text-5xl font-extrabold text-[#2563EB] mb-2">{stat.value}</p>
                <p className="text-sm font-medium text-slate-500 uppercase tracking-wide">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- WHY CHOOSE NEXUS --- */}
      <section className="py-24 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#0B163B] mb-6">
              Why business leaders choose <span className="text-[#2563EB]">Nexus</span>.
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              We eliminate the headache of dealing with multiple agencies. By consolidating your IT, marketing, and development under one roof, we ensure your technology works seamlessly together.
            </p>

            <motion.ul 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="space-y-6 mb-10"
            >
              {[
                { title: 'One partner, not five vendors', desc: 'Every capability under one roof, simplifying communication.' },
                { title: 'AI built in, not bolted on', desc: 'We design automation and smart systems from day one.' },
                { title: 'Transparent, fixed pricing', desc: 'Clear packages agreed upfront, no hidden retainers.' },
                { title: 'Local presence, fast response', desc: 'A UAE-based team that responds exactly when you need us.' }
              ].map((item, i) => (
                <motion.li key={i} variants={fadeUpItem} className="flex items-start gap-4 p-4 rounded-xl hover:bg-white hover:shadow-md transition-all">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <strong className="block text-slate-900 mb-1">{item.title}</strong>
                    <span className="text-slate-600 text-sm">{item.desc}</span>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <Link to="/portfolio" className="bg-[#2563EB] text-white px-8 py-3.5 rounded-md font-bold hover:bg-blue-600 transition-colors shadow-md shadow-blue-900/10 inline-flex">
              View Case Studies
            </Link>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[450px] flex items-end justify-center perspective-[1000px]"
          >
            {/* 3D abstract graphic / chart representation */}
            <div className="absolute bottom-0 w-[400px] h-[100px] bg-slate-200 rounded-[50%] shadow-2xl border-b-8 border-slate-300"></div>
            
            <div className="relative z-10 flex items-end gap-4 pb-12">
               <motion.div initial={{ height: 0 }} whileInView={{ height: 96 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="w-12 bg-slate-300 rounded-t-sm shadow-md"></motion.div>
               <motion.div initial={{ height: 0 }} whileInView={{ height: 128 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.4 }} className="w-12 bg-[#2563EB] rounded-t-sm shadow-md"></motion.div>
               <motion.div initial={{ height: 0 }} whileInView={{ height: 160 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.6 }} className="w-12 bg-[#FACC15] rounded-t-sm shadow-md relative">
                 <motion.div 
                   initial={{ opacity: 0, scale: 0 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 1 }}
                   className="absolute -top-6 -right-10 hidden sm:block"
                 >
                    <svg className="w-16 h-16 text-[#0B163B]" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
                       <path d="M 0 50 Q 25 20 50 40 T 100 10" strokeLinecap="round" />
                    </svg>
                 </motion.div>
               </motion.div>
               <motion.div initial={{ height: 0 }} whileInView={{ height: 112 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.3 }} className="w-12 bg-slate-800 rounded-t-sm shadow-md"></motion.div>
               <motion.div initial={{ height: 0 }} whileInView={{ height: 192 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.8 }} className="w-12 bg-slate-400 rounded-t-sm shadow-md"></motion.div>
            </div>

            {/* Floating abstract UI card */}
            <motion.div 
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute right-0 bottom-24 bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-xl border border-slate-100 w-56 rotate-y-[-15deg] rotate-x-[5deg]"
            >
               <div className="h-2 w-16 bg-slate-200 rounded mb-4"></div>
               <div className="h-4 w-32 bg-slate-800 rounded mb-5"></div>
               <div className="flex gap-3 items-center">
                 <div className="h-10 w-10 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                 </div>
                 <div className="h-8 flex-1 bg-slate-100 rounded"></div>
               </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- HOW WE WORK --- */}
      <section className="py-24 bg-white border-t border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B163B] mb-4">How We Work</h2>
            <p className="text-slate-600 text-lg">A simple, transparent process from first conversation to ongoing support.</p>
          </motion.div>
          
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-100px" }}
            className="grid md:grid-cols-5 gap-8 relative"
          >
            {/* Connecting Line for Desktop */}
            <motion.div 
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="hidden md:block absolute top-10 left-10 right-10 h-0.5 bg-blue-100 z-0 origin-left"
            ></motion.div>
            
            {[
              { num: '1', title: 'Discover', desc: 'Understanding your business and goals, not pitching a generic package.' },
              { num: '2', title: 'Propose', desc: 'Clear, fixed-scope proposal with defined deliverables and pricing.' },
              { num: '3', title: 'Build', desc: 'Our team gets to work, with regular check-ins so you know where things stand.' },
              { num: '4', title: 'Launch', desc: 'We deliver, document, and train your team for day-one success.' },
              { num: '5', title: 'Support', desc: 'Ongoing managed relationship as your business needs scale.' }
            ].map((step, i) => (
              <motion.div key={i} variants={fadeUpItem} className="relative z-10 flex flex-col items-center text-center group">
                <div className="w-20 h-20 rounded-full bg-white border-4 border-slate-50 shadow-xl shadow-slate-200/50 flex items-center justify-center text-2xl font-bold text-[#2563EB] mb-6 group-hover:scale-110 group-hover:border-blue-100 transition-all duration-300">
                  {step.num}
                </div>
                <h3 className="font-bold text-slate-900 mb-3 text-lg">{step.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#0B163B] mb-4">Client Success Stories</h2>
            <p className="text-slate-600 text-lg">Don't just take our word for it.</p>
          </motion.div>

          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              { text: "Nexus completely overhauled our legacy IT systems and built a stunning new e-commerce platform. Having one team handle both was a game-changer for our launch timeline.", author: "Sarah Jenkins", role: "Operations Director, Al Bateen Retail" },
              { text: "As a new setup in DMCC, we needed everything from networking to branding. Nexus delivered the entire package flawlessly within 30 days. Incredible service.", author: "Omar Al Fayed", role: "Founder, Zenith Ventures" },
              { text: "Their transparent pricing and proactive IT support mean we never have surprise bills. The team is responsive, knowledgeable, and genuinely cares about our success.", author: "Michael Chang", role: "CEO, Horizon Logistics" }
            ].map((testimonial, i) => (
              <motion.div key={i} variants={fadeUpItem} className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-between">
                <div>
                  <div className="flex gap-1 mb-6 text-[#FACC15]">
                    {[1,2,3,4,5].map(star => <Star key={star} className="w-5 h-5 fill-current" />)}
                  </div>
                  <p className="text-slate-700 italic mb-8 leading-relaxed">"{testimonial.text}"</p>
                </div>
                <div>
                  <h4 className="font-bold text-slate-900">{testimonial.author}</h4>
                  <p className="text-sm text-slate-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* --- NEW TO UAE CALLOUT --- */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="bg-[#0B163B] rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden relative border border-slate-800"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/30 rounded-full blur-[80px]"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-600/20 rounded-full blur-[80px]"></div>
            
            <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center">
              <div className="md:col-span-2">
                <h3 className="text-2xl md:text-4xl font-bold text-white mb-4">New to the UAE market?</h3>
                <p className="text-blue-100/80 leading-relaxed mb-8 text-lg">
                  Nexus IT Services supports newly formed companies and free zone entrants with the essential digital foundations — website, branding, systems, and socials — needed in the first 90 days of operation.
                </p>
                <div className="flex flex-wrap gap-3">
                  <span className="bg-white/10 text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">Company Registration Support</span>
                  <span className="bg-white/10 text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">Initial Digital Setup</span>
                  <span className="bg-white/10 text-white text-sm font-semibold px-4 py-2 rounded-full border border-white/20 backdrop-blur-sm">90-Day Roadmap</span>
                </div>
              </div>
              <div className="text-center md:text-right">
                <Link to="/contact" className="inline-flex items-center gap-2 bg-[#FACC15] text-slate-900 px-8 py-4 rounded-xl font-bold hover:bg-yellow-500 transition-all shadow-xl hover:shadow-yellow-500/20 hover:-translate-y-1 w-full md:w-auto justify-center">
                  Get Startup Support
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="bg-gradient-to-br from-[#2563EB] to-[#1D4ED8] py-24 text-center relative overflow-hidden">
         <motion.div 
           animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
           transition={{ duration: 10, repeat: Infinity }}
           className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-white rounded-full blur-[120px]"
         ></motion.div>
         
         <motion.div 
           initial={{ opacity: 0, y: 30 }}
           whileInView={{ opacity: 1, y: 0 }}
           viewport={{ once: true }}
           className="max-w-3xl mx-auto px-4 relative z-10"
         >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 tracking-tight">Ready to simplify your business technology?</h2>
            <p className="text-blue-100 text-lg mb-10">Stop managing multiple agencies. Start focusing on your growth.</p>
            <Link to="/contact" className="inline-block bg-[#FACC15] text-slate-900 px-10 py-4 rounded-xl font-bold text-lg hover:bg-yellow-500 shadow-xl transition-all hover:scale-105 hover:shadow-yellow-500/20">
              Get a Free Consultation
            </Link>
         </motion.div>
      </section>

      <PublicFooter />
    </div>
  );
}
