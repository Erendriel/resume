"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLanguage } from "../contexts/LanguageContext";

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

const AVATAR_COLORS = ["from-orange-500 to-amber-400","from-violet-500 to-indigo-400","from-cyan-500 to-blue-400"];
function getInitials(name: string) { return name.split(" ").slice(0,2).map(n=>n[0]).join("").toUpperCase(); }

const QuoteIcon = () => (
  <svg className="w-8 h-8 text-orange-500/30 dark:text-orange-500/40" fill="currentColor" viewBox="0 0 24 24">
    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
  </svg>
);

const Stars = () => (
  <div className="flex gap-1">
    {Array.from({length:5}).map((_,i) => (
      <svg key={i} className="w-4 h-4 text-orange-500 dark:text-orange-400" fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const Testimonial: React.FC = () => {
  const { t } = useLanguage();
  const { ref, visible } = useReveal(0.1);
  const testimonials: { name:string; role:string; text:string }[] = t("testimonial.testimonials");
  const [current, setCurrent]     = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<"next"|"prev">("next");
  const autoRef = useRef<ReturnType<typeof setTimeout>>();

  const goTo = useCallback((index:number, dir:"next"|"prev"="next") => {
    if (animating) return;
    setDirection(dir); setAnimating(true);
    setTimeout(() => { setCurrent(index); setAnimating(false); }, 350);
  }, [animating]);

  const next = useCallback(() => goTo((current+1)%testimonials.length,"next"), [current,testimonials.length,goTo]);
  const prev = useCallback(() => goTo((current-1+testimonials.length)%testimonials.length,"prev"), [current,testimonials.length,goTo]);

  useEffect(() => {
    if (!visible) return;
    autoRef.current = setTimeout(next, 5000);
    return () => clearTimeout(autoRef.current);
  }, [current, visible, next]);

  const item = testimonials[current];

  return (
    <section ref={ref} className="section-primary relative py-28 px-6 overflow-hidden" id="testimonial">
      <div className="orb orb-violet pointer-events-none" style={{ width:500, height:500, top:"-10%", left:"30%",  opacity:0.07 }} />
      <div className="orb orb-orange pointer-events-none" style={{ width:300, height:300, bottom:"0%",right:"-5%", opacity:0.06 }} />

      <div className="container mx-auto max-w-5xl">
        <div className={`text-center mb-16 transition-all duration-700 ${visible?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <span className="font-mono text-orange-500 dark:text-orange-400 text-sm tracking-[0.3em] uppercase mb-3 block">03. Testimonials</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-white mb-4">{t("testimonial.title")}</h2>
          <p className="text-slate-500 text-lg">{t("testimonial.subtitle")}</p>
          <div className="flex justify-center mt-5"><div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent" /></div>
        </div>

        <div className={`transition-all duration-700 delay-200 ${visible?"opacity-100 translate-y-0":"opacity-0 translate-y-10"}`}>
          <div className="relative">
            <div className="absolute inset-0 glass border border-[var(--glass-border)] rounded-3xl translate-y-4 translate-x-2 scale-[0.97] opacity-40" />
            <div className="absolute inset-0 glass border border-[var(--glass-border)] rounded-3xl translate-y-2 translate-x-1 scale-[0.985] opacity-60" />
            <div className={`relative glass border border-[var(--glass-border)] rounded-3xl p-8 md:p-12
              transition-all duration-350
              ${animating ? (direction==="next" ? "opacity-0 translate-x-8" : "opacity-0 -translate-x-8") : "opacity-100 translate-x-0"}`}>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-display font-extrabold text-lg text-white flex-shrink-0
                    bg-gradient-to-br ${AVATAR_COLORS[current%AVATAR_COLORS.length]} shadow-glow-orange-sm`}>
                    {getInitials(item.name)}
                  </div>
                  <div>
                    <div className="font-bold text-slate-900 dark:text-white text-lg leading-tight">{item.name}</div>
                    <div className="text-sm text-slate-500 font-mono mt-0.5">{item.role}</div>
                    <div className="mt-1.5"><Stars /></div>
                  </div>
                </div>
                <div className="flex-shrink-0 self-start"><QuoteIcon /></div>
              </div>

              <blockquote className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-[1.8] font-light italic">
                &ldquo;{item.text}&rdquo;
              </blockquote>

              <div className="flex items-center justify-between mt-10">
                <div className="flex gap-2">
                  {testimonials.map((_,i) => (
                    <button key={i} onClick={() => goTo(i,i>current?"next":"prev")} aria-label={`Go to testimonial ${i+1}`}
                      className={`h-1.5 rounded-full transition-all duration-500 focus:outline-none
                        ${i===current ? "w-8 bg-gradient-to-r from-orange-500 to-orange-400 shadow-glow-orange-sm" : "w-1.5 bg-slate-300 dark:bg-white/20 hover:bg-slate-400 dark:hover:bg-white/40"}`} />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button onClick={prev} aria-label="Previous testimonial"
                    className="w-11 h-11 rounded-xl glass border border-[var(--glass-border)] flex items-center justify-center
                      text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400
                      hover:border-orange-500/30 hover:shadow-glow-orange-sm transition-all duration-300 hover:scale-110 focus:outline-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button onClick={next} aria-label="Next testimonial"
                    className="w-11 h-11 rounded-xl flex items-center justify-center
                      bg-gradient-to-r from-orange-500 to-orange-400 text-white
                      shadow-glow-orange-sm hover:shadow-glow-orange hover:scale-110
                      transition-all duration-300 focus:outline-none">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 transition-all duration-700 delay-400 ${visible?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}>
          {testimonials.map((item, i) => (
            <button key={i} onClick={() => goTo(i,i>current?"next":"prev")}
              className={`text-left p-4 rounded-2xl glass border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50
                ${i===current ? "border-orange-500/30 bg-orange-500/5 shadow-glow-orange-sm" : "border-[var(--glass-border)] hover:border-[var(--border)]"}`}>
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-extrabold text-white flex-shrink-0
                  bg-gradient-to-br ${AVATAR_COLORS[i%AVATAR_COLORS.length]}`}>
                  {getInitials(item.name)}
                </div>
                <div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white leading-tight">{item.name}</div>
                  <div className="text-xs text-slate-500 font-mono truncate">{item.role}</div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="section-divider mt-20" />
    </section>
  );
};

export default Testimonial;
