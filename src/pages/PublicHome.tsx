import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import {
  ArrowRight, PlayCircle, CheckCircle2, Shield, Code, Sparkles, Palette,
  Compass, Layers, MessageCircle, FileText, Hammer, Rocket, TrendingUp,
  ShoppingCart, Hotel, Building2, Heart, Truck, Briefcase, Plus, Minus,
  Star, ChevronDown, Check
} from 'lucide-react';
import { cn } from '@/lib/utils';

// --- DATA ARRAYS ---

const FEATURES = [
  {
    icon: Shield,
    title: 'IT Services & Infrastructure',
    desc: 'Keep your business running securely and reliably. 24/7 monitoring, cybersecurity, cloud migration, and proactive support.'
  },
  {
    icon: Code,
    title: 'Software & Web Development',
    desc: 'Digital tools built around how you actually work. Websites, apps, e-commerce, and custom CRM systems.'
  },
  {
    icon: Sparkles,
    title: 'AI & Automation Solutions',
    desc: 'Do more with the team you already have. Intelligent chatbots, workflow automation, and predictive analytics.'
  },
  {
    icon: Palette,
    title: 'Multimedia & Creative Production',
    desc: 'A brand that looks as good as your work is. Design, video, social content, and campaign management.'
  },
  {
    icon: Compass,
    title: 'Business Consulting',
    desc: 'Strategic guidance, not just technical delivery. Digital transformation roadmaps and operational excellence.'
  },
  {
    icon: Layers,
    title: 'Unified AI Core',
    desc: 'The intelligent backbone connecting everything. One platform, one login, one team that truly understands your business.'
  }
];

const PROCESS_STEPS = [
  { icon: MessageCircle, title: 'Discover', desc: 'We understand your business, goals, and what success looks like.' },
  { icon: FileText, title: 'Propose', desc: 'Clear, fixed-scope proposal with defined deliverables, timeline, and pricing.' },
  { icon: Hammer, title: 'Build & Deliver', desc: 'Our team gets to work with regular check-ins and full visibility.' },
  { icon: Rocket, title: 'Launch & Handover', desc: 'We deliver, document, and train your team for day-one success.' },
  { icon: TrendingUp, title: 'Support & Grow', desc: 'Ongoing partnership: keep systems running, add capability, scale.' }
];

const INDUSTRIES = [
  { icon: ShoppingCart, name: 'Retail & E-Commerce', desc: 'Omnichannel scaling.' },
  { icon: Hotel, name: 'Hospitality & Tourism', desc: 'Guest experience tech.' },
  { icon: Building2, name: 'Real Estate', desc: 'PropTech & CRM.' },
  { icon: Heart, name: 'Healthcare', desc: 'Secure patient portals.' },
  { icon: Truck, name: 'Logistics & Trade', desc: 'Supply chain visibility.' },
  { icon: Briefcase, name: 'Professional Services', desc: 'Automated workflows.' },
  { icon: Rocket, name: 'Startups', desc: 'Rapid MVP & scale.' }
];

const TESTIMONIALS = [
  {
    quote: "Nexus Tech completely transformed our operations. Having IT, dev, and AI under one roof meant zero vendor finger-pointing. They just deliver.",
    name: "Ahmed Al Mansoori",
    title: "Operations Director",
    company: "Gulf Logistics Co.",
    industry: "Logistics"
  },
  {
    quote: "The AI automations they built saved our support team 40 hours a week. It's rare to find a partner that understands both deep tech and actual business needs.",
    name: "Sarah Jenkins",
    title: "CEO",
    company: "Oasis Retail Group",
    industry: "Retail"
  },
  {
    quote: "From our new scalable cloud infrastructure to the beautiful client portal they developed, Nexus is the only technology partner we trust.",
    name: "Tariq Hassan",
    title: "Managing Partner",
    company: "Prime Real Estate",
    industry: "Real Estate"
  }
];

const PRICING = [
  {
    name: 'Starter',
    price: '2,999',
    desc: 'Essential IT, basic website, 1 AI workflow, 5 users.',
    features: ['Essential IT Support', 'Basic Website Maintenance', '1 Custom AI Workflow', 'Up to 5 Users', 'Standard 9-5 Support'],
    highlighted: false
  },
  {
    name: 'Growth',
    price: '7,999',
    desc: 'Full IT, custom dev, AI suite, creative, 25 users, priority support.',
    features: ['Full IT Infrastructure', 'Custom Software Development', 'Full AI Automation Suite', 'Creative Production', 'Up to 25 Users', 'Priority 24/7 Support'],
    highlighted: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'Everything + dedicated manager, custom AI, white-label, unlimited.',
    features: ['Everything in Growth', 'Dedicated Account Manager', 'Custom AI Model Training', 'White-label Client Portal', 'Unlimited Users', 'Dedicated DevOps Team'],
    highlighted: false
  }
];

const FAQS = [
  { q: "How are you different from a standard IT agency?", a: "We are an integrated technology partner. Instead of hiring an IT firm, a dev shop, and a marketing agency, Nexus provides all capabilities on a single AI-native platform." },
  { q: "Do you support businesses outside the UAE?", a: "While our primary focus and physical infrastructure presence is in the UAE and GCC, our software and AI solutions support global clients." },
  { q: "Is your support team bilingual?", a: "Yes, our entire support and delivery team provides full native support in both Arabic and English." },
  { q: "How does the pricing work?", a: "We offer transparent, fixed monthly pricing tiers with no hidden fees, providing predictability for your budget." },
  { q: "Where is our data hosted?", a: "Data is hosted securely on enterprise-grade infrastructure. We offer UAE-local data residency options for clients requiring NESA compliance." },
  { q: "Can we start with just IT support and add Software later?", a: "Absolutely. Our flexible platform allows you to scale services up or down as your business needs evolve." },
  { q: "What does 'AI-Native' mean?", a: "It means AI isn't an afterthought. Our core platform uses AI to automate infrastructure monitoring, draft proposals, and streamline support tickets out-of-the-box." },
  { q: "How long does onboarding take?", a: "Standard onboarding takes 1-2 weeks, during which we audit your current systems, deploy our management tools, and train your team." }
];

// --- COMPONENTS ---

const AccordionItem = ({ q, a, isOpen, onClick }: any) => (
  <div className="border-b border-slate-200">
    <button onClick={onClick} className="w-full flex items-center justify-between py-5 text-left font-semibold text-slate-900 hover:text-[#0066CC] transition-colors">
      <span>{q}</span>
      <div className={cn("shrink-0 p-1 rounded-full border transition-all duration-300", isOpen ? "bg-blue-50 border-[#0066CC] text-[#0066CC]" : "border-slate-200 text-slate-400")}>
        {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
      </div>
    </button>
    <div className={cn("overflow-hidden transition-all duration-300", isOpen ? "max-h-96 opacity-100 pb-5" : "max-h-0 opacity-0")}>
      <p className="text-slate-600 leading-relaxed">{a}</p>
    </div>
  </div>
);

import PublicNavbar from '@/components/layout/PublicNavbar';

export default function PublicHome() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#0066CC] selection:text-white overflow-x-hidden">
      
      <PublicNavbar transparentOnTop={true} />

      {/* --- HERO SECTION --- */}
      <section className="pt-36 pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative">
        {/* Background Decorative Orbs */}
        <div className="absolute top-20 right-20 w-[500px] h-[500px] bg-blue-400/20 rounded-full blur-[100px] -z-10 animate-pulse"></div>
        <div className="absolute top-40 left-10 w-[300px] h-[300px] bg-teal-400/10 rounded-full blur-[80px] -z-10"></div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="max-w-2xl relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#0066CC] text-sm font-semibold mb-8 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              NISDP 1.0 is now live &rarr;
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-[64px] font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              One Partner.<br/>
              <span className="text-[#0066CC]">Every Technology Capability</span><br/>
              Your Business Needs to Grow.
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
              Nexus Tech brings IT infrastructure, software development, AI automation, creative production, and business consulting together under one roof — so you get one point of contact, one team that knows your business, and one partner accountable for results.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
              <Link to="/app" className="w-full sm:w-auto bg-[#0066CC] text-white px-8 py-3.5 rounded-full font-semibold text-lg hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-2 group">
                Start Your Free Trial <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button className="w-full sm:w-auto bg-white text-[#0066CC] border-2 border-slate-200 px-8 py-3.5 rounded-full font-semibold text-lg hover:border-[#0066CC] hover:bg-blue-50 transition-all flex items-center justify-center gap-2">
                <PlayCircle className="w-5 h-5" /> Watch Demo
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00C9A7]" /> No credit card required</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00C9A7]" /> 14-day free trial</div>
              <div className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#00C9A7]" /> Cancel anytime</div>
            </div>
          </motion.div>

          {/* Floating Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1, y: [0, -12, 0] }}
            transition={{ 
              opacity: { duration: 0.8 },
              scale: { duration: 0.8 },
              y: { repeat: Infinity, duration: 4, ease: "easeInOut" } 
            }}
            className="relative hidden lg:block perspective-[1000px]"
          >
            {/* Main Mockup Container */}
            <div className="relative z-10 w-full h-[520px] bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.1)] border border-slate-100 overflow-hidden flex transform rotate-y-[-12deg] rotate-x-[5deg] hover:rotate-y-[-8deg] hover:rotate-x-[2deg] transition-transform duration-700">
              
              {/* Sidebar */}
              <div className="w-20 lg:w-48 bg-slate-50 border-r border-slate-100 flex flex-col p-4 shrink-0">
                <div className="flex items-center gap-2 mb-8 px-2">
                  <div className="w-6 h-6 rounded bg-gradient-to-br from-[#0066CC] to-[#00C9A7] flex shrink-0 shadow-sm"></div>
                  <div className="h-4 w-20 bg-slate-300 rounded hidden lg:block"></div>
                </div>
                <div className="space-y-4">
                  {[
                    { c: "bg-blue-100 text-[#0066CC]", l: "bg-blue-600/20 w-16" },
                    { c: "text-slate-400", l: "bg-slate-200 w-24" },
                    { c: "text-slate-400", l: "bg-slate-200 w-20" },
                    { c: "text-slate-400", l: "bg-slate-200 w-28" },
                    { c: "text-slate-400", l: "bg-slate-200 w-16" }
                  ].map((item, i) => (
                    <div key={i} className={cn("flex items-center gap-3 p-2 rounded-lg", item.c)}>
                      <div className="w-5 h-5 rounded bg-current opacity-70 shrink-0"></div>
                      <div className={cn("h-3 rounded hidden lg:block", item.l)}></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Main Content */}
              <div className="flex-1 p-6 flex flex-col bg-white">
                <div className="flex justify-between items-center mb-8">
                  <div>
                    <div className="h-4 w-32 bg-slate-200 rounded mb-2"></div>
                    <div className="h-7 w-48 bg-slate-800 rounded"></div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200"></div>
                    <div className="w-9 h-9 rounded-full bg-blue-100 border border-blue-200"></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {[
                    { l: 'Revenue', v: '$24,980', c: 'text-[#0066CC]', bg: 'bg-blue-50' },
                    { l: 'Active Projects', v: '128', c: 'text-slate-700', bg: 'bg-slate-50' },
                    { l: 'Tasks Completed', v: '8,430', c: 'text-slate-700', bg: 'bg-slate-50' }
                  ].map((s,i) => (
                    <div key={i} className="p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-center">
                      <div className="h-2 w-16 bg-slate-200 rounded mb-3"></div>
                      <div className={cn("text-2xl font-bold", s.c)}>{s.v}</div>
                    </div>
                  ))}
                </div>

                {/* Chart Area */}
                <div className="flex-1 rounded-xl border border-slate-100 bg-slate-50/50 p-5 relative overflow-hidden flex flex-col justify-between">
                  <div className="h-3 w-32 bg-slate-200 rounded mb-4"></div>
                  <svg viewBox="0 0 100 40" className="w-full h-full fill-blue-100/50 stroke-[#0066CC] stroke-2 preserve-aspect-ratio-none drop-shadow-md">
                    <path d="M0,40 L0,25 Q10,15 20,20 T40,25 T60,15 T80,22 T100,10 L100,40 Z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Floating Widgets */}
            <motion.div 
              animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 3.5, delay: 0.5 }}
              className="absolute -right-8 -bottom-8 w-56 bg-white p-4 rounded-xl shadow-[0_10px_30px_rgba(0,102,204,0.15)] border border-slate-100 z-20 flex gap-4 items-center"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#0066CC] to-[#00C9A7] flex items-center justify-center text-white shrink-0 shadow-sm">
                <Sparkles className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <div className="h-3 w-24 bg-slate-800 rounded mb-2"></div>
                <div className="h-2 w-16 bg-slate-300 rounded"></div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* --- TRUST BAR --- */}
      <section className="border-y border-slate-200 bg-white py-12 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-8">TRUSTED BY GROWING BUSINESSES ACROSS THE GCC</p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {[
              { name: 'Acme Inc.', icon: Building2 },
              { name: 'Celestial', icon: Sparkles },
              { name: 'Quotient', icon: Layers },
              { name: 'EchoFlow', icon: Heart },
              { name: 'PULSE', icon: Truck },
              { name: 'Visionary', icon: Compass }
            ].map((company, i) => (
              <div key={i} className="flex items-center gap-2 text-slate-400 hover:text-[#0066CC] transition-colors cursor-default grayscale hover:grayscale-0">
                <company.icon className="w-6 h-6 opacity-70" />
                <span className="font-extrabold text-xl tracking-tight">{company.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section id="features" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-[#0066CC] font-bold tracking-widest uppercase text-sm mb-4">What We Do</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight">Everything You Need to Succeed</h2>
          <p className="text-lg text-slate-600">Powerful capabilities built to streamline your operations and unlock what AI makes possible.</p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 relative">
          <div className="absolute inset-0 border border-slate-200/50 hidden lg:block pointer-events-none rounded-3xl -m-4"></div>
          
          {FEATURES.map((feature, i) => (
            <motion.div 
              key={i} 
              whileHover={{ y: -6 }}
              className="bg-white border border-slate-200 p-8 rounded-2xl shadow-[0_4px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_20px_40px_rgba(0,102,204,0.08)] transition-all group z-10"
            >
              <div className="w-14 h-14 bg-blue-50 text-[#0066CC] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#0066CC] group-hover:text-white transition-all duration-300 shadow-sm">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
              <p className="text-slate-600 leading-relaxed mb-6">{feature.desc}</p>
              <a href="#" className="inline-flex items-center gap-2 text-[#0066CC] font-bold text-sm hover:gap-3 transition-all">
                Learn more <ArrowRight className="w-4 h-4" />
              </a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- HOW IT WORKS --- */}
      <section className="py-24 bg-white border-y border-slate-200 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20 max-w-3xl mx-auto">
            <p className="text-[#00C9A7] font-bold tracking-widest uppercase text-sm mb-4">How We Work</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">A Simple, Transparent Process</h2>
          </div>

          <div className="relative">
            <div className="absolute top-8 left-8 right-8 h-1 bg-slate-100 hidden md:block rounded-full">
               <motion.div 
                 initial={{ width: 0 }}
                 whileInView={{ width: '100%' }}
                 viewport={{ once: true, margin: "-50px" }}
                 transition={{ duration: 1.5, ease: "easeOut" }}
                 className="h-full bg-gradient-to-r from-[#0066CC] to-[#00C9A7] rounded-full shadow-[0_0_10px_rgba(0,201,167,0.5)]"
               />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
              {PROCESS_STEPS.map((step, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.5 }}
                  className="relative flex flex-col items-start md:items-center text-left md:text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-white border-4 border-[#0066CC] shadow-lg flex items-center justify-center text-[#0066CC] mb-6 z-10 shrink-0">
                    <step.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{i+1}. {step.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed max-w-[200px]">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- BUILT FOR GROWTH (Split Section) --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Mockup */}
          <div className="bg-slate-50 rounded-[40px] p-6 sm:p-10 relative overflow-hidden border border-slate-200/60 shadow-inner">
             <div className="absolute -top-20 -right-20 w-[400px] h-[400px] bg-[#0066CC]/5 blur-[80px] rounded-full"></div>
             
             <div className="relative bg-white rounded-2xl shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-100 overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-500">
                <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                  <div className="flex gap-6 text-sm font-semibold text-slate-500">
                    <span className="text-[#0066CC] border-b-2 border-[#0066CC] pb-5 -mb-5 flex items-center gap-2"><Target className="w-4 h-4 hidden sm:block"/> Overview</span>
                    <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 hidden sm:block"/> Tasks</span>
                    <span className="flex items-center gap-2"><TrendingUp className="w-4 h-4 hidden sm:block"/> Analytics</span>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="font-extrabold text-slate-900 mb-6 text-lg">Team Performance</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                     {[
                       { l: 'Tasks Completed', v: '2,450', p: '+18.2%', c: 'text-[#0066CC]', bg: 'bg-blue-50' },
                       { l: 'On Track', v: '83%', p: '+7.4%', c: 'text-[#00C9A7]', bg: 'bg-teal-50' },
                       { l: 'Team Capacity', v: '68%', p: '-4.3%', c: 'text-rose-500', bg: 'bg-rose-50' }
                     ].map((s,i) => (
                       <div key={i} className="p-4 border border-slate-100 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow">
                         <div className="text-xs font-semibold text-slate-500 mb-3">{s.l}</div>
                         <div className="text-2xl font-black text-slate-900 mb-1">{s.v}</div>
                         <div className={cn("text-xs font-bold px-2 py-0.5 rounded-full inline-block", s.c, s.bg)}>{s.p}</div>
                       </div>
                     ))}
                  </div>
                  <div className="space-y-4 border-t border-slate-100 pt-6">
                     <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Recent Projects</p>
                     {[1,2].map((i) => (
                       <div key={i} className="flex items-center justify-between p-3 rounded-lg hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors">
                         <div className="flex items-center gap-3">
                           <div className={cn("w-8 h-8 rounded-full flex shrink-0", i===1 ? "bg-blue-100" : "bg-teal-100")}></div>
                           <div>
                             <div className="h-3 w-32 bg-slate-800 rounded mb-1.5"></div>
                             <div className="h-2 w-20 bg-slate-300 rounded"></div>
                           </div>
                         </div>
                         <div className="h-6 w-16 bg-slate-100 rounded-full"></div>
                       </div>
                     ))}
                  </div>
                </div>
             </div>
          </div>

          {/* Right Content */}
          <div>
            <p className="text-[#0066CC] font-bold tracking-widest uppercase text-sm mb-4">Built for Growth</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">Enterprise-Grade Capability, Scaled for SMEs</h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              Nexus Tech grows with you. Whether you're a startup in a UAE free zone or an established mid-market company, our platform scales with your ambition.
            </p>
            <ul className="space-y-5 mb-10">
              {[
                "Scalable from 5 to 500+ team members",
                "Enterprise-grade security (ISO 27001, NESA compliant)",
                "99.95% uptime SLA with UAE-based infrastructure",
                "24/7 bilingual support (Arabic & English)",
                "Transparent, fixed pricing — no surprise invoices"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4">
                  <div className="w-6 h-6 rounded-full bg-[#0066CC] flex items-center justify-center shrink-0 shadow-md shadow-blue-600/20">
                    <Check className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-slate-700 font-semibold">{item}</span>
                </li>
              ))}
            </ul>
            <Link to="/app" className="bg-[#0066CC] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 transition-all inline-block">
              Start Your Free Trial
            </Link>
          </div>
        </div>
      </section>

      {/* --- AI-FIRST SECTION --- */}
      <section className="py-24 bg-gradient-to-br from-[#F8FAFC] to-[#E6F0FF] relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-white/60 blur-[100px] rounded-full mix-blend-overlay pointer-events-none"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-6 tracking-tight leading-tight">The Only GCC Technology Partner with AI-Native Architecture</h2>
            <p className="text-lg text-slate-600">While others retrofit AI as an expensive afterthought, we designed automation and intelligence into every system from day one.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { icon: Briefcase, title: 'Predictive Operations', desc: 'AI anticipates infrastructure issues 7–30 days before they impact your business.' },
              { icon: Sparkles, title: 'Intelligent Automation', desc: 'AI agents handle routine tasks so your team focuses on what matters.' },
              { icon: Layers, title: 'Grounded Intelligence', desc: 'RAG-based AI answers using your actual documents and data — not generic internet knowledge.' }
            ].map((item, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl border border-white shadow-xl shadow-blue-900/5 hover:-translate-y-2 transition-transform duration-300">
                <div className="w-14 h-14 bg-white rounded-2xl shadow-md flex items-center justify-center text-[#0066CC] mb-6">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                <p className="text-slate-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
             <a href="#" className="inline-flex items-center gap-2 bg-white text-[#0066CC] px-8 py-4 rounded-full font-bold text-lg shadow-md hover:shadow-xl transition-all hover:gap-4">
                Explore AI Solutions <ArrowRight className="w-5 h-5" />
             </a>
          </div>
        </div>
      </section>

      {/* --- INDUSTRIES (Scroll Grid) --- */}
      <section className="py-24 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-[#00C9A7] font-bold tracking-widest uppercase text-sm mb-4">Industries We Serve</p>
              <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">Deep Familiarity with the Sectors Driving UAE Growth</h2>
            </div>
            <div className="hidden md:block">
              <a href="#" className="text-[#0066CC] font-bold inline-flex items-center gap-2 hover:gap-3 transition-all">
                View all industries <ArrowRight className="w-5 h-5"/>
              </a>
            </div>
          </div>
          
          <div className="flex overflow-x-auto gap-6 pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0">
            {INDUSTRIES.map((ind, i) => (
              <div key={i} className="min-w-[300px] w-[300px] bg-slate-50 border border-slate-200 p-8 rounded-3xl shrink-0 snap-start hover:bg-[#0066CC] hover:border-[#0066CC] transition-all cursor-pointer group shadow-sm">
                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                   <ind.icon className="w-7 h-7 text-[#0066CC]" />
                </div>
                <h3 className="font-extrabold text-xl text-slate-900 mb-3 group-hover:text-white transition-colors">{ind.name}</h3>
                <p className="text-slate-500 mb-6 group-hover:text-white/80 transition-colors leading-relaxed">{ind.desc}</p>
                <div className="text-[#0066CC] font-bold flex items-center gap-2 group-hover:text-white group-hover:gap-3 transition-all">
                  See how we help <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- TESTIMONIALS --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <p className="text-[#0066CC] font-bold tracking-widest uppercase text-sm mb-4">Client Success Stories</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Trusted by Businesses Like Yours</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="bg-white border border-slate-200 p-8 rounded-3xl shadow-[0_4px_24px_rgba(15,23,42,0.04)] flex flex-col justify-between hover:shadow-xl transition-shadow">
              <div>
                <div className="flex gap-1 mb-6">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-5 h-5 fill-current text-yellow-400" />)}
                </div>
                <p className="text-slate-700 text-lg italic leading-relaxed mb-8">"{t.quote}"</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#0066CC] to-[#00C9A7] flex items-center justify-center font-bold text-white uppercase text-lg shadow-md">{t.name.charAt(0)}</div>
                <div>
                  <h4 className="font-bold text-slate-900">{t.name}</h4>
                  <p className="text-sm text-slate-500 font-medium">{t.title}, {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- PRICING --- */}
      <section id="pricing" className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <p className="text-[#00C9A7] font-bold tracking-widest uppercase text-sm mb-4">Pricing</p>
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">Clear Packages. No Surprises.</h2>
            <p className="text-lg text-slate-600">Simple, fixed monthly retainers designed for every stage of your growth.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
            {PRICING.map((plan, i) => (
              <div key={i} className={cn(
                "bg-white rounded-[2rem] p-8 border transition-all duration-300 relative flex flex-col",
                plan.highlighted ? "border-[#0066CC] shadow-2xl md:scale-105 z-10 py-12" : "border-slate-200 shadow-[0_4px_24px_rgba(15,23,42,0.04)]"
              )}>
                {plan.highlighted && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#0066CC] text-white px-6 py-1.5 rounded-full text-xs font-bold tracking-widest shadow-md uppercase">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-extrabold text-slate-900 mb-2">{plan.name}</h3>
                <p className="text-slate-500 text-sm mb-8 h-10 leading-relaxed">{plan.desc}</p>
                
                <div className="mb-8">
                  {plan.price === 'Custom' ? (
                    <span className="text-5xl font-extrabold text-slate-900 tracking-tight">Custom</span>
                  ) : (
                    <div className="flex items-baseline">
                      <span className="text-2xl font-bold text-slate-400 mr-2">AED</span>
                      <span className="text-5xl font-extrabold text-slate-900 tracking-tight">{plan.price}</span>
                      <span className="text-slate-500 font-medium ml-1">/mo</span>
                    </div>
                  )}
                </div>
                
                <button className={cn(
                  "w-full py-4 rounded-full font-bold text-lg mb-8 transition-all flex items-center justify-center gap-2",
                  plan.highlighted ? "bg-[#0066CC] text-white hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30" : "bg-white text-[#0066CC] border-2 border-slate-200 hover:border-[#0066CC] hover:bg-blue-50"
                )}>
                  {plan.price === 'Custom' ? 'Contact Sales' : 'Start Free Trial'} <ArrowRight className="w-5 h-5"/>
                </button>
                
                <ul className="space-y-4 flex-1">
                  {plan.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3 text-slate-700 text-sm font-semibold">
                      <div className="mt-0.5 w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center shrink-0">
                        <Check className="w-3.5 h-3.5 text-[#00C9A7]" />
                      </div>
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 max-w-2xl mx-auto">
            <p className="text-sm font-bold text-slate-500 leading-loose">
              ALL PLANS INCLUDE:<br/>
              <span className="text-slate-700">UAE VAT compliance &nbsp;|&nbsp; 99.95% uptime SLA &nbsp;|&nbsp; AES-256 encryption &nbsp;|&nbsp; Arabic & English support &nbsp;|&nbsp; 14-day free trial</span>
            </p>
          </div>
        </div>
      </section>

      {/* --- FAQ --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-[#0066CC] font-bold tracking-widest uppercase text-sm mb-4">FAQ</p>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight">Questions? We Have Answers.</h2>
        </div>
        <div className="border-t border-slate-200">
          {FAQS.map((faq, i) => (
            <AccordionItem 
              key={i} 
              q={faq.q} 
              a={faq.a} 
              isOpen={openFaq === i} 
              onClick={() => setOpenFaq(openFaq === i ? null : i)} 
            />
          ))}
        </div>
      </section>

      {/* --- CTA BANNER --- */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden rounded-[40px] my-10 bg-gradient-to-br from-[#0066CC] to-[#004C99] shadow-2xl">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/10 blur-[100px] rounded-full mix-blend-overlay pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-teal-400/20 blur-[80px] rounded-full mix-blend-overlay pointer-events-none"></div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-[56px] font-extrabold text-white mb-6 tracking-tight leading-tight">Ready to Simplify Your Technology?</h2>
          <p className="text-xl text-white/80 mb-10 leading-relaxed font-medium">Join growing businesses across the UAE and GCC that trust Nexus Tech to power their operations.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/app" className="w-full sm:w-auto bg-white text-[#0066CC] px-10 py-4 rounded-full font-bold text-lg hover:bg-slate-50 hover:shadow-xl hover:scale-105 transition-all">
              Start Your Free Trial
            </Link>
            <Link to="/contact" className="w-full sm:w-auto bg-transparent text-white border-2 border-white/30 px-10 py-4 rounded-full font-bold text-lg hover:border-white hover:bg-white/10 transition-all">
              Talk to Our Team
            </Link>
          </div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}

// Needed because I used Target inside the empty state in previous components, but here I used it in Built For Growth
import { Target } from 'lucide-react';
import PublicFooter from '@/components/layout/PublicFooter';
