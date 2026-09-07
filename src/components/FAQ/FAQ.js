import React from 'react';
import { HelpCircle } from 'lucide-react';
import SectionAnchor from '../common/SectionAnchor';

const FAQ = ({ t }) => {
  return (
    <section id="faq" className="py-24 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-3 text-primary font-display text-xl font-bold tracking-widest uppercase">
            <HelpCircle className="w-6 h-6" />
            <span>{t.faq.title}</span>
            <SectionAnchor id="faq" />
          </div>
          <h2 className="text-slate-900 font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tighter">
            {t.faq.subtitle}
          </h2>
        </div>

        <div className="space-y-6">
          {t.faq.items.map((item, index) => (
            <div
              key={index}
              className="p-8 border border-slate-100 bg-slate-50 shadow-sm"
            >
              <h3 className="text-slate-900 font-display text-xl font-bold mb-3">
                {item.q}
              </h3>
              <p className="text-slate-600 text-lg leading-relaxed">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
