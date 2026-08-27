import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function PublicFooter() {
  return (
    <footer className="bg-[#0F172A] text-slate-400 py-20 px-4 sm:px-6 lg:px-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 mb-16">
        <div className="col-span-2 lg:col-span-2">
          <Link to="/" className="inline-block mb-8">
            <img 
              src="/logo.gif" 
              alt="Nexus IT Services" 
              className="h-12 object-contain bg-white/10 p-1.5 rounded" 
            />
          </Link>
          <p className="text-slate-500 mb-8 max-w-sm leading-relaxed text-sm">
            One partner. Every technology capability your business needs to grow. Built natively with AI for UAE and GCC enterprises.
          </p>
          <div className="space-y-3 text-sm text-slate-400 mb-8">
            <div className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-[#00C9A7]" />
              <span>+971 52 636 7221</span>
            </div>
            <div className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-[#00C9A7]" />
              <span>info@nexus.ae.org</span>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-[#00C9A7] mt-1 shrink-0" />
              <span>Rigga al butteen, deira, dubai, UAE</span>
            </div>
          </div>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 tracking-widest uppercase text-xs">Product</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/services" className="hover:text-white transition-colors">IT Services</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Software Dev</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">AI & Automation</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Creative</Link></li>
            <li><Link to="/services" className="hover:text-white transition-colors">Consulting</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 tracking-widest uppercase text-xs">Company</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link to="/register" className="hover:text-white transition-colors">Register</Link></li>
            <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold text-white mb-6 tracking-widest uppercase text-xs">Resources</h4>
          <ul className="space-y-4 text-sm font-medium">
            <li><Link to="/blog" className="hover:text-white transition-colors">Blog</Link></li>
            <li><Link to="/case-studies" className="hover:text-white transition-colors">Case Studies</Link></li>
            <li><Link to="/docs" className="hover:text-white transition-colors">Documentation</Link></li>
            <li><Link to="/help" className="hover:text-white transition-colors">Help Center</Link></li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-6 text-sm font-medium">
        <div>&copy; {new Date().getFullYear()} Nexus IT Services | Dubai, UAE</div>
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-8">
          <button className="text-white hover:text-[#00C9A7] transition-colors border-r border-slate-700 pr-6 md:pr-8">English | العربية</button>
          <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-white transition-colors">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
