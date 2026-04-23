import React from 'react';
import {Calendar, Dumbbell, Users, Footprints} from 'lucide-react';

const Schedule = ({ t }) => {
  const weekSchedule = {
    monday: {
      de: 'Montag',
      en: 'Monday',
      classes: [
        { time: '17:30', name: 'Run training', icon: Footprints }
      ]
    },
    tuesday: {
      de: 'Dienstag',
      en: 'Tuesday',
      classes: [
        { time: '18:15', name: 'Functional Fitness', icon: Dumbbell }
      ]
    },
    wednesday: {
      de: 'Mittwoch',
      en: 'Wednesday',
      classes: [
        { time: '18:15', name: 'Functional Fitness', icon: Dumbbell }
      ]
    },
    thursday: {
      de: 'Donnerstag',
      en: 'Thursday',
      classes: [
        { time: '19:00', name: 'Functional Fitness', icon: Dumbbell }
      ]
    },
    friday: {
      de: 'Freitag',
      en: 'Friday',
      classes: [
        { time: '18:15', name: 'Functional Fitness', icon: Dumbbell }
      ]
    },
    saturday: {
      de: 'Samstag',
      en: 'Saturday',
      classes: []
    },
    sunday: {
      de: 'Sonntag',
      en: 'Sunday',
      classes: [
          { time: '10:00', name: 'Team WOD', icon: Users }
      ]
    }
  };

  const currentLang = t.nav.home === 'Home' ? 'en' : 'de';

  return (
    <section id="schedule" className="py-24 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-3 text-primary font-display text-xl font-bold tracking-widest uppercase">
            <Calendar className="w-6 h-6" />
            <span>{t.schedule.title}</span>
          </div>
          <h2 className="text-white font-display text-4xl md:text-5xl font-extrabold uppercase tracking-tighter">
            Push Your Limits
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-4">
          {Object.entries(weekSchedule).map(([day, info]) => (
            <div 
              key={day} 
              className={`relative p-6 border transition-all duration-300 ${
                info.classes.length > 0 
                  ? 'bg-slate-900 border-slate-800 hover:border-primary/50' 
                  : 'bg-dark border-slate-900 opacity-50'
              }`}
            >
              <h3 className="font-display text-xl font-bold uppercase tracking-tight text-white mb-6 border-b border-slate-800 pb-2">
                {info[currentLang]}
              </h3>
              
              <div className="space-y-6">
                {info.classes.length > 0 ? (
                  info.classes.map((classInfo, index) => {
                    const Icon = classInfo.icon;
                    return (
                      <div key={index} className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <Icon className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex flex-col">
                            <span className="text-primary font-display font-bold text-sm">
                              {currentLang === 'de' 
                                ? `${classInfo.time} Uhr` 
                                : (() => {
                                    const [hours, minutes] = classInfo.time.split(':');
                                    const hour = parseInt(hours);
                                    const ampm = hour >= 12 ? 'PM' : 'AM';
                                    const displayHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
                                    return `${displayHour}:${minutes} ${ampm}`;
                                  })()
                              }
                            </span>
                          </div>
                        </div>
                        <p className="text-slate-100 font-display text-lg font-bold leading-tight uppercase tracking-tight">
                          {classInfo.name}
                        </p>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-slate-600 font-display text-sm font-bold uppercase tracking-widest italic">
                    Rest Day
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-slate-900/50 border border-slate-800 text-center">
          <p className="text-slate-400 font-medium italic">
            {t.schedule.note}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Schedule;
