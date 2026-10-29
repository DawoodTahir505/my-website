import React, { useState } from 'react';
import { Profile } from '../data/portfolioData';

interface ContactProps {
  profile: Profile;
}

export const Contact: React.FC<ContactProps> = ({ profile }) => {
  const [copied, setCopied] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.prompt('Copy email address:', profile.email);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setFeedback('Please provide your name, email, and message.');
      return;
    }

    const mailSubject = encodeURIComponent(`[Portfolio Inquiry] ${subject || 'Project Discussion'} - ${name}`);
    const mailBody = encodeURIComponent(`Sender: ${name}\nContact Email: ${email}\n\nMessage:\n${message}\n\n---\nSent via portfolio contact form.`);
    const mailtoUrl = `mailto:${profile.email}?subject=${mailSubject}&body=${mailBody}`;

    setFeedback('launching');
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 border-t border-slate-900 bg-gradient-to-b from-slate-950/20 to-slate-950/80">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Info */}
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono text-sky-400 bg-sky-950/50 border border-sky-900/60 mb-3">
              <span>05 // LET'S CONNECT</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 leading-snug">
              Have an interesting problem to solve?
            </h2>
            <p className="text-slate-300 text-base leading-relaxed mb-8">
              Let's connect and build something meaningful. I am eager to collaborate on data science investigations, generative AI applications, and machine learning initiatives.
            </p>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-4 mb-8">
              <div>
                <span className="text-[11px] font-mono uppercase text-slate-400 tracking-wider block mb-1">Direct Email</span>
                <div className="flex items-center justify-between gap-3 bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
                  <a href={`mailto:${profile.email}`} className="font-mono text-sm text-sky-300 hover:underline truncate">
                    {profile.email}
                  </a>
                  <div className="relative">
                    <button 
                      type="button" 
                      onClick={handleCopyEmail}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      aria-label="Copy email address"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                    </button>
                    {copied && (
                      <span className="absolute right-0 bottom-full mb-2 px-2.5 py-1 text-[11px] font-medium text-slate-200 bg-slate-800 border border-slate-700 rounded-md shadow-md whitespace-nowrap">
                        Copied to clipboard!
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <a href={profile.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all text-xs font-medium">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                  <span>GitHub Profile</span>
                </a>

                <a href={profile.linkedinUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 p-3 rounded-xl bg-slate-950/60 hover:bg-slate-800/80 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all text-xs font-medium">
                  <svg className="w-4 h-4 text-sky-400" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                  <span>LinkedIn Profile</span>
                </a>
              </div>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              <span className="font-semibold text-slate-300">Quick Note:</span> LinkedIn URL is configurable via <code className="text-sky-300">portfolioData.ts</code> once your public link is finalized.
            </p>
          </div>

          {/* Right Form */}
          <div className="lg:col-span-7">
            <div className="p-8 rounded-2xl bg-slate-900/40 border border-slate-800 shadow-xl shadow-black/20">
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-white mb-1">Send a Direct Message</h3>
                <p className="text-xs text-slate-400">
                  Submitting will launch your default email client with your message pre-populated, ensuring direct and reliable delivery.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-xs font-mono text-slate-300 mb-1.5">Your Name *</label>
                    <input 
                      type="text" 
                      id="name"
                      required 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Sarah Khan" 
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-sky-500 focus:bg-slate-950 transition-colors"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-xs font-mono text-slate-300 mb-1.5">Your Email Address *</label>
                    <input 
                      type="email" 
                      id="email"
                      required 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="sarah@example.com" 
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-sky-500 focus:bg-slate-950 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-xs font-mono text-slate-300 mb-1.5">Inquiry Subject</label>
                  <input 
                    type="text" 
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g. Discussion regarding AI Engineering / Machine Learning Role" 
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-sky-500 focus:bg-slate-950 transition-colors"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-mono text-slate-300 mb-1.5">Your Message *</label>
                  <textarea 
                    id="message"
                    rows={4} 
                    required 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about the problem, project, or role you'd like to collaborate on..." 
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950/70 border border-slate-800 text-white placeholder-slate-500 text-sm focus:border-sky-500 focus:bg-slate-950 transition-colors resize-y"
                  />
                </div>

                {feedback && feedback !== 'launching' && (
                  <div className="text-xs text-rose-400">{feedback}</div>
                )}

                {feedback === 'launching' && (
                  <div className="p-4 rounded-xl bg-sky-950/40 border border-sky-800/80 text-sky-200 text-xs leading-relaxed space-y-2">
                    <p className="font-medium text-sky-100">Launching your email client to send this message...</p>
                    <p className="text-slate-400">If your email client didn't open automatically, write directly to <a href={`mailto:${profile.email}`} className="text-sky-300 underline font-mono">{profile.email}</a>.</p>
                  </div>
                )}

                <button type="submit" className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold bg-sky-500 hover:bg-sky-400 text-slate-950 shadow-md shadow-sky-500/10 transition-all duration-200">
                  <span>Send Message via Email</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                </button>
              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
