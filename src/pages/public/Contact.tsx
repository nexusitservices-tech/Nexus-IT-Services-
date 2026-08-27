import React, { useState } from 'react';
import { motion } from 'motion/react';
import PublicNavbar from '@/components/layout/PublicNavbar';
import PublicFooter from '@/components/layout/PublicFooter';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', company: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setTimeout(() => setSubmitted(true), 1000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 font-sans selection:bg-[#0066CC] selection:text-white overflow-x-hidden">
      <PublicNavbar transparentOnTop={false} />
      
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-[#0066CC] font-bold tracking-widest uppercase text-sm mb-4">Contact Us</p>
            <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Let's build something <span className="text-[#0066CC]">together.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-10 leading-relaxed">
              Whether you need a single project delivered, an ongoing technology partner, or a strategic advisor for your digital transformation, Nexus IT Services is ready to start with a conversation about your goals.
            </p>

            <div className="space-y-8">
              <div className="flex gap-6 items-start bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-blue-50 text-[#0066CC] rounded-full flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">Call Us</h3>
                  <p className="text-slate-600 mb-2">Speak to our UAE-based team directly.</p>
                  <a href="tel:+971526367221" className="text-[#0066CC] font-bold text-lg hover:underline">+971 52 636 7221</a>
                </div>
              </div>

              <div className="flex gap-6 items-start bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-teal-50 text-[#00C9A7] rounded-full flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">Email Us</h3>
                  <p className="text-slate-600 mb-2">We typically respond within 2-4 hours.</p>
                  <a href="mailto:info@nexus.ae.org" className="text-[#0066CC] font-bold text-lg hover:underline">info@nexus.ae.org</a>
                </div>
              </div>

              <div className="flex gap-6 items-start bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-full flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 text-lg mb-1">Visit Us</h3>
                  <p className="text-slate-600 mb-2">HQ located in the heart of Dubai.</p>
                  <p className="text-slate-800 font-medium">Rigga al butteen, Deira, Dubai, UAE</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-slate-200 shadow-[0_20px_50px_rgba(15,23,42,0.06)]">
              {submitted ? (
                <div className="text-center py-16">
                  <div className="w-20 h-20 bg-teal-50 text-[#00C9A7] rounded-full flex items-center justify-center mx-auto mb-6">
                    <Send className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Message Sent!</h3>
                  <p className="text-slate-600">Thank you for reaching out. One of our experts will be in touch with you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <h3 className="text-2xl font-bold text-slate-900 mb-8">Send us a message</h3>
                  
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Full Name</label>
                      <input 
                        required 
                        type="text" 
                        value={formData.name}
                        onChange={e => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066CC] focus:border-transparent outline-none transition-all" 
                        placeholder="John Doe" 
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700">Company</label>
                      <input 
                        type="text" 
                        value={formData.company}
                        onChange={e => setFormData({...formData, company: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066CC] focus:border-transparent outline-none transition-all" 
                        placeholder="Acme Inc." 
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">Email Address</label>
                    <input 
                      required 
                      type="email" 
                      value={formData.email}
                      onChange={e => setFormData({...formData, email: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066CC] focus:border-transparent outline-none transition-all" 
                      placeholder="john@example.com" 
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-slate-700">How can we help you?</label>
                    <textarea 
                      required 
                      rows={5}
                      value={formData.message}
                      onChange={e => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-[#0066CC] focus:border-transparent outline-none transition-all resize-none" 
                      placeholder="Tell us about your project or needs..." 
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="w-full bg-[#0066CC] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-600/30 transition-all flex items-center justify-center gap-2"
                  >
                    Send Message <Send className="w-5 h-5" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <PublicFooter />
    </div>
  );
}
