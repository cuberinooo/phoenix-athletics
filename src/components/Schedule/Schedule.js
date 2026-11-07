import React, { useEffect } from 'react';
import { Calendar, ExternalLink } from 'lucide-react';
import SectionAnchor from '../common/SectionAnchor';

const BOOKLYFIT_SLUG = 'phoenix-athletics';
const EMBED_SRC = 'https://app.booklyfit.de/embed.js';
const SCHEDULE_URL = `https://app.booklyfit.de/gym/${BOOKLYFIT_SLUG}/schedule`;

// embed.js mounts every not-yet-mounted [data-booklyfit-schedule] node once,
// when it executes. It has no re-init API, so on each (re)mount of the
// container we append a fresh copy of the script to pick up the new node.
function runEmbedScript() {
  document
    .querySelectorAll(`script[data-booklyfit-embed]`)
    .forEach((s) => s.remove());
  const script = document.createElement('script');
  script.src = EMBED_SRC;
  script.async = true;
  script.setAttribute('data-booklyfit-embed', '');
  document.body.appendChild(script);
}

const Schedule = ({ t }) => {
  const lang = t.nav.home === 'Home' ? 'en' : 'de';

  useEffect(() => {
    runEmbedScript();
  }, [lang]);

  return (
    <section id="schedule" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 space-y-4">
          <div className="inline-flex items-center gap-3 text-primary font-display text-xl font-bold tracking-widest uppercase">
            <Calendar className="w-6 h-6" />
            <span>{t.schedule.title}</span>
            <SectionAnchor id="schedule" />
          </div>
          <h2 className="text-slate-900 font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tighter">
            Push Your Limits
          </h2>
        </div>

        {/* Live Booklyfit calendar. `key` forces a fresh container on language switch. */}
        <div className="bg-white border border-slate-100 shadow-sm min-h-[600px]">
          <div
            key={lang}
            data-booklyfit-schedule={BOOKLYFIT_SLUG}
            data-lang={lang}
          />
        </div>

        {/* Plain link: fallback when the iframe is blocked, and a crawlable pointer to the live plan */}
        <div className="mt-4 flex justify-center">
          <a
            href={SCHEDULE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-display font-bold uppercase tracking-wider text-sm"
          >
            {t.schedule.openExternal}
            <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>

        <div className="mt-8 p-6 bg-white border border-slate-100 text-center shadow-sm">
          <p className="text-slate-600 font-medium italic">
            {t.schedule.note}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
