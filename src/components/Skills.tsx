import React from 'react';
import { SkillCategory } from '../data/portfolioData';

interface SkillsProps {
  skills: SkillCategory[];
}

export const Skills: React.FC<SkillsProps> = ({ skills }) => {
  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-sky-400 bg-sky-950/50 border border-sky-900/60 mb-3">
            <span>02 // TECHNICAL SKILLS</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Organized Technical Competencies
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            A structured breakdown of languages, frameworks, and developer tools applied in real-world machine learning, generative AI, and data science projects.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skills.map((category, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-slate-700 transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500"></span>
                  {category.category}
                </h3>
                <span className="text-xs font-mono text-slate-500 bg-slate-800/80 px-2 py-0.5 rounded-full">{category.items.length} items</span>
              </div>
              <p className="text-slate-400 text-xs mb-4 leading-relaxed">{category.description}</p>
              
              <div className="flex flex-wrap gap-2">
                {category.items.map((item, itemIdx) => (
                  <div key={itemIdx} className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    item.highlight 
                      ? 'bg-sky-500/10 text-sky-300 border border-sky-500/30 hover:border-sky-400 hover:bg-sky-500/20' 
                      : 'bg-slate-800/70 text-slate-300 border border-slate-700/60 hover:border-slate-600 hover:text-white'
                  }`}>
                    <span>{item.name}</span>
                    {item.note && <span className="text-[10px] opacity-60 hidden sm:inline">· {item.note}</span>}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
