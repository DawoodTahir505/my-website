import React from 'react';
import { FocusArea } from '../data/portfolioData';

interface FocusProps {
  focusAreas: FocusArea[];
}

export const Focus: React.FC<FocusProps> = ({ focusAreas }) => {
  return (
    <section id="focus" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-sky-400 bg-sky-950/50 border border-sky-900/60 mb-3">
            <span>04 // LEARNING &amp; DIRECTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
            Active Exploration &amp; Technical Interests
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            The domains and algorithmic paradigms I am actively investigating, implementing in research prototypes, and preparing to build production systems around.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {focusAreas.map((item, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-slate-900/40 border border-slate-800/90 hover:border-slate-700 transition-all duration-300">
              <div className="inline-block px-2.5 py-1 rounded-full text-xs font-mono text-sky-400 bg-sky-950/60 border border-sky-900/60 mb-3">
                {item.tag}
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.description}</p>
              
              <div className="flex flex-wrap gap-1.5">
                {item.keyTopics.map((topic, topicIdx) => (
                  <span key={topicIdx} className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-800/80 text-slate-300 border border-slate-700/50">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
