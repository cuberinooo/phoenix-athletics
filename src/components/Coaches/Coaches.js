import React from 'react';
import { coachesData } from '../../data/coachesData';
import { Award } from 'lucide-react';

const Coaches = ({ t }) => {
  const currentLang = t.nav.home === 'Home' ? 'en' : 'de';

  return (
    <section id="coaches" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-primary font-display text-xl font-bold tracking-widest uppercase">
            {t.coaches.title}
          </h2>
          <p className="text-slate-900 font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tighter">
            {t.coaches.subtitle}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {coachesData.map((coach) => (
            <div 
              key={coach.id} 
              className="group relative bg-white border border-slate-100 rounded-none overflow-hidden transition-all duration-300 hover:border-primary/50 shadow-lg hover:shadow-xl"
            >
              {/* Image Container */}
              <div className="aspect-[4/5] overflow-hidden">
                <img 
                  src={coach.image} 
                  alt={coach.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                  onError={(e) => {
                    e.target.src = `https://ui-avatars.com/api/?name=${coach.name}&size=500&background=ffc107&color=000`;
                  }}
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60" />
              </div>

              {/* Info Overlay */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="text-slate-900 font-display text-3xl font-bold uppercase tracking-tighter">
                    {coach.name}
                  </h3>
                  <p className="text-primary font-display text-lg font-bold uppercase tracking-wider">
                    {coach.title[currentLang]}
                  </p>
                </div>

                <p className="text-slate-600 line-clamp-3 text-sm leading-relaxed">
                  {coach.description[currentLang]}
                </p>

                <div className="pt-4 space-y-3">
                  <div className="flex items-center gap-2 text-slate-900 font-display font-bold text-xs uppercase tracking-widest">
                    <Award className="w-4 h-4 text-primary" />
                    <span>Certifications</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {coach.certifications.slice(0, 4).map((cert, index) => (
                      <span 
                        key={index} 
                        className="bg-slate-900 text-white px-2 py-1 text-[10px] font-bold uppercase tracking-wider"
                      >
                        {cert}
                      </span>
                    ))}
                    {coach.certifications.length > 4 && (
                      <span className="text-slate-400 text-[10px] font-bold uppercase self-center">
                        +{coach.certifications.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Corner Accent */}
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/10 transition-colors group-hover:bg-primary/20 pointer-events-none" style={{ clipPath: 'polygon(100% 0, 0 0, 100% 100%)' }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Coaches;
