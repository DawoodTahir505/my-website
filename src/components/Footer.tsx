import React from 'react';
import { Profile } from '../data/portfolioData';

interface FooterProps {
  profile: Profile;
}

export const Footer: React.FC<FooterProps> = ({ profile }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-[#05070b]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Wordmark & Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <a href="#hero" className="text-lg font-bold tracking-wider text-white hover:text-sky-300 transition-colors">
            {profile.wordmark}
          </a>
          <p className="text-xs text-slate-400 mt-1">
            {profile.heroTagline}
          </p>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6 text-xs text-slate-400 font-medium">
          <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
          <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">LinkedIn</a>
          <a href={`mailto:${profile.email}`} className="hover:text-sky-300 transition-colors">{profile.email}</a>
        </div>

        {/* Dynamic Copyright */}
        <div className="text-xs text-slate-400 font-mono text-center md:text-right">
          <span>&copy; {currentYear} Dawood. Crafted with precision.</span>
        </div>

      </div>
    </footer>
  );
};
