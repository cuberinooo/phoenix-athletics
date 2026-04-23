import React from 'react';
import { managementData } from '../../data/managementData';
import { ShieldCheck } from 'lucide-react';

const Management = ({ t }) => {
  const currentLang = t.nav.home === 'Home' ? 'en' : 'de';

  return (
    <section id="management" className="py-24 bg-dark relative">
        <div className="absolute inset-0 bg-primary/5 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-16 space-y-4">
                <div className="inline-flex items-center gap-2 text-primary font-display text-xl font-bold tracking-widest uppercase">
                    <ShieldCheck className="w-6 h-6" />
                    <span>{t.management.title}</span>
                </div>
                <h2 className="text-white font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tighter">
                    {t.management.subtitle}
                </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {managementData.map((person) => (
                    <div 
                        key={person.id} 
                        className="group bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-8 flex flex-col items-center text-center transition-all duration-300 hover:border-primary/50"
                    >
                        <div className="relative mb-6">
                            <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-primary group-hover:scale-105 transition-transform duration-300">
                                <img 
                                    src={person.image} 
                                    alt={person.name}
                                    className="w-full h-full object-cover grayscale group-hover:grayscale-0"
                                    onError={(e) => {
                                        e.target.src = `https://ui-avatars.com/api/?name=${person.name}&size=300&background=F97316&color=fff`;
                                    }}
                                />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1.5 rounded-full">
                                <ShieldCheck className="w-4 h-4" />
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-white font-display text-2xl font-bold uppercase tracking-tight">
                                {person.name}
                            </h3>
                            <p className="text-primary font-display text-sm font-black uppercase tracking-widest">
                                {person.title[currentLang]}
                            </p>
                            <p className="text-slate-400 text-sm leading-relaxed italic">
                                "{person.description[currentLang]}"
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
  );
};

export default Management;
