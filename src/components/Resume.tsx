"use client";
import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import ResumeHeading from "./ResumeHeading";

function useReveal(threshold = 0.1) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold });
    obs.observe(el); return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

interface SkillCardProps { name:string; level:number; color:string; index:number; visible:boolean; }
const SkillCard: React.FC<SkillCardProps> = ({ name, level, color, index, visible }) => (
  <div className={`glass border border-[var(--glass-border)] rounded-2xl p-4
    hover:border-orange-500/30 hover:shadow-glow-orange-sm hover:-translate-y-1
    transition-all duration-500 group cursor-default
    ${visible?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}
    style={{ transitionDelay:`${index*60}ms` }}>
    <div className="flex items-center justify-between mb-3">
      <span className="text-sm font-bold text-slate-800 dark:text-white">{name}</span>
      <span className="text-xs font-mono text-orange-500 dark:text-orange-400 font-bold">{level}%</span>
    </div>
    <div className="h-1 w-full rounded-full bg-slate-200 dark:bg-white/5 overflow-hidden">
      <div className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-1000 ease-out`}
        style={{ width:visible?`${level}%`:"0%", transitionDelay:`${200+index*60}ms`, boxShadow:"0 0 6px rgba(249,115,22,0.4)" }} />
    </div>
  </div>
);

interface TabProps { icon:string; label:string; active:boolean; onClick:()=>void; index:number; visible:boolean; }
const TabButton: React.FC<TabProps> = ({ icon, label, active, onClick, index, visible }) => (
  <button onClick={onClick}
    className={`relative flex items-center gap-2.5 px-5 py-3.5 rounded-xl font-semibold text-sm whitespace-nowrap
      transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50
      ${visible?"opacity-100 translate-x-0":"opacity-0 -translate-x-4"}
      ${active
        ? "bg-gradient-to-r from-orange-500/20 to-orange-400/10 border border-orange-500/30 text-orange-500 dark:text-orange-400 shadow-glow-orange-sm"
        : "text-slate-500 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-[var(--surface)] border border-transparent"
      }`}
    style={{ transitionDelay:`${index*60}ms` }}>
    <span className="text-base">{icon}</span>
    <span>{label}</span>
    {active && <span className="absolute right-3 w-1.5 h-1.5 rounded-full bg-orange-500 dark:bg-orange-400 shadow-[0_0_6px_rgba(249,115,22,0.8)]" />}
  </button>
);

const Resume: React.FC = () => {
  const { t } = useLanguage();
  const { ref, visible } = useReveal(0.05);
  const [selectedTab, setSelectedTab]       = useState(0);
  const [isTransitioning, setTransitioning] = useState(false);

  const tabs = [
    { label:t("resume.education"), icon:"🎓" },
    { label:t("resume.work"),      icon:"💼" },
    { label:t("resume.skills"),    icon:"💻" },
    { label:t("resume.projects"),  icon:"📐" },
    { label:t("resume.interests"), icon:"🎨" },
  ];

  const programmingSkills = [
    { name:"React.js",     level:92, color:"from-cyan-400 to-blue-400"     },
    { name:"React Native", level:90, color:"from-indigo-500 to-violet-400" },
    { name:"Next.js",      level:92, color:"from-slate-400 to-slate-600"   },
    { name:"TypeScript",   level:90, color:"from-blue-500 to-blue-400"     },
    { name:"JavaScript",   level:92, color:"from-yellow-500 to-amber-400"  },
    { name:"Node.js",      level:78, color:"from-green-500 to-emerald-400" },
    { name:"Firebase",     level:80, color:"from-yellow-600 to-orange-400" },
    { name:"AWS",          level:72, color:"from-orange-600 to-amber-500"  },
    { name:"Supabase",     level:75, color:"from-emerald-500 to-teal-400"  },
    { name:"MongoDB",      level:78, color:"from-green-600 to-green-400"   },
    { name:"Git / CI/CD",  level:88, color:"from-rose-500 to-orange-400"   },
    { name:"AI SDD / MCP", level:85, color:"from-violet-500 to-purple-400" },
  ];

  const workKeys  = ["work1","work2","work3","work4","work5"] as const;
  const dotColors = [
    "bg-orange-500 shadow-[0_0_4px_rgba(249,115,22,0.6)]",
    "bg-violet-500 shadow-[0_0_4px_rgba(139,92,246,0.6)]",
    "bg-cyan-500 shadow-[0_0_4px_rgba(6,182,212,0.6)]",
    "bg-orange-500 shadow-[0_0_4px_rgba(249,115,22,0.6)]",
    "bg-violet-500 shadow-[0_0_4px_rgba(139,92,246,0.6)]",
  ];

  const handleTabChange = (i: number) => {
    if (i === selectedTab) return;
    setTransitioning(true);
    setTimeout(() => { setSelectedTab(i); setTransitioning(false); }, 250);
  };

  const renderSection = () => {
    switch (selectedTab) {
      case 0:
        return (
          <div className="relative">
            <div className="timeline-line" />
            <div className="flex flex-col gap-5 pl-4">
              <ResumeHeading heading={t("resume.education1.heading")} subHeading={t("resume.education1.subHeading")} fromDate={t("resume.education1.fromDate")} toDate={t("resume.education1.toDate")} />
              <ResumeHeading heading={t("resume.education2.heading")} subHeading={t("resume.education2.subHeading")} fromDate={t("resume.education2.fromDate")} toDate={t("resume.education2.toDate")} />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="overflow-y-auto scroll-container pr-2" style={{ maxHeight:"520px" }}>
            <div className="relative">
              <div className="timeline-line" />
              <div className="flex flex-col gap-6 pl-4">
                {workKeys.map((key, idx) => {
                  const points: string[] = t(`resume.${key}.points`);
                  const tools:  string[] = t(`resume.${key}.tools`);
                  return (
                    <div key={key}>
                      <ResumeHeading heading={t(`resume.${key}.heading`)} subHeading={t(`resume.${key}.subHeading`)}
                        fromDate={t(`resume.${key}.fromDate`)} toDate={t(`resume.${key}.toDate`)} description={t(`resume.${key}.description`)} />
                      {Array.isArray(points) && points.length > 0 && (
                        <ul className="mt-3 ml-8 space-y-2">
                          {points.map((pt, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${dotColors[idx]}`} />{pt}
                            </li>
                          ))}
                        </ul>
                      )}
                      {Array.isArray(tools) && tools.length > 0 && (
                        <div className="mt-4 ml-8 flex flex-wrap gap-1.5">
                          {tools.map(tool => (
                            <span key={tool} className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold
                              bg-[var(--surface)] border border-[var(--glass-border)]
                              text-slate-600 dark:text-slate-400
                              hover:border-orange-500/30 hover:text-orange-600 dark:hover:text-orange-300
                              transition-all duration-200 cursor-default">
                              {tool}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="sticky bottom-0 h-8 bg-gradient-to-t from-[var(--bg-section-alt)] to-transparent pointer-events-none -mb-2" />
          </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {programmingSkills.map((s, i) => (
              <SkillCard key={s.name} name={s.name} level={s.level} color={s.color} index={i} visible={!isTransitioning} />
            ))}
          </div>
        );

      case 3: {
        const projectsList: { title:string; duration:{fromDate:string;toDate:string}; description:string; subHeading:string; }[] = t("resume.projectsList");
        return (
          <div className="relative">
            <div className="timeline-line" />
            <div className="flex flex-col gap-5 pl-4">
              {Array.isArray(projectsList) && projectsList.map((p, i) => (
                <ResumeHeading key={i} heading={p.title} subHeading={p.subHeading} description={p.description}
                  fromDate={p.duration?.fromDate} toDate={p.duration?.toDate} />
              ))}
            </div>
          </div>
        );
      }

      case 4: {
        const interests = [
          { title:t("resume.interest1.title"), text:t("resume.interest1.text"), icon:"📖" },
          { title:t("resume.interest2.title"), text:t("resume.interest2.text"), icon:"🎵" },
          { title:t("resume.interest3.title"), text:t("resume.interest3.text"), icon:"🎮" },
        ];
        return (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {interests.map((item, i) => (
              <div key={i} className="glass border border-[var(--glass-border)] rounded-2xl p-6
                hover:border-violet-500/25 hover:shadow-glow-violet-sm hover:-translate-y-1
                transition-all duration-300 group cursor-default">
                <div className="text-3xl mb-4 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-2 text-base">{item.title}</h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        );
      }

      default: return null;
    }
  };

  return (
    <section ref={ref} className="section-alt relative py-28 px-6 overflow-hidden" id="resume">
      <div className="orb orb-orange pointer-events-none" style={{ width:450, height:450, top:"5%",    right:"-12%", opacity:0.07 }} />
      <div className="orb orb-violet pointer-events-none" style={{ width:400, height:400, bottom:"5%", left:"-12%",  opacity:0.07 }} />

      <div className="container mx-auto max-w-6xl">
        <div className={`text-center mb-16 transition-all duration-700 ${visible?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <span className="font-mono text-orange-500 dark:text-orange-400 text-sm tracking-[0.3em] uppercase mb-3 block">02. Experience</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-white mb-4">{t("resume.title")}</h2>
          <div className="flex justify-center mt-5"><div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent" /></div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-56 flex-shrink-0">
            <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-visible scroll-container pb-2 lg:pb-0">
              {tabs.map((tab, i) => (
                <TabButton key={i} icon={tab.icon} label={tab.label} active={selectedTab===i}
                  onClick={() => handleTabChange(i)} index={i} visible={visible} />
              ))}
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className={`glass border border-[var(--glass-border)] rounded-3xl p-6 md:p-8
              transition-all duration-300 ${isTransitioning?"opacity-0 translate-y-3":"opacity-100 translate-y-0"}`}>
              {renderSection()}
            </div>
          </div>
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
};

export default Resume;
