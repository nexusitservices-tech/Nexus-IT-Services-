import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronDown, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'About', to: '/about' },
    { label: 'Services', to: '/services' },
    { label: 'Portfolio', to: '/portfolio' },
    { label: 'Blog', to: '/blog' },
    { label: 'Contact', to: '/contact' },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-white border-b border-slate-100 shadow-sm py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 z-50">
            <img 
              src="/logo.gif" 
              alt="Nexus IT Services" 
              className="h-10 md:h-12 object-contain" 
            />
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-slate-600">
            {navLinks.map((link) => (
              <Link 
                key={link.to} 
                to={link.to} 
                className={cn(
                  "hover:text-[#0066CC] transition-colors",
                  location.pathname === link.to ? "text-[#0066CC] border-b-2 border-[#0066CC] pb-1 -mb-1" : ""
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <Link to="/login" className="text-sm font-bold text-slate-600 hover:text-[#0066CC] transition-colors">Sign In</Link>
            <Link to="/contact" className="text-sm font-bold bg-[#FACC15] text-slate-900 px-6 py-2.5 rounded-md hover:bg-yellow-500 shadow-sm transition-all active:scale-95">
              Let's talk
            </Link>
          </div>

          <button 
            className="sm:hidden relative z-50 p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={cn("fixed inset-0 bg-white z-40 transition-transform duration-300 flex flex-col pt-24 px-6 sm:hidden", mobileMenuOpen ? "translate-x-0" : "translate-x-full")}>
           <div className="flex flex-col gap-6 text-lg font-bold text-slate-900">
             {navLinks.map((link) => (
               <Link key={link.to} to={link.to} onClick={() => setMobileMenuOpen(false)}>{link.label}</Link>
             ))}
             <div className="w-full h-px bg-slate-100 my-2"></div>
             <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
             <Link to="/contact" onClick={() => setMobileMenuOpen(false)} className="text-center bg-[#FACC15] text-slate-900 px-5 py-3 rounded-md mt-4">Let's talk</Link>
           </div>
        </div>
      </nav>
    </>
  );
}
