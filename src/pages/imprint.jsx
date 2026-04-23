import Navigation from "../components/Navigation/Navigation";
import React, {useState, useEffect} from "react";
import {translations} from "../translations/translations";
import {useNavigate} from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Imprint() {
    const [language, setLanguage] = useState('de');
    const t = translations[language];

    let navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const scrollToSection = (section) => {
        navigate('/');
        if (section !== 'home') {
            setTimeout(() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' }), 250);
        }
    };

    return (
        <div className="min-h-screen bg-white text-slate-900 flex flex-col">
            <Navigation
                language={language}
                setLanguage={setLanguage}
                t={t}
                scrollToSection={scrollToSection}
            />
            
            <main className="flex-grow pt-32 pb-20 px-4">
                <div className="max-w-4xl mx-auto">
                    <button 
                        onClick={() => navigate('/')}
                        className="group flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8 font-display text-sm font-bold uppercase tracking-widest"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Back to Home
                    </button>

                    <h1 className="font-display text-4xl md:text-6xl font-extrabold uppercase tracking-tighter mb-12 text-slate-900">
                        {t.imprint.title}
                    </h1>

                    <div className="bg-white border border-slate-100 p-8 md:p-12 space-y-8 text-slate-700 leading-relaxed shadow-xl">
                        <div>
                            <p className="text-slate-900 font-bold mb-2 uppercase tracking-wide text-sm">{t.imprint.paragraph}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <div>
                                    <p className="text-primary font-display text-lg font-bold uppercase mb-2 tracking-wide">{t.imprint.associationName}</p>
                                    <p>Phoenix Athletics e.V.<br />
                                       Curd-Jürgens-Str. 23<br />
                                       89231 Neu-Ulm</p>
                                </div>

                                <div>
                                    <p className="text-primary font-display text-lg font-bold uppercase mb-2 tracking-wide">Kontakt</p>
                                    <p>E-Mail: info@phoenix-athletics.de</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-primary font-display text-lg font-bold uppercase mb-2 tracking-wide">{t.imprint.authorizedBoardMembers}</p>
                                    <p className="text-sm">Vertreten durch den Vorstand gemäß § 26 BGB:</p>
                                    <ul className="list-none space-y-1 pt-2">
                                        <li>1. Vorsitzende: Viola Hentrich</li>
                                        <li>2. Vorsitzende: Sabrina Ng</li>
                                        <li>Weitere vertretungsberechtigte Vorstandsmitglieder: David Baum</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-slate-100 space-y-6">
                            <div>
                                <p className="text-slate-900 font-display text-xl font-bold uppercase tracking-tight mb-3">{t.imprint.registerEntryTitle}</p>
                                <p className="text-sm">
                                    Eintragung im Vereinsregister.<br />
                                    Registergericht: Memmingen<br />
                                    Registernummer: VR 201286
                                </p>
                            </div>

                            <div>
                                <p className="text-slate-900 font-display text-xl font-bold uppercase tracking-tight mb-3">{t.imprint.liabilityForContentTitle}</p>
                                <p className="text-sm italic">{t.imprint.liabilityForContentText}</p>
                            </div>

                            <div>
                                <p className="text-slate-900 font-display text-xl font-bold uppercase tracking-tight mb-3">{t.imprint.copyrightTitle}</p>
                                <p className="text-sm italic">{t.imprint.copyrightText}.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <footer className="bg-slate-50 border-t border-slate-100 py-8 text-center">
                <p className="text-slate-400 font-display text-xs font-bold uppercase tracking-widest">
                    © {new Date().getFullYear()} Phoenix Athletics e.V.
                </p>
            </footer>
        </div>
    );
}
