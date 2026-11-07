import React, { useEffect, useRef, useState } from 'react';
import { ChevronRight, ExternalLink } from 'lucide-react';

const MEDIA = `${process.env.PUBLIC_URL}/media`;
const SOURCES = {
    landscape: { video: `${MEDIA}/hero-16x9.mp4`, poster: `${MEDIA}/hero-16x9-poster.webp` },
    portrait: { video: `${MEDIA}/hero-9x16.mp4`, poster: `${MEDIA}/hero-9x16-poster.webp` },
};

// Skip the background video for people who asked for less motion or less data;
// they get the (identical-looking) poster frame instead.
function shouldPlayVideo() {
    if (typeof window === 'undefined' || !window.matchMedia) return false;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
    const conn = navigator.connection;
    return !(conn && conn.saveData);
}

const Hero = ({ t, scrollToSection }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);

    useEffect(() => {
        const video = videoRef.current;
        if (!video || !shouldPlayVideo()) return;
        const portrait = window.matchMedia('(orientation: portrait)').matches;
        video.muted = true; // React doesn't reliably reflect `muted` on hydrated <video>; autoplay needs it
        video.src = SOURCES[portrait ? 'portrait' : 'landscape'].video;
        const onPlaying = () => setIsPlaying(true);
        video.addEventListener('playing', onPlaying);
        video.play().catch(() => {});
        return () => video.removeEventListener('playing', onPlaying);
    }, []);

    return (
        <section id="home" className="relative h-screen min-h-[700px] overflow-hidden bg-dark">
            {/* Poster: works without JS, in the prerendered HTML and for reduced-motion users */}
            <picture>
                <source media="(orientation: portrait)" srcSet={SOURCES.portrait.poster} />
                <img
                    src={SOURCES.landscape.poster}
                    alt=""
                    fetchpriority="high"
                    className="absolute inset-0 w-full h-full object-cover"
                />
            </picture>

            <video
                ref={videoRef}
                muted
                loop
                playsInline
                preload="auto"
                aria-hidden="true"
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    isPlaying ? 'opacity-100' : 'opacity-0'
                }`}
            />

            {/* Grit overlay for text contrast */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/85" />

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
                        <a
                            href="https://app.booklyfit.de"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-black px-8 py-4 rounded-none font-display text-xl font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
                        >
                            {t.announcement.bookingCta}
                            <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </a>

                        <button
                            onClick={() => scrollToSection('contact')}
                            className="group flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-black px-8 py-4 rounded-none font-display text-xl font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105"
                        >
                            {t.hero.cta}
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
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
