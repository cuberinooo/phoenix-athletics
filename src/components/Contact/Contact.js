import React from 'react';
import { Instagram, Send } from 'lucide-react';

const Contact = ({ t }) => {
  return (
    <section id="contact" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-100 to-transparent" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-4 mb-12">
          <h2 className="text-primary font-display text-xl font-bold tracking-widest uppercase animate-fade-in">
            {t.contact.title}
          </h2>
          <p className="text-slate-900 font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tighter">
            Ready to rise?
          </p>
        </div>
        
        <div className="bg-slate-50 border border-slate-100 p-8 md:p-12 space-y-8 shadow-xl">
          <p className="text-slate-700 text-xl font-medium leading-relaxed">
            {t.contact.findUs}
          </p>
          
          <div className="flex flex-col items-center gap-6">
            <a 
              href="https://www.instagram.com/phoenixathletics.ev/"
              target="_blank" 
              rel="noopener noreferrer"
              className="group flex items-center gap-3 bg-primary hover:bg-primary-dark text-black px-8 py-5 font-display text-2xl font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <Instagram className="w-8 h-8" />
              <span>@phoenixathletics.ev</span>
            </a>
            
            <p className="text-slate-400 font-display text-lg font-bold uppercase tracking-widest italic flex items-center gap-2">
              <Send className="w-4 h-4 text-primary" />
              {t.contact.followUs}
            </p>
          </div>
        </div>

        {/* Community Proof */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 opacity-40">
            <div className="flex flex-col items-center">
                <span className="font-display text-3xl font-bold text-slate-900 tracking-tighter">EST. 2024</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-display text-3xl font-bold text-slate-900 tracking-tighter">NEU-ULM</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-display text-3xl font-bold text-slate-900 tracking-tighter">ELITE COACHES</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-display text-3xl font-bold text-slate-900 tracking-tighter">PURE ENERGY</span>
            </div>
        </div>
      </div>

      {/* Background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-primary/10 blur-3xl rounded-full z-0" />
    </section>
  );
};

export default Contact;
