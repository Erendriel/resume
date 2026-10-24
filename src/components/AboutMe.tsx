"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../contexts/LanguageContext";

function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

interface StatProps { value: string; label: string; icon: React.ReactNode; accent?: "orange"|"violet"; delay?: number; visible: boolean; }
const StatCard: React.FC<StatProps> = ({ value, label, icon, accent="orange", delay=0, visible }) => (
  <div className={`glass border rounded-2xl p-5 flex flex-col gap-3 hover:scale-[1.03] hover:-translate-y-1
    transition-all duration-500 cursor-default group
    ${accent==="orange" ? "border-orange-500/20 hover:border-orange-500/40 hover:shadow-glow-orange-sm" : "border-violet-500/20 hover:border-violet-500/40 hover:shadow-glow-violet-sm"}
    ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    style={{ transitionDelay:`${delay}ms`, transitionProperty:"opacity,transform,box-shadow,border-color,scale" }}>
    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg transition-colors duration-300
      ${accent==="orange" ? "bg-orange-500/10 text-orange-500 dark:text-orange-400 group-hover:bg-orange-500/20" : "bg-violet-500/10 text-violet-500 dark:text-violet-400 group-hover:bg-violet-500/20"}`}>
      {icon}
    </div>
    <div>
      <div className={`text-2xl font-extrabold font-display ${accent==="orange" ? "gradient-text" : "gradient-text-cool"}`}>{value}</div>
      <div className="text-xs text-slate-500 font-medium mt-0.5">{label}</div>
    </div>
  </div>
);

const HighlightItem: React.FC<{ text:string; index:number; visible:boolean }> = ({ text, index, visible }) => (
  <li className={`flex items-start gap-3 group ${visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"} transition-all duration-500`}
    style={{ transitionDelay:`${300+index*80}ms` }}>
    <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-lg bg-orange-500/15 border border-orange-500/25 flex items-center justify-center
      group-hover:bg-orange-500/25 group-hover:border-orange-500/50 transition-all duration-300">
      <svg className="w-3 h-3 text-orange-500 dark:text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
      </svg>
    </span>
    <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors duration-300 leading-relaxed">{text}</span>
  </li>
);

const AboutMe: React.FC = () => {
  const { t } = useLanguage();
  const { ref, visible } = useReveal(0.1);

  const scrollToContact = () => document.getElementById("contactme")?.scrollIntoView({ behavior:"smooth" });

  const highlights = [t("about.highlight1"),t("about.highlight2"),t("about.highlight3"),t("about.highlight4"),t("about.highlight5")];
  const stats = [
    { value:"10+", label:"Years Experience", accent:"orange" as const, icon:"⚡", delay:0   },
    { value:"5",   label:"Companies",        accent:"violet" as const, icon:"🏢", delay:80  },
    { value:"3",   label:"Languages",        accent:"orange" as const, icon:"🌐", delay:160 },
    { value:"100%",label:"Commitment",       accent:"violet" as const, icon:"🚀", delay:240 },
  ];
  const techBadges = ["Next.js","React","TypeScript","React Native","Node.js","Firebase","Supabase","MongoDB","AWS","Kiro IDE","AI Agents","MCP"];

  return (
    <section className="section-primary relative py-28 px-6 overflow-hidden" id="aboutme">
      <div className="orb orb-violet pointer-events-none" style={{ width:500, height:500, top:"10%", right:"-15%" }} />
      <div className="orb orb-orange pointer-events-none" style={{ width:350, height:350, bottom:"0%", left:"-10%" }} />
      <div className="section-divider mb-20" />

      <div ref={ref} className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <span className="font-mono text-orange-500 dark:text-orange-400 text-sm tracking-[0.3em] uppercase mb-3 block">01. About</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-white mb-4">{t("about.title")}</h2>
          <p className="text-slate-500 text-lg">{t("about.subtitle")}</p>
          <div className="flex justify-center mt-5"><div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent" /></div>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {/* Photo */}
          <div className={`lg:col-span-4 lg:row-span-2 glass border border-[var(--glass-border)] rounded-3xl overflow-hidden group relative
            transition-all duration-700 delay-100 ${visible?"opacity-100 scale-100":"opacity-0 scale-95"}`}>
            <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-primary)] via-transparent to-transparent z-10 pointer-events-none" />
            <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow:"inset 0 0 40px rgba(249,115,22,0.08)" }} />
            <Image src="/img/graduate.jpg" alt="Edgar Pérez-Figueroa" width={600} height={750}
              className="w-full h-full object-cover min-h-[380px] lg:min-h-full group-hover:scale-105 transition-transform duration-700" priority />
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
              <div className="font-display font-bold text-xl text-white">Edgar Pérez-Figueroa</div>
              <div className="flex items-center gap-2 mt-1">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-[0_0_6px_rgba(74,222,128,0.8)]" />
                <span className="text-xs font-mono text-slate-300">Open to opportunities</span>
              </div>
            </div>
          </div>

          {/* Bio */}
          <div className={`lg:col-span-8 glass border border-[var(--glass-border)] rounded-3xl p-7
            transition-all duration-700 delay-200 ${visible?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
            <p className="text-slate-700 dark:text-slate-300 text-base leading-[1.9] mb-6">{t("about.description")}</p>
            <div className="flex flex-wrap gap-2 mb-6">
              {techBadges.map(tech => (
                <span key={tech} className="px-3 py-1.5 rounded-xl text-xs font-mono font-semibold
                  bg-orange-500/8 border border-orange-500/20 text-orange-600 dark:text-orange-300
                  hover:bg-orange-500/15 hover:border-orange-500/30 transition-all duration-300 cursor-default">
                  {tech}
                </span>
              ))}
            </div>
            <div>
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-4 font-mono">{t("about.highlights")}</h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                {highlights.map((h,i) => <HighlightItem key={i} text={h} index={i} visible={visible} />)}
              </ul>
            </div>
          </div>

          {/* Stats */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
            {stats.map(s => <StatCard key={s.label} value={s.value} label={s.label} icon={s.icon} accent={s.accent} delay={s.delay+300} visible={visible} />)}
          </div>
        </div>

        {/* CTAs */}
        <div className={`flex flex-col sm:flex-row justify-center gap-4 mt-12 transition-all duration-700 ${visible?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}
          style={{ transitionDelay:"600ms" }}>
          <button onClick={scrollToContact}
            className="btn-shimmer px-8 py-3.5 rounded-2xl font-bold text-white text-sm tracking-wide
              bg-gradient-to-r from-orange-500 to-orange-400 shadow-glow-orange hover:scale-105 active:scale-95
              transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400">
            {t("about.hire")}
          </button>
          <button onClick={scrollToContact}
            className="px-8 py-3.5 rounded-2xl font-bold text-slate-700 dark:text-slate-300 text-sm tracking-wide
              glass border border-[var(--glass-border)] hover:border-orange-500/30
              hover:text-slate-900 dark:hover:text-white hover:scale-105 active:scale-95
              transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400">
            {t("about.resume")}
          </button>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
};

export default AboutMe;
