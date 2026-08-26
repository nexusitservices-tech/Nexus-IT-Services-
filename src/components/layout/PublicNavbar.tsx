import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const NavDropdown = ({ title, items }: { title: string, items: {label: string, to: string}[] }) => (
  <div className="group relative z-50">
    <button className="flex items-center gap-1 hover:text-[#0066CC] py-2 transition-colors">
      {title} <ChevronDown className="w-4 h-4 opacity-50 group-hover:rotate-180 transition-transform" />
    </button>
    <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-slate-100 shadow-xl rounded-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all -translate-y-2 group-hover:translate-y-0">
      {items.map(item => (
        <Link key={item.label} to={item.to} className="block px-3 py-2 text-sm text-slate-600 hover:text-[#0066CC] hover:bg-blue-50 rounded-lg">
          {item.label}
        </Link>
      ))}
    </div>
  </div>
);

interface PublicNavbarProps {
  transparentOnTop?: boolean;
}

export default function PublicNavbar({ transparentOnTop = false }: PublicNavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isTransparent = transparentOnTop && !scrolled;

  return (
    <>
      <nav className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        !isTransparent ? "bg-white/80 backdrop-blur-md border-b border-gray-200/50 py-3" : "bg-transparent py-5"
      )}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 z-50">
            <img src="/logo.jpeg.png" alt="Nexus Tech" className="h-9 object-contain hidden md:block" onError={(e) => {
               e.currentTarget.style.display = 'none';
               e.currentTarget.nextElementSibling?.classList.remove('hidden');
            }} />
            <div className="flex items-center gap-2 hidden md:hidden">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0066CC] to-[#00C9A7] flex items-center justify-center text-white font-bold text-xl italic shadow-md">N</div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">NEXUS <span className="font-light text-[#0066CC]">TECH</span></span>
            </div>
            {/* Mobile logo fallback */}
            <div className="md:hidden">
              <img src="/logo.jpeg.png" alt="Nexus Tech" className="h-8 object-contain" onError={(e) => {
                 e.currentTarget.style.display = 'none';
                 e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }} />
              <div className="hidden flex items-center gap-2">
                <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#0066CC] to-[#00C9A7] flex items-center justify-center text-white font-bold text-lg italic shadow-md">N</div>
                <span className="font-bold text-lg text-slate-900 tracking-tight">NEXUS</span>
              </div>
            </div>
          </Link>
          
          <div className="hidden lg:flex items-center gap-8 text-sm font-medium text-slate-600">
            <NavDropdown title="Product" items={[
              {label: 'IT Services', to: '/services'}, 
              {label: 'Software Dev', to: '/services'}, 
              {label: 'AI Solutions', to: '/services'}, 
              {label: 'Creative', to: '/services'}, 
              {label: 'Consulting', to: '/services'}
            ]} />
            <Link to="/about" className="hover:text-[#0066CC] py-2 transition-colors">About</Link>
            <Link to="/services" className="hover:text-[#0066CC] py-2 transition-colors">Services</Link>
            <Link to="/contact" className="hover:text-[#0066CC] py-2 transition-colors">Contact Us</Link>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-[#0066CC] transition-colors">Sign In</Link>
            <Link to="/register" className="text-sm font-semibold bg-[#0066CC] text-white px-5 py-2.5 rounded-full hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/20 transition-all active:scale-95">
              Get Started Free
            </Link>
          </div>

          <button 
            className="sm:hidden relative z-50 p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <div className="w-6 flex flex-col gap-1.5">
              <span className={cn("w-full h-0.5 bg-current transition-all", mobileMenuOpen && "rotate-45 translate-y-2")}></span>
              <span className={cn("w-full h-0.5 bg-current transition-all", mobileMenuOpen && "opacity-0")}></span>
              <span className={cn("w-full h-0.5 bg-current transition-all", mobileMenuOpen && "-rotate-45 -translate-y-2")}></span>
            </div>
          </button>
        </div>

        {/* Mobile Menu Drawer */}
        <div className={cn("fixed inset-0 bg-white z-40 transition-transform duration-300 flex flex-col pt-24 px-6 sm:hidden", mobileMenuOpen ? "translate-x-0" : "translate-x-full")}>
           <div className="flex flex-col gap-6 text-lg font-bold text-slate-900">
             <Link to="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
             <Link to="/services" onClick={() => setMobileMenuOpen(false)}>Services</Link>
             <Link to="/contact" onClick={() => setMobileMenuOpen(false)}>Contact Us</Link>
             <div className="w-full h-px bg-slate-100"></div>
             <Link to="/login" onClick={() => setMobileMenuOpen(false)}>Sign In</Link>
             <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="text-center bg-[#0066CC] text-white px-5 py-3 rounded-full mt-4">Get Started Free</Link>
           </div>
        </div>
      </nav>
    </>
  );
}
