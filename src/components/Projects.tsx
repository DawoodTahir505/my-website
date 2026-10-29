import React from 'react';
import { Project } from '../data/portfolioData';

interface ProjectsProps {
  projects: Project[];
  onOpenModal: (project: Project) => void;
  githubUrl: string;
}

export const Projects: React.FC<ProjectsProps> = ({ projects, onOpenModal, githubUrl }) => {
  const getThemeGradient = (theme: string) => {
    switch (theme) {
      case 'cyan-violet':
        return 'bg-gradient-to-r from-sky-500/30 to-violet-500/30';
      case 'indigo-violet':
        return 'bg-gradient-to-r from-indigo-500/30 to-purple-500/30';
      case 'emerald-cyan':
        return 'bg-gradient-to-r from-emerald-500/30 to-sky-500/30';
      case 'violet-fuchsia':
        return 'bg-gradient-to-r from-violet-500/30 to-fuchsia-500/30';
      default:
        return 'bg-gradient-to-r from-sky-500/20 to-indigo-500/20';
    }
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-slate-950/30">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-sky-400 bg-sky-950/50 border border-sky-900/60 mb-3">
              <span>03 // FEATURED WORK</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
              Applied AI &amp; Machine Learning Projects
            </h2>
            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Real-world systems engineered with Python, modern LLMs, Retrieval-Augmented Generation, and computer vision architectures.
            </p>
          </div>

          <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-xs font-mono text-sky-400 hover:text-sky-300 transition-colors self-start md:self-auto">
            <span>Explore all repositories</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </a>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <article key={project.id} className="flex flex-col rounded-2xl bg-slate-900/60 border border-slate-800/90 overflow-hidden hover:border-slate-700 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 group">
              
              {/* Header Visual */}
              <div className="relative h-44 w-full bg-gradient-to-br from-slate-900 via-slate-900/90 to-slate-950 p-5 flex flex-col justify-between overflow-hidden border-b border-slate-800/80">
                <div className={`absolute inset-0 opacity-20 pointer-events-none ${getThemeGradient(project.visualTheme)}`}></div>
                <div className="absolute right-[-20px] top-[-20px] w-48 h-48 rounded-full bg-sky-500/10 blur-3xl pointer-events-none"></div>

                <div className="flex items-center justify-between z-10">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-mono font-medium bg-slate-800/80 text-sky-300 border border-slate-700/60 backdrop-blur-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse"></span>
                    {project.category}
                  </span>
                  <span className="text-[11px] font-mono text-slate-400 bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">
                    {project.demoStatus}
                  </span>
                </div>

                <div className="z-10 mt-auto flex items-end justify-between">
                  <div className="font-mono text-xs text-slate-500">
                    <code>{project.technologies.slice(0, 2).join(' / ')}</code>
                  </div>
                  <button 
                    type="button" 
                    onClick={() => onOpenModal(project)}
                    className="text-xs font-medium text-slate-400 group-hover:text-sky-300 flex items-center gap-1 transition-colors"
                  >
                    <span>Details</span>
                    <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-white font-semibold text-xl mb-2.5 group-hover:text-sky-300 transition-colors">
                    {project.name}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-5">
                    {project.shortDescription}
                  </p>
                </div>

                <div>
                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.technologies.map((tech, techIdx) => (
                      <span key={techIdx} className="px-2.5 py-1 rounded-md text-xs font-mono bg-slate-800/60 text-slate-300 border border-slate-700/50">
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Buttons */}
                  <div className="flex items-center gap-3 pt-4 border-t border-slate-800/60">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-800 hover:bg-slate-750 text-white border border-slate-700/80 hover:border-slate-600 transition-all duration-200">
                      <svg className="w-4 h-4 text-slate-300" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                      <span>Source Code</span>
                    </a>

                    {project.demoUrl ? (
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-sky-500/10 hover:bg-sky-500/20 text-sky-300 border border-sky-500/30 hover:border-sky-400 transition-all duration-200">
                        <span>Live Demo</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
                      </a>
                    ) : (
                      <button 
                        type="button" 
                        onClick={() => onOpenModal(project)}
                        className="flex-1 inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium bg-slate-800/40 text-slate-400 hover:text-slate-200 border border-slate-700/40 hover:border-slate-600 transition-all duration-200"
                      >
                        <span>View Specs</span>
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                      </button>
                    )}
                  </div>
                </div>

              </div>
            </article>
          ))}
        </div>

      </div>
    </section>
  );
};
