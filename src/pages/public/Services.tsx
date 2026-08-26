import { motion } from 'motion/react';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';
import { Shield, Code, Sparkles, Palette, Compass, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const SERVICES = [
  {
    icon: Shield,
    title: 'IT Services & Infrastructure',
    desc: 'Keep your business running securely and reliably.',
    features: [
      'IT support and maintenance',
      'Network infrastructure and server administration',
      'Cybersecurity solutions',
      'Cloud services and migration',
      'Computer diagnostics and repair'
    ]
  },
  {
    icon: Code,
    title: 'Software & Web Development',
    desc: 'Digital tools built around how you actually work.',
    features: [
      'Website design and development',
      'E-commerce solutions',
      'Mobile applications',
      'Custom business software and CRM systems',
      'Business management platforms'
    ]
  },
  {
    icon: Sparkles,
    title: 'AI & Automation Solutions',
    desc: 'Do more with the team you already have.',
    features: [
      'AI integration for everyday business processes',
      'Intelligent chatbots and virtual assistants',
      'Workflow and business process automation',
      'Data analytics and reporting'
    ]
  },
  {
    icon: Palette,
    title: 'Multimedia & Creative Production',
    desc: 'A brand that looks as good as your work is.',
    features: [
      'Graphic design and brand identity',
      'Video production and photography',
      'Social media content creation',
      'Marketing materials and campaigns'
    ]
  },
  {
    icon: Compass,
    title: 'Business Consulting',
    desc: 'Strategic guidance, not just technical delivery.',
    features: [
      'Digital transformation advisory',
      'Technology planning and roadmaps',
      'Operational and process improvement',
      'Startup technology consulting'
    ]
  }
];

export default function Services() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#0066CC] selection:text-white overflow-x-hidden">
      <PublicNavbar transparentOnTop={false} />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <p className="text-[#0066CC] font-bold tracking-widest uppercase text-sm mb-4">Our Services</p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
            Five capabilities.<br />
            <span className="text-[#0066CC]">One accountable partner.</span>
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Whether you need a single project delivered or an ongoing technology partner, Nexus Tech's services are designed to work together — so the website we build can be automated with AI, the network we manage can be secured, and the brand we design can be brought to life.
          </p>
        </motion.div>
      </section>

      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="space-y-12">
          {SERVICES.map((s, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white rounded-[2rem] p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row gap-12 items-center hover:shadow-xl hover:border-slate-300 transition-all"
            >
              <div className="md:w-1/3 flex flex-col items-center md:items-start text-center md:text-left">
                <div className="w-20 h-20 bg-blue-50 text-[#0066CC] rounded-3xl flex items-center justify-center mb-6 shadow-inner">
                  <s.icon className="w-10 h-10" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 mb-4">{s.title}</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-6">{s.desc}</p>
                <Link to="/contact" className="inline-flex items-center gap-2 bg-[#0066CC] text-white px-6 py-3 rounded-full font-bold hover:bg-blue-700 transition-colors">
                  Get Started <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="md:w-2/3 w-full bg-slate-50 rounded-2xl p-8 border border-slate-100">
                <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6">What's Included</h3>
                <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
                  {s.features.map((f, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <div className="mt-1 w-5 h-5 rounded-full bg-[#00C9A7]/10 flex items-center justify-center shrink-0">
                        <div className="w-2 h-2 rounded-full bg-[#00C9A7]"></div>
                      </div>
                      <span className="text-slate-700 font-medium">{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
