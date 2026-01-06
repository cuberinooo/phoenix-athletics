import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import './Hero.css';

// Load hero images automatically
const heroImages = require
    .context('../../assets/hero', false, /\.(png|jpe?g|webp)$/)
    .keys()
    .map((key) => require(`../../assets/hero/${key.replace('./', '')}`));

const Hero = ({ t, scrollToSection }) => {
    return (
        <section id="home" className="hero">
            <Swiper
                modules={[Autoplay]}
                loop={true}
                centeredSlides={true}
                slidesPerView={1.8}          // Number of slides visible
                spaceBetween={-150}            // Negative spacing for overlap effect
                autoplay={{ delay: 2500 }}
                className="hero-swiper"
            >
                {heroImages.map((img, i) => (
                    <SwiperSlide key={i}>
                        <div className="hero-slide">
                            <img src={img} alt="" className="hero-image" />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Content overlay */}
            <div className="hero-content">
                <h1 className="hero-title animate-fade-in">{t.hero.title}</h1>
                <p className="hero-subtitle animate-fade-in-delay">{t.hero.subtitle}</p>
                <button
                    onClick={() => scrollToSection('contact')}
                    className="hero-cta animate-fade-in-delay-2"
                >
                    {t.hero.cta}
                </button>
            </div>
        </section>
    );
};

export default Hero;
