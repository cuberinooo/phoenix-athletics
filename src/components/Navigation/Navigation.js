import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, ChevronRight } from 'lucide-react';
import logo from '../../assets/logo.png';

const Navigation = ({ language, setLanguage, t, scrollToSection }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (section) => {
    const sectionMap = {
      home: 'home',
      about: 'about',
      management: 'management',
      coaches: 'coaches',
      schedule: 'schedule',
      contact: 'contact'
    };
    scrollToSection(sectionMap[section] || 'home');
    setIsMenuOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled || isMenuOpen
          ? 'bg-white border-b border-slate-200 shadow-sm' 
          : 'bg-transparent'
      }`}
    >
      {/* Announcement Bar */}
      <div className={`bg-primary text-black transition-all duration-300 overflow-hidden ${
        isScrolled || isMenuOpen ? 'max-h-0' : 'max-h-20 border-b border-black/5'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-center">
          <span className="font-display text-sm font-bold uppercase tracking-wider">
            {t.announcement.text}
          </span>
          <a 
            href="https://bookly.phoenix-athletics.de/register?companyName=Phoenix%20Athletics"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-1 bg-black text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-slate-800 transition-all duration-200"
          >
            {t.announcement.cta}
            <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
          </a>
        </div>
      </div>

      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${
        isScrolled || isMenuOpen ? 'py-3' : 'py-6'
      } ${!isScrolled && !isMenuOpen ? 'bg-white/50 backdrop-blur-md shadow-sm border border-white/20' : ''}`}>
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => handleNavClick('home')}
          >
            <img 
              src={logo} 
              alt="Phoenix Athletics" 
              className="h-10 w-auto" 
            />
            <div className="hidden sm:block font-display text-xl font-bold uppercase tracking-tighter text-slate-900">
              Phoenix <span className="text-primary">Athletics</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {Object.entries(t.nav).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleNavClick(key)}
                className="font-display text-sm font-semibold uppercase tracking-widest text-slate-600 hover:text-primary transition-colors duration-200"
              >
                {value}
              </button>
            ))}

            <a
              href="https://bookly.phoenix-athletics.de/register?companyName=Phoenix%20Athletics"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-primary text-black px-5 py-2 text-sm font-bold uppercase tracking-widest hover:bg-primary-dark transition-all duration-200"
            >
              {t.announcement.membershipCta}
            </a>
            
            <button
              onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-all duration-200"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'DE' : 'EN'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-white z-[-1] md:hidden transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center pt-24 pb-12 overflow-y-auto h-full gap-6 p-4">
          {Object.entries(t.nav).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleNavClick(key)}
              className="font-display text-2xl font-bold uppercase tracking-tighter text-slate-900 hover:text-primary transition-colors shrink-0"
            >
              {value}
            </button>
          ))}

          <a
            href="https://bookly.phoenix-athletics.de/register?companyName=Phoenix%20Athletics"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full max-w-xs text-center bg-primary text-black py-4 text-xl font-bold uppercase tracking-tighter hover:bg-primary-dark transition-colors shrink-0"
          >
            {t.announcement.membershipCta}
          </a>
          
          <button
            onClick={() => {
              setLanguage(language === 'en' ? 'de' : 'en');
              setIsMenuOpen(false);
            }}
            className="mt-2 flex items-center gap-2 px-6 py-3 rounded-full border border-slate-200 text-slate-900 text-base font-bold shrink-0"
          >
            <Globe className="w-5 h-5" />
            <span>{language === 'en' ? 'Deutsch' : 'English'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
