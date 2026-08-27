import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Send, Bot, User, CheckCircle2 } from 'lucide-react';

export default function AICopilot() {
  const [query, setQuery] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', text: 'Hello! I am Nexus AI Copilot. I can help you draft proposals, summarize leads, triage service tickets, or analyze your project pipeline. What can I assist you with today?' }
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setMessages(prev => [...prev, { role: 'user', text: query }]);
    setQuery('');
    setIsTyping(true);
    
    // Simulate AI response for the MVP demo
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        text: 'This is a simulated AI response. In the full production environment, this request will be securely routed to Gemini 3.1 Pro via a server-side endpoint with your organization\'s context.'
      }]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="h-[calc(100vh-140px)] flex flex-col bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-emerald-50/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-tr from-blue-600 to-emerald-500 flex items-center justify-center text-white shadow-md">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              Nexus AI Copilot
              <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 text-xs font-semibold">BETA</span>
            </h2>
            <p className="text-xs text-slate-500">Powered by Gemini 3.1 Pro</p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-100">
          <CheckCircle2 className="w-4 h-4" />
          System Online
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex gap-4 max-w-3xl ${msg.role === 'user' ? 'ml-auto flex-row-reverse' : ''}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
              msg.role === 'user' ? 'bg-[#0066CC] text-white' : 'bg-gradient-to-tr from-blue-600 to-emerald-500 text-white'
            }`}>
              {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
            </div>
            <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
              msg.role === 'user' 
                ? 'bg-[#0066CC] text-white rounded-tr-sm shadow-md' 
                : 'bg-white border border-slate-200 text-slate-700 rounded-tl-sm shadow-sm'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex gap-4 max-w-3xl">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-emerald-500 text-white flex items-center justify-center shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="p-4 rounded-2xl bg-white border border-slate-200 rounded-tl-sm shadow-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-bounce"></span>
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce delay-75"></span>
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-bounce delay-150"></span>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-slate-100 bg-white">
        <form onSubmit={handleSubmit} className="relative max-w-4xl mx-auto">
          <input 
            type="text" 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Ask AI Copilot to summarize a ticket, draft a proposal, or check project status..."
            className="w-full pl-4 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all text-sm"
          />
          <button 
            type="submit"
            disabled={!query.trim() || isTyping}
            className="absolute right-2 top-2 p-2 bg-[#0066CC] text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-500">
           <span className="px-2 py-1 bg-slate-100 rounded-md cursor-pointer hover:bg-slate-200 transition-colors">"Draft a response to Ticket #4422"</span>
           <span className="px-2 py-1 bg-slate-100 rounded-md cursor-pointer hover:bg-slate-200 transition-colors">"Summarize Acme Corp opportunities"</span>
           <span className="px-2 py-1 bg-slate-100 rounded-md cursor-pointer hover:bg-slate-200 transition-colors">"Which projects are at risk?"</span>
        </div>
      </div>
    </motion.div>
  );
}
