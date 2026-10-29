import React, { useState } from 'react';
import { PORTFOLIO_DATA, Project } from './data/portfolioData';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Focus } from './components/Focus';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { ProjectModal } from './components/ProjectModal';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="bg-[#07090e] text-slate-100 min-h-screen selection:bg-sky-500/20 selection:text-sky-300 relative">
      {/* Ambient background glows */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[550px] bg-gradient-to-b from-sky-500/10 via-indigo-500/5 to-transparent blur-[140px]"></div>
        <div className="absolute top-[40%] -right-40 w-[600px] h-[600px] bg-violet-600/5 blur-[160px]"></div>
        <div className="absolute top-[75%] -left-40 w-[600px] h-[600px] bg-sky-600/5 blur-[160px]"></div>
      </div>

      <Navbar profile={PORTFOLIO_DATA.profile} />

      <main id="main-content" className="relative z-10">
        <Hero profile={PORTFOLIO_DATA.profile} />
        <About about={PORTFOLIO_DATA.about} />
        <Skills skills={PORTFOLIO_DATA.skills} />
        <Projects 
          projects={PORTFOLIO_DATA.projects} 
          onOpenModal={(p) => setSelectedProject(p)} 
          githubUrl={PORTFOLIO_DATA.profile.githubUrl} 
        />
        <Focus focusAreas={PORTFOLIO_DATA.focusAreas} />
        <Contact profile={PORTFOLIO_DATA.profile} />
      </main>

      <Footer profile={PORTFOLIO_DATA.profile} />

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </div>
  );
};

export default App;
