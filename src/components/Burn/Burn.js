import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { CalendarDays, ExternalLink, MapPin } from 'lucide-react';
import SectionAnchor from '../common/SectionAnchor';

import 'swiper/css';
import 'swiper/css/effect-fade';

const burnImages = [
  '/burn/burn.36.54.jpeg',
  '/burn/burn_.36.36.jpeg',
  '/burn/burn_36.54.jpeg',
];

const BURN_SIGNUP_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSen94xdUec0c7z94IY43NvD_UozSJRzgdsi-uTwm6Qk90JNEQ/viewform';

const Burn = ({ t }) => {
  return (
    <section id="burn" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-primary font-display text-xl font-bold tracking-widest uppercase inline-flex items-center gap-2">
            {t.burn.eyebrow}
            <SectionAnchor id="burn" />
          </h2>
          <p className="text-slate-900 font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tighter">
            {t.burn.title}
          </p>
          <div className="w-24 h-1 bg-primary mx-auto" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="max-w-sm mx-auto lg:mx-0 w-full">
            <Swiper
              modules={[Autoplay, EffectFade]}
              effect="fade"
              loop={true}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              className="aspect-[4/5] w-full rounded-none border border-slate-100 shadow-xl overflow-hidden"
            >
              {burnImages.map((src, i) => (
                <SwiperSlide key={i}>
                  <img
                    src={src}
                    alt={`Phoenix Burn ${i + 1}`}
                    className="w-full h-full object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="space-y-6">
            <div className="inline-flex flex-wrap items-center gap-x-6 gap-y-2 text-slate-700 font-display font-bold uppercase tracking-wider text-sm">
              <span className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-primary" />
                {t.burn.date}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary" />
                {t.burn.location}
              </span>
            </div>

            <p className="text-slate-600 text-lg leading-relaxed">
              {t.burn.description}
            </p>

            <a
              href={BURN_SIGNUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-black px-8 py-4 rounded-none font-display text-xl font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
            >
              {t.burn.cta}
              <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Burn;
