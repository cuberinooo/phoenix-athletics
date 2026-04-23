import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation/Navigation';
import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import Management from '../components/Management/Management';
import Schedule from '../components/Schedule/Schedule';
import Contact from '../components/Contact/Contact';
import Footer from '../components/Footer/Footer';
import Coaches from '../components/Coaches/Coaches';
import { translations } from '../translations/translations';

const Home = () => {
    const [language, setLanguage] = useState('de');
    const t = translations[language];

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const scrollToSection = (section) => {
        const element = document.getElementById(section);
        if (element) {
            const navHeight = 80; // Approximate height of our nav
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <div className="bg-dark min-h-screen selection:bg-primary selection:text-white">
            <Navigation
                language={language}
                setLanguage={setLanguage}
                t={t}
                scrollToSection={scrollToSection}
            />
            <main>
                <Hero t={t} scrollToSection={scrollToSection} />
                <About t={t} />
                <Management t={t} />
                <Coaches t={t} />
                <Schedule t={t} />
                <Contact t={t} />
            </main>
            <Footer t={t} />
        </div>
    );
};

export default Home;
