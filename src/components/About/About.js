import React from 'react';
import mapImage from '../../assets/ulm-map.png';
import heroImg1 from '../../assets/hero/001-PXL_20250927_092731913.PORTRAIT~2.jpg';
import heroImg2 from '../../assets/hero/PXL_20250604_171615879~2.jpg';

const About = ({ t }) => {
  return (
    <section id="about" className="relative py-24 overflow-hidden bg-dark">
      {/* Background Decor */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none grayscale invert"
        style={{ 
          backgroundImage: `url(${mapImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="text-primary font-display text-xl font-bold tracking-widest">
                {t.about.title}
              </h2>
              <h3 className="text-white font-display text-4xl md:text-5xl font-extrabold leading-tight">
                {t.about.subtitle}
              </h3>
            </div>
            
            <div className="space-y-6 text-slate-400 text-lg leading-relaxed">
              {t.about.content.slice(0, -2).map((paragraph, index) => (
                <p key={index} className={index === 0 ? "text-slate-200 font-medium text-xl" : ""}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="p-8 border-l-4 border-primary bg-slate-900/50 backdrop-blur-sm space-y-4">
              <p className="text-white font-display text-2xl font-bold italic">
                {t.about.content[t.about.content.length - 2]}
              </p>
              <p className="text-primary font-display text-3xl font-black uppercase tracking-tighter">
                {t.about.content[t.about.content.length - 1]}
              </p>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4 pt-12">
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800">
                  <img src={heroImg1} alt="Community" className="w-full h-full object-cover" />
                </div>
                <div className="aspect-square rounded-2xl bg-primary flex flex-col items-center justify-center text-center p-6 text-white">
                  <span className="font-display text-5xl font-black">100%</span>
                  <span className="font-display text-xl font-bold uppercase tracking-tight">Community</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="aspect-square rounded-2xl bg-slate-800 flex flex-col items-center justify-center text-center p-6 text-white border border-slate-700">
                  <span className="font-display text-5xl font-black text-primary">EVERY</span>
                  <span className="font-display text-xl font-bold uppercase tracking-tight">Level welcome</span>
                </div>
                <div className="aspect-[3/4] rounded-2xl overflow-hidden border border-slate-800">
                  <img src={heroImg2} alt="Training" className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-orange-500/20 blur-3xl rounded-full" />
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;
