import React, { useState, useEffect } from 'react';
import { Profile } from '../data/portfolioData';

interface NavbarProps {
  profile: Profile;
}

export const Navbar: React.FC<NavbarProps> = ({ profile }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      isScrolled ? 'bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/20' : 'bg-transparent'
    }`}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Personal Wordmark */}
          <a href="#hero" className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-lg py-1 px-2" aria-label="Home - Dawood">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-600 flex items-center justify-center p-[1px] shadow-sm shadow-sky-500/20 group-hover:scale-105 transition-transform">
              <div className="w-full h-full bg-[#07090e] rounded-[7px] flex items-center justify-center">
                <span className="font-mono text-xs font-bold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">D</span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-wider text-white text-base sm:text-lg group-hover:text-sky-300 transition-colors">{profile.wordmark}</span>
              <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">AI · Data Science</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2 px-3 py-1.5 rounded-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md shadow-inner shadow-black/20" aria-label="Main Navigation">
            <a href="#hero" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-full transition-all">Home</a>
            <a href="#about" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-full transition-all">About</a>
            <a href="#skills" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-full transition-all">Skills</a>
            <a href="#projects" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-full transition-all">Projects</a>
            <a href="#focus" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-full transition-all">Focus</a>
            <a href="#contact" className="px-3.5 py-1.5 text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800/70 rounded-full transition-all">Contact</a>
          </nav>

          {/* Right Actions */}
          <div className="hidden sm:flex items-center gap-3">
            <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700/80 transition-all" aria-label="GitHub Profile">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            </a>
            <a href="#contact" className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-sky-300 border border-slate-700/80 hover:border-sky-500/50 shadow-sm transition-all duration-200">
              Get in Touch
            </a>
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            type="button" 
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400"
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-[#07090e]/95 backdrop-blur-xl border-b border-slate-800/90 px-6 py-6 transition-all duration-300">
          <nav className="flex flex-col gap-3 font-medium text-sm" aria-label="Mobile Navigation">
            <a href="#hero" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-slate-300 hover:text-sky-300 hover:bg-slate-900/60 rounded-lg">Home</a>
            <a href="#about" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-slate-300 hover:text-sky-300 hover:bg-slate-900/60 rounded-lg">About Me</a>
            <a href="#skills" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-slate-300 hover:text-sky-300 hover:bg-slate-900/60 rounded-lg">Technical Skills</a>
            <a href="#projects" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-slate-300 hover:text-sky-300 hover:bg-slate-900/60 rounded-lg">Featured Projects</a>
            <a href="#focus" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-slate-300 hover:text-sky-300 hover:bg-slate-900/60 rounded-lg">Learning &amp; Focus</a>
            <a href="#contact" onClick={() => setMobileOpen(false)} className="px-3 py-2 text-slate-300 hover:text-sky-300 hover:bg-slate-900/60 rounded-lg">Contact</a>
          </nav>
        </div>
      )}
    </header>
  );
};
