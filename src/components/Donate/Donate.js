import React from 'react';
import { ExternalLink, HeartHandshake } from 'lucide-react';
import SectionAnchor from '../common/SectionAnchor';

const DONATE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSeK95dNMyo5bWaKslI1i-iCogVctWK5sNf8_UOse7Bio5vPoQ/viewform?usp=sharing&ouid=116913291547917943971';

const Donate = ({ t }) => {
  return (
    <section id="donate" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="space-y-4 mb-12">
          <h2 className="text-primary font-display text-xl font-bold tracking-widest uppercase inline-flex items-center gap-2">
            {t.donate.eyebrow}
            <SectionAnchor id="donate" />
          </h2>
          <p className="text-slate-900 font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tighter">
            {t.donate.title}
          </p>
        </div>

        <div className="bg-white border border-slate-100 p-8 md:p-12 space-y-8 shadow-xl">
          <p className="text-slate-700 text-xl font-medium leading-relaxed">
            {t.donate.description}
          </p>

          <a
            href={DONATE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 bg-primary hover:bg-primary-dark text-black px-8 py-5 font-display text-2xl font-black uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <HeartHandshake className="w-8 h-8" />
            {t.donate.cta}
            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-64 bg-primary/10 blur-3xl rounded-full z-0" />
    </section>
  );
};

export default Donate;
