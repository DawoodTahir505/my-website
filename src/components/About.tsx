import React from 'react';
import { AboutData } from '../data/portfolioData';

interface AboutProps {
  about: AboutData;
}

export const About: React.FC<AboutProps> = ({ about }) => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'sparkles':
        return <svg className="w-6 h-6 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" /></svg>;
      case 'cpu':
        return <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" /></svg>;
      case 'database':
        return <svg className="w-6 h-6 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>;
      case 'brain-circuit':
      default:
        return <svg className="w-6 h-6 text-sky-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.75" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /><circle cx="9" cy="8" r="1.5" fill="currentColor"/><circle cx="15" cy="8" r="1.5" fill="currentColor"/><path d="M12 7v3m-3-1h6" stroke-width="1.5"/></svg>;
    }
  };

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950/40">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-sky-400 bg-sky-950/50 border border-sky-900/60 mb-3">
            <span>01 // ABOUT ME</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            {about.headline}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Narrative Content */}
          <div className="lg:col-span-7 space-y-6">
            {about.paragraphs.map((p, idx) => (
              <p key={idx} className="text-slate-300 leading-relaxed text-base md:text-lg">
                {p}
              </p>
            ))}
          </div>

          {/* Pillars */}
          <div className="lg:col-span-5">
            <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
              Core Technical Anchors
            </h3>
            <div className="space-y-4">
              {about.pillars.map((pillar, idx) => (
                <div key={idx} className="group p-5 rounded-2xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700/80 hover:bg-slate-900/70 transition-all duration-300">
                  <div className="w-11 h-11 rounded-xl bg-slate-800/60 border border-slate-700/50 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    {getIcon(pillar.icon)}
                  </div>
                  <h4 className="text-white font-semibold text-base mb-1.5">{pillar.title}</h4>
                  <p className="text-slate-400 text-sm leading-relaxed">{pillar.description}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
