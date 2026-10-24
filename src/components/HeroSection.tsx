"use client";
import { useEffect, useState, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";

function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [displayed, setDisplayed] = useState("");
  const [wordIdx,   setWordIdx]   = useState(0);
  const [charIdx,   setCharIdx]   = useState(0);
  const [deleting,  setDeleting]  = useState(false);
  useEffect(() => {
    if (!words.length) return;
    const current = words[wordIdx % words.length];
    const delay = deleting ? speed / 2 : charIdx === current.length ? pause : speed;
    const timer = setTimeout(() => {
      if (!deleting && charIdx < current.length) { setDisplayed(current.slice(0, charIdx + 1)); setCharIdx(c => c + 1); }
      else if (!deleting && charIdx === current.length) { setDeleting(true); }
      else if (deleting && charIdx > 0) { setDisplayed(current.slice(0, charIdx - 1)); setCharIdx(c => c - 1); }
      else { setDeleting(false); setWordIdx(w => (w + 1) % words.length); }
    }, delay);
    return () => clearTimeout(timer);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);
  return displayed;
}

interface Particle { id: number; x: number; y: number; size: number; duration: number; delay: number; opacity: number; }

const GithubIcon   = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>;
const LinkedinIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;
const MailIcon     = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const ArrowDownIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const [particles, setParticles] = useState<Particle[]>([]);
  const [visible, setVisible]     = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const roles = [t("hero.subtitle"), "Senior Next.js Developer", "React Native Expert", "Tech Lead & Mentor", "AI-Driven Developer"];
  const typed = useTypewriter(roles, 75, 2200);

  useEffect(() => {
    setParticles(Array.from({ length: 28 }, (_, i) => ({
      id: i, x: Math.random()*100, y: Math.random()*100,
      size: Math.random()*3+1, duration: Math.random()*8+6,
      delay: Math.random()*5, opacity: Math.random()*0.4+0.1,
    })));
    const t2 = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t2);
  }, []);

  const scrollToContact = () => document.getElementById("contactme")?.scrollIntoView({ behavior: "smooth" });
  const scrollToAbout   = () => document.getElementById("aboutme")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section ref={sectionRef}
      className="section-primary relative min-h-screen flex items-center justify-center overflow-hidden"
      id="home">

      <div className="absolute inset-0 grid-pattern opacity-60 pointer-events-none" />
      <div className="orb orb-orange" style={{ width:600, height:600, top:"-10%", left:"-10%", animationDuration:"10s" }} aria-hidden="true" />
      <div className="orb orb-violet" style={{ width:500, height:500, bottom:"-5%", right:"-5%", animationDuration:"12s" }} aria-hidden="true" />
      <div className="orb orb-orange" style={{ width:200, height:200, top:"40%", right:"25%", opacity:0.06, animationDuration:"7s" }} aria-hidden="true" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {particles.map((p) => (
          <div key={p.id} className="absolute rounded-full bg-orange-400 dark:bg-orange-400 opacity-30 dark:opacity-100"
            style={{ left:`${p.x}%`, top:`${p.y}%`, width:`${p.size}px`, height:`${p.size}px`,
              opacity: p.opacity, animation:`float ${p.duration}s ease-in-out infinite`, animationDelay:`${p.delay}s` }} />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 pt-24 pb-16">
        <div className="max-w-5xl mx-auto">

          {/* Badge */}
          <div className={`flex justify-center mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="gradient-border glass rounded-full px-5 py-2 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" />
              <span className="text-xs font-mono text-slate-600 dark:text-slate-300 tracking-widest uppercase">Available for hire</span>
            </div>
          </div>

          {/* Greeting */}
          <div className={`text-center mb-4 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="font-mono text-orange-500 dark:text-orange-400 text-lg tracking-widest">{t("hero.greeting")}</span>
          </div>

          {/* Name */}
          <h1 className={`text-center font-display font-extrabold text-5xl sm:text-6xl md:text-7xl lg:text-8xl leading-none tracking-tight mb-6
            transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <span className="gradient-text glow-text-orange">{t("hero.name")}</span>
          </h1>

          {/* Typewriter */}
          <div className={`flex items-center justify-center gap-2 mb-8 transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="text-xl sm:text-2xl md:text-3xl font-semibold text-slate-700 dark:text-slate-300">
              {typed}<span className="typewriter-cursor" aria-hidden="true" />
            </span>
          </div>

          {/* Description */}
          <p className={`text-center text-slate-600 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-12 leading-relaxed
            transition-all duration-700 delay-400 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {t("hero.description")}
          </p>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 mb-16
            transition-all duration-700 delay-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <button onClick={scrollToContact}
              className="btn-shimmer relative group px-8 py-4 rounded-2xl font-bold text-white text-sm tracking-wide
                bg-gradient-to-r from-orange-500 to-orange-400 shadow-glow-orange hover:scale-105 active:scale-95
                transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400">
              <span className="relative z-10 flex items-center gap-2">
                {t("hero.hire")}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button onClick={scrollToContact}
              className="gradient-border px-8 py-4 rounded-2xl font-bold text-slate-700 dark:text-slate-300 text-sm tracking-wide
                glass border border-[var(--glass-border)] hover:text-slate-900 dark:hover:text-white
                hover:scale-105 active:scale-95 transition-all duration-300
                focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400">
              {t("hero.resume")}
            </button>
          </div>

          {/* Socials */}
          <div className={`flex items-center justify-center gap-4 mb-16 transition-all duration-700 delay-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            {[
              { href:"https://github.com/",   icon:<GithubIcon />,   label:"GitHub"   },
              { href:"https://linkedin.com/", icon:<LinkedinIcon />, label:"LinkedIn" },
              { href:"mailto:edgar@example.com", icon:<MailIcon />,  label:"Email"    },
            ].map(({ href, icon, label }) => (
              <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                className="glass border border-[var(--glass-border)] rounded-xl p-3
                  text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400
                  hover:border-orange-500/30 hover:shadow-glow-orange-sm
                  transition-all duration-300 hover:scale-110 hover:-translate-y-1">
                {icon}
              </a>
            ))}
            <div className="w-px h-6 bg-[var(--glass-border)] mx-2" />
            <span className="text-sm font-mono text-slate-400 dark:text-slate-500">edgar.dev</span>
          </div>

          {/* Code card */}
          <div className={`max-w-lg mx-auto transition-all duration-700 delay-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="glass border border-[var(--glass-border)] rounded-2xl overflow-hidden shadow-glass animate-float-slow">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--glass-border)] bg-[var(--surface)]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/70" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                  <div className="w-3 h-3 rounded-full bg-green-500/70" />
                </div>
                <span className="font-mono text-xs text-slate-500 ml-2">edgar.config.ts</span>
              </div>
              <div className="p-5 font-mono text-xs sm:text-sm leading-relaxed">
                <div><span className="text-violet-500 dark:text-violet-400">const</span> <span className="text-orange-500 dark:text-orange-400">developer</span> <span className="text-slate-500">=</span> <span className="text-slate-500">{"{"}</span></div>
                <div className="pl-4"><span className="text-blue-500 dark:text-blue-300">name</span><span className="text-slate-500">:</span> <span className="text-green-600 dark:text-green-300">&quot;Edgar Pérez-Figueroa&quot;</span><span className="text-slate-500">,</span></div>
                <div className="pl-4"><span className="text-blue-500 dark:text-blue-300">role</span><span className="text-slate-500">:</span> <span className="text-green-600 dark:text-green-300">&quot;Senior Fullstack Dev&quot;</span><span className="text-slate-500">,</span></div>
                <div className="pl-4"><span className="text-blue-500 dark:text-blue-300">experience</span><span className="text-slate-500">:</span> <span className="text-green-600 dark:text-green-300">&quot;10 years&quot;</span><span className="text-slate-500">,</span></div>
                <div className="pl-4"><span className="text-blue-500 dark:text-blue-300">stack</span><span className="text-slate-500">: [</span><span className="text-green-600 dark:text-green-300">&quot;Next.js&quot;</span><span className="text-slate-500">,</span> <span className="text-green-600 dark:text-green-300">&quot;React Native&quot;</span><span className="text-slate-500">,</span> <span className="text-green-600 dark:text-green-300">&quot;TypeScript&quot;</span><span className="text-slate-500">],</span></div>
                <div className="pl-4"><span className="text-blue-500 dark:text-blue-300">openToWork</span><span className="text-slate-500">:</span> <span className="text-orange-500 dark:text-orange-400">true</span><span className="text-slate-500">,</span></div>
                <div><span className="text-slate-500">{"}"}</span><span className="text-slate-400">;</span></div>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll hint */}
      <button onClick={scrollToAbout} aria-label="Scroll to about section"
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2
          text-slate-400 hover:text-orange-500 transition-all duration-300 hover:scale-110
          ${visible ? "opacity-100" : "opacity-0"}`}
        style={{ transitionDelay:"800ms" }}>
        <span className="text-xs font-mono tracking-widest uppercase">Scroll</span>
        <div className="glass border border-[var(--glass-border)] rounded-full p-2 animate-bounce"><ArrowDownIcon /></div>
      </button>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--bg-primary)] to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
