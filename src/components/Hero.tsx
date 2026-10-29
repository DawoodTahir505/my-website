import React from 'react';
import { Profile } from '../data/portfolioData';
import { NeuralCanvas } from './NeuralCanvas';

interface HeroProps {
  profile: Profile;
}

export const Hero: React.FC<HeroProps> = ({ profile }) => {
  return (
    <section id="hero" className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Interactive Neural Canvas Background */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <NeuralCanvas />
      </div>

      {/* Subtle Vignette Gradient */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#07090e]/40 via-transparent to-[#07090e]"></div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        
        {/* Status Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/60 backdrop-blur-md mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-xs font-mono font-medium text-slate-300">{profile.badge}</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black tracking-tight text-white mb-4">
          {profile.wordmark}
        </h1>

        {/* Professional Subtitle */}
        <p className="text-base sm:text-xl font-mono text-sky-400 font-medium tracking-wide mb-6">
          {profile.subtitles.slice(0, 3).join(' · ')}
        </p>

        {/* Tagline */}
        <blockquote className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-200 max-w-2xl mx-auto mb-6 leading-snug text-balance">
          "{profile.heroTagline}"
        </blockquote>

        {/* Short Intro */}
        <p className="text-slate-400 text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed text-pretty">
          {profile.shortIntro}
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a href="#projects" className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl text-sm font-semibold bg-gradient-to-r from-sky-400 to-blue-500 hover:from-sky-300 hover:to-blue-400 text-slate-950 shadow-lg shadow-sky-500/20 hover:shadow-sky-500/30 transition-all duration-200">
            <span>Explore My Projects</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>
          </a>

          <a href="#contact" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-sm font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-slate-600 transition-all duration-200">
            <span>Contact Me</span>
            <svg className="w-4 h-4 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
          </a>

          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl text-sm font-medium bg-slate-900/40 hover:bg-slate-800/80 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700 transition-all duration-200" aria-label="GitHub Profile">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            <span className="font-mono text-xs">dawoodTahir505</span>
          </a>
        </div>

      </div>
    </section>
  );
};
