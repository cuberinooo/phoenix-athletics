import React from 'react';
import { coachesData } from '../../data/coachesData';
import { Award } from 'lucide-react';
import SectionAnchor from '../common/SectionAnchor';

// Typography mirrors the board cards (Management.js): centered, full bio in italic quotes.
const CoachCard = ({ coach, currentLang }) => {
  const description = coach.description[currentLang] || '';
  const certifications = coach.certifications || [];

  return (
    <div className="group relative bg-white border border-slate-100 rounded-none overflow-hidden transition-all duration-300 hover:border-primary/50 shadow-lg hover:shadow-xl flex flex-col h-full">
      {/* Image Container */}
      <div className="aspect-[4/5] overflow-hidden relative">
        <img
          src={coach.image}
          alt={coach.name}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
          onError={(e) => {
            e.target.src = `https://ui-avatars.com/api/?name=${coach.name}&size=500&background=ffc107&color=000`;
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
      </div>

      {/* Info Content */}
      <div className="p-8 flex-1 flex flex-col items-center text-center space-y-3">
        <h3 className="text-slate-900 font-display text-2xl font-bold uppercase tracking-tight">
          {coach.name}
        </h3>
        <p className="text-primary font-display text-sm font-black uppercase tracking-widest">
          {coach.title[currentLang]}
        </p>
        {description && (
          <p className="text-slate-600 text-sm leading-relaxed italic">
            "{description}"
          </p>
        )}

        {certifications.length > 0 && (
          <div className="pt-3 space-y-3">
            <div className="flex items-center justify-center gap-2 text-slate-900 font-display font-bold text-xs uppercase tracking-widest">
              <Award className="w-4 h-4 text-primary" />
              <span>Certifications</span>
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {certifications.map((cert) => (
                <span
                  key={cert}
                  className="bg-slate-900 text-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider"
                >
                  {cert}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Corner Accent */}
      <div
        className="absolute top-0 right-0 w-16 h-16 bg-primary/10 transition-colors group-hover:bg-primary/20 pointer-events-none"
        style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }}
      />
    </div>
  );
};

const Coaches = ({ t }) => {
  const currentLang = t.nav.home === 'Home' ? 'en' : 'de';

  return (
    <section id="coaches" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-primary font-display text-xl font-bold tracking-widest uppercase inline-flex items-center gap-2">
            {t.coaches.title}
            <SectionAnchor id="coaches" />
          </h2>
          <p className="text-slate-900 font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tighter">
            {t.coaches.subtitle}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {coachesData.map((coach) => (
            <CoachCard 
              key={coach.id}
              coach={coach}
              currentLang={currentLang}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Coaches;
