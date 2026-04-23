import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { ChevronRight } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-fade';

// Load hero images automatically
const heroImages = require
    .context('../../assets/hero', false, /\.(png|jpe?g|webp)$/)
    .keys()
    .map((key) => require(`../../assets/hero/${key.replace('./', '')}`));

const Hero = ({ t, scrollToSection }) => {
    return (
        <section id="home" className="relative h-screen min-h-[700px] overflow-hidden bg-dark">
            <Swiper
                modules={[Autoplay, EffectFade]}
                effect="fade"
                loop={true}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                className="absolute inset-0 w-full h-full"
            >
                {heroImages.map((img, i) => (
                    <SwiperSlide key={i}>
                        <div className="relative w-full h-full">
                            <img 
                                src={img} 
                                alt="" 
                                className="absolute inset-0 w-full h-full object-cover" 
                            />
                            {/* Grit overlay - slightly lighter for better image visibility but still providing contrast */}
                            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/80" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Content overlay */}
            <div className="relative z-20 h-full flex flex-col justify-center items-center text-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-4xl space-y-6">
                    <h1 className="font-display text-5xl md:text-8xl font-extrabold text-white leading-none tracking-tighter animate-fade-in drop-shadow-2xl">
                        {t.hero.title.split(' ').map((word, i) => (
                            <span key={i} className={i === 1 ? "text-primary block md:inline" : ""}>
                                {word}{' '}
                            </span>
                        ))}
                    </h1>
                    
                    <p className="font-sans text-lg md:text-2xl text-slate-300 font-medium tracking-wide max-w-2xl mx-auto animate-fade-in-delay">
                        {t.hero.subtitle}
                    </p>
                    
                    <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
                        <button
                            onClick={() => scrollToSection('contact')}
                            className="group flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-none font-display text-xl font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
                        >
                            {t.hero.cta}
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        
                        <button
                            onClick={() => scrollToSection('about')}
                            className="bg-transparent border-2 border-white/20 hover:border-white text-white px-8 py-4 rounded-none font-display text-xl font-bold uppercase tracking-wider transition-all duration-300"
                        >
                            {t.nav.about}
                        </button>
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block opacity-50">
                <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
                    <div className="w-1 h-2 bg-white rounded-full animate-bounce" />
                </div>
            </div>
        </section>
    );
};

export default Hero;
