import React from 'react';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../../assets/logo.png';

const Footer = ({ t }) => {
  return (
    <footer className="bg-dark border-t border-slate-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Phoenix Athletics" className="h-10 w-auto brightness-0 invert" />
              <div className="font-display text-2xl font-black uppercase tracking-tighter text-white">
                Phoenix <span className="text-primary">Athletics</span>
              </div>
            </div>
            <p className="text-slate-500 text-sm max-w-xs leading-relaxed">
              We are Phoenix Athletics e.V., a passionate community dedicated to Functional Fitness and empowering people in Neu-Ulm.
            </p>
          </div>

          {/* Links Column */}
          <div className="space-y-6">
            <h4 className="text-white font-display text-lg font-bold uppercase tracking-widest">
              Resources
            </h4>
            <div className="flex flex-col gap-3">
              <a 
                href="/assets/docs/satzung.pdf" 
                className="text-slate-500 hover:text-primary transition-colors text-sm font-medium uppercase tracking-wider" 
                download
              >
                {t.footer.bylaws}
              </a>
              <a 
                href="/assets/docs/beitragsordnung_26_03_26.pdf" 
                className="text-slate-500 hover:text-primary transition-colors text-sm font-medium uppercase tracking-wider" 
                download
              >
                {t.footer.membershipFeeRegulations}
              </a>
              <Link 
                to="/imprint" 
                className="text-slate-500 hover:text-primary transition-colors text-sm font-medium uppercase tracking-wider"
              >
                {t.imprint.title}
              </Link>
            </div>
          </div>

          {/* Slogan Column */}
          <div className="space-y-6 md:text-right">
            <h4 className="text-white font-display text-lg font-bold uppercase tracking-widest">
              Motto
            </h4>
            <div className="space-y-2">
              <p className="text-primary font-display text-3xl font-black uppercase italic tracking-tighter">
                Together We Rise!
              </p>
              <p className="text-slate-600 font-display text-xl font-bold uppercase tracking-tighter">
                Burn. Rise. Repeat.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-xs font-bold uppercase tracking-widest">
          <p>© {new Date().getFullYear()} Phoenix Athletics e.V.</p>
          <div className="flex items-center gap-1.5">
            <span>Made with</span>
            <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
            <span>by our community</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
