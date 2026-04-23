import React, { useState, useEffect } from 'react';
import { Menu, X, Globe } from 'lucide-react';
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
        isScrolled 
          ? 'py-3 bg-dark/80 backdrop-blur-lg border-b border-slate-800' 
          : 'py-6 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer" 
            onClick={() => handleNavClick('home')}
          >
            <img 
              src={logo} 
              alt="Phoenix Athletics" 
              className="h-10 w-auto brightness-0 invert" 
            />
            <div className="hidden sm:block font-display text-xl font-bold uppercase tracking-tighter">
              Phoenix <span className="text-primary">Athletics</span>
            </div>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            {Object.entries(t.nav).map(([key, value]) => (
              <button
                key={key}
                onClick={() => handleNavClick(key)}
                className="font-display text-sm font-semibold uppercase tracking-widest text-slate-300 hover:text-primary transition-colors duration-200"
              >
                {value}
              </button>
            ))}
            
            <button
              onClick={() => setLanguage(language === 'en' ? 'de' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-slate-700 text-xs font-bold hover:bg-slate-800 transition-all duration-200"
            >
              <Globe className="w-3.5 h-3.5" />
              <span>{language === 'en' ? 'DE' : 'EN'}</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-dark/95 backdrop-blur-xl z-[-1] md:hidden transition-all duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8 p-4">
          {Object.entries(t.nav).map(([key, value]) => (
            <button
              key={key}
              onClick={() => handleNavClick(key)}
              className="font-display text-3xl font-bold uppercase tracking-tighter text-slate-100 hover:text-primary transition-colors"
            >
              {value}
            </button>
          ))}
          
          <button
            onClick={() => {
              setLanguage(language === 'en' ? 'de' : 'en');
              setIsMenuOpen(false);
            }}
            className="mt-4 flex items-center gap-2 px-6 py-3 rounded-full border border-slate-700 text-lg font-bold"
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
