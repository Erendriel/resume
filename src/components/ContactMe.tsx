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

/* ── Turnstile ───────────────────────────────────────────── */
declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: Record<string, unknown>) => string;
      reset:  (widgetId: string) => void;
      remove: (widgetId: string) => void;
    };
  }
}
interface TurnstileProps { siteKey:string; onVerify:(token:string)=>void; onExpire?:()=>void; onError?:()=>void; }
const TurnstileWidget: React.FC<TurnstileProps> = ({ siteKey, onVerify, onExpire, onError }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef  = useRef<string|null>(null);
  const renderWidget = useCallback(() => {
    if (!window.turnstile || !containerRef.current) return;
    if (widgetIdRef.current) { try { window.turnstile.remove(widgetIdRef.current); } catch {} widgetIdRef.current=null; }
    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: siteKey, theme: "light",
      size: "compact",
      callback: onVerify,
      "expired-callback": onExpire ?? (()=>{}),
      "error-callback":   onError  ?? (()=>{}),
    });
  }, [siteKey, onVerify, onExpire, onError]);
  useEffect(() => {
    if (window.turnstile) { renderWidget(); return; }
    const existing = document.getElementById("cf-turnstile-script");
    if (!existing) {
      const s = document.createElement("script");
      s.id="cf-turnstile-script"; s.src="https://challenges.cloudflare.com/turnstile/v0/api.js";
      s.async=true; s.defer=true; s.onload=renderWidget; document.head.appendChild(s);
    } else { existing.addEventListener("load", renderWidget); }
    return () => { if (widgetIdRef.current && window.turnstile) { try { window.turnstile.remove(widgetIdRef.current); } catch {} } };
  }, [renderWidget]);
  return <div ref={containerRef} />;
};

/* ── Info item ───────────────────────────────────────────── */
interface InfoItemProps { icon:React.ReactNode; label:string; value:string; href?:string; accent?:"orange"|"violet"; delay:number; visible:boolean; }
const InfoItem: React.FC<InfoItemProps> = ({ icon, label, value, href, accent="orange", delay, visible }) => {
  const inner = (
    <div className={`flex items-center gap-4 p-4 rounded-2xl glass border transition-all duration-500 group
      ${accent==="orange" ? "border-orange-500/15 hover:border-orange-500/30 hover:shadow-glow-orange-sm" : "border-violet-500/15 hover:border-violet-500/30 hover:shadow-glow-violet-sm"}
      ${visible?"opacity-100 translate-x-0":"opacity-0 -translate-x-6"}`}
      style={{ transitionDelay:`${delay}ms` }}>
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-300
        ${accent==="orange" ? "bg-orange-500/10 text-orange-500 dark:text-orange-400 group-hover:bg-orange-500/20" : "bg-violet-500/10 text-violet-500 dark:text-violet-400 group-hover:bg-violet-500/20"}`}>
        {icon}
      </div>
      <div className="min-w-0">
        <div className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-0.5">{label}</div>
        <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-slate-900 dark:group-hover:text-white transition-colors duration-300">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} target="_blank" rel="noopener noreferrer">{inner}</a> : <div>{inner}</div>;
};

/* ── Icons ───────────────────────────────────────────────── */
const EmailIcon    = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;
const LocationIcon = () => <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const GithubIcon   = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" /></svg>;
const LinkedinIcon = () => <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>;

/* ── Floating label field ────────────────────────────────── */
interface FieldProps { id:string; label:string; type?:string; value:string; onChange:(e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>void; disabled:boolean; multiline?:boolean; }
const Field: React.FC<FieldProps> = ({ id, label, type="text", value, onChange, disabled, multiline }) => {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;
  const Tag = multiline ? "textarea" : "input";
  return (
    <div className="relative">
      <label htmlFor={id} className={`absolute left-4 font-mono text-xs tracking-wide pointer-events-none transition-all duration-300 z-10
        ${lifted ? "top-2 text-[10px] text-orange-500 dark:text-orange-400 tracking-widest uppercase" : multiline ? "top-4 text-slate-500" : "top-1/2 -translate-y-1/2 text-slate-500"}`}>
        {label}
      </label>
      <Tag id={id} name={id} type={multiline?undefined:type} value={value} onChange={onChange} required
        onFocus={()=>setFocused(true)} onBlur={()=>setFocused(false)} disabled={disabled}
        rows={multiline?5:undefined}
        className={`w-full border rounded-xl text-sm font-medium transition-all duration-300 resize-none
          disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none
          bg-white/60 dark:bg-white/[0.03]
          text-slate-900 dark:text-slate-200
          ${multiline?"pt-7 pb-4 px-4":"pt-7 pb-3 px-4"}
          ${focused
            ? "border-orange-500/50 shadow-[0_0_0_3px_rgba(249,115,22,0.08)]"
            : "border-slate-200 dark:border-white/10 hover:border-slate-300 dark:hover:border-white/20"
          }`} />
    </div>
  );
};

/* ══════════════════════════════════════════════════════════
   CONTACT ME
   ══════════════════════════════════════════════════════════ */
const ContactMe: React.FC = () => {
  const { t } = useLanguage();
  const { ref, visible } = useReveal(0.1);
  const [formData, setFormData] = useState({ name:"", email:"", message:"" });
  const [honeypot, setHoneypot]         = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [isSubmitting, setSubmitting]   = useState(false);
  const [status, setStatus]             = useState<"idle"|"success"|"error"|"rate_limited">("idle");
  const [errorMsg, setErrorMsg]         = useState("");
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) =>
    setFormData({...formData, [e.target.name]: e.target.value});
  const handleTurnstileVerify = useCallback((token:string) => setTurnstileToken(token), []);
  const handleTurnstileExpire = useCallback(() => setTurnstileToken(""), []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!turnstileToken) { setStatus("error"); setErrorMsg("Please complete the human verification."); return; }
    setSubmitting(true); setStatus("idle"); setErrorMsg("");
    try {
      const res  = await fetch("/api/send", { method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({...formData, honeypot, cfTurnstileResponse:turnstileToken}) });
      const data = await res.json();
      if (res.status===429)       { setStatus("rate_limited"); }
      else if (res.ok&&data.success) { setStatus("success"); setFormData({name:"",email:"",message:""}); setTurnstileToken(""); }
      else { setStatus("error"); setErrorMsg(data.error ?? t("contact.error")); }
    } catch { setStatus("error"); setErrorMsg(t("contact.error")); }
    finally  { setSubmitting(false); }
  };

  const contactInfo: { icon:React.ReactNode; label:string; value:string; href:string|undefined; accent:"orange"|"violet"; delay:number; }[] = [
    { icon:<EmailIcon />,    label:"Email",    value:"edgar@example.com",  href:"mailto:edgar@example.com", accent:"orange", delay:200 },
    { icon:<LocationIcon />, label:"Location", value:"Monterrey, México",  href:undefined,                  accent:"violet", delay:280 },
  ];
  const socials = [
    { icon:<GithubIcon />,   href:"https://github.com/",   label:"GitHub"   },
    { icon:<LinkedinIcon />, href:"https://linkedin.com/", label:"LinkedIn" },
  ];

  return (
    <section ref={ref} className="section-alt relative py-28 px-6 overflow-visible" id="contactme">
      <div className="orb orb-orange pointer-events-none" style={{ width:500, height:500, bottom:"-10%", right:"-10%", opacity:0.08 }} />
      <div className="orb orb-violet pointer-events-none" style={{ width:400, height:400, top:"0%",    left:"-10%",  opacity:0.06 }} />

      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${visible?"opacity-100 translate-y-0":"opacity-0 translate-y-8"}`}>
          <span className="font-mono text-orange-500 dark:text-orange-400 text-sm tracking-[0.3em] uppercase mb-3 block">04. Contact</span>
          <h2 className="font-display font-extrabold text-4xl md:text-5xl lg:text-6xl text-slate-900 dark:text-white mb-4">{t("contact.title")}</h2>
          <p className="text-slate-500 text-lg">{t("contact.subtitle")}</p>
          <div className="flex justify-center mt-5"><div className="h-px w-24 bg-gradient-to-r from-transparent via-orange-500 to-transparent" /></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left panel */}
          <div className={`lg:col-span-2 flex flex-col gap-5 transition-all duration-700 delay-100 ${visible?"opacity-100 translate-x-0":"opacity-0 -translate-x-8"}`}>
            <div className="glass border border-orange-500/20 rounded-2xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.8)] animate-pulse" />
                <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">Status</span>
              </div>
              <div className="text-lg font-bold text-slate-900 dark:text-white mb-1">Available for work</div>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">Open to freelance projects, full-time roles, and exciting collaborations.</p>
            </div>

            <div className="flex flex-col gap-3">
              {contactInfo.map(item => <InfoItem key={item.label} {...item} visible={visible} />)}
            </div>

            <div className={`flex gap-3 transition-all duration-500 ${visible?"opacity-100 translate-y-0":"opacity-0 translate-y-4"}`} style={{ transitionDelay:"380ms" }}>
              {socials.map(({ icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl glass border border-[var(--glass-border)]
                    text-slate-600 dark:text-slate-400 text-sm font-semibold
                    hover:text-orange-500 dark:hover:text-orange-400 hover:border-orange-500/30 hover:shadow-glow-orange-sm
                    transition-all duration-300 hover:-translate-y-0.5">
                  {icon}<span>{label}</span>
                </a>
              ))}
            </div>

            {/* Code snippet */}
            <div className={`glass border border-[var(--glass-border)] rounded-2xl overflow-hidden transition-all duration-700 ${visible?"opacity-100 translate-y-0":"opacity-0 translate-y-6"}`}
              style={{ transitionDelay:"460ms" }}>
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[var(--glass-border)] bg-[var(--surface)]">
                <div className="flex gap-1"><div className="w-2.5 h-2.5 rounded-full bg-red-500/60" /><div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" /><div className="w-2.5 h-2.5 rounded-full bg-green-500/60" /></div>
                <span className="font-mono text-xs text-slate-500 ml-1">contact.ts</span>
              </div>
              <div className="p-4 font-mono text-xs leading-loose">
                <div><span className="text-violet-500 dark:text-violet-400">await</span> <span className="text-orange-500 dark:text-orange-400">sendMessage</span><span className="text-slate-500">({"{"}</span></div>
                <div className="pl-4"><span className="text-blue-500 dark:text-blue-300">to</span><span className="text-slate-500">:</span> <span className="text-green-600 dark:text-green-300">&quot;edgar@example.com&quot;</span><span className="text-slate-500">,</span></div>
                <div className="pl-4"><span className="text-blue-500 dark:text-blue-300">subject</span><span className="text-slate-500">:</span> <span className="text-green-600 dark:text-green-300">&quot;Let&apos;s collaborate&quot;</span><span className="text-slate-500">,</span></div>
                <div className="pl-4"><span className="text-blue-500 dark:text-blue-300">urgent</span><span className="text-slate-500">:</span> <span className="text-orange-500 dark:text-orange-400">true</span><span className="text-slate-500">,</span></div>
                <div><span className="text-slate-500">{"}"}</span><span className="text-slate-400">);</span></div>
              </div>
            </div>
          </div>

          {/* Right: form */}
          <div className={`lg:col-span-3 transition-all duration-700 delay-200 ${visible?"opacity-100 translate-x-0":"opacity-0 translate-x-8"}`}>
            <div className="glass border border-[var(--glass-border)] rounded-3xl p-7 md:p-9 shadow-glass-lg" style={{ overflow:"visible" }}>
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                {/* Honeypot */}
                <div aria-hidden="true" style={{ position:"absolute", left:"-9999px", opacity:0, height:0, overflow:"hidden" }}>
                  <label htmlFor="website">Leave this empty</label>
                  <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off"
                    value={honeypot} onChange={e=>setHoneypot(e.target.value)} />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <Field id="name"  label={t("contact.name")}  value={formData.name}    onChange={handleChange} disabled={isSubmitting} />
                  <Field id="email" label={t("contact.email")} value={formData.email}   onChange={handleChange} disabled={isSubmitting} type="email" />
                </div>
                <Field id="message" label={t("contact.message")} value={formData.message} onChange={handleChange} disabled={isSubmitting} multiline />

                <button type="submit" disabled={isSubmitting||(!turnstileToken&&!!siteKey)}
                  className="btn-shimmer relative group w-full py-4 rounded-2xl font-bold text-white text-sm tracking-wide
                    bg-gradient-to-r from-orange-500 to-orange-400
                    shadow-glow-orange-sm hover:shadow-glow-orange hover:scale-[1.02] active:scale-[0.98]
                    transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 flex items-center justify-center gap-2">
                  {isSubmitting ? (
                    <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" /></svg><span>Sending…</span></>
                  ) : (
                    <><span>{t("contact.submit")}</span><svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg></>
                  )}
                </button>

                {status==="success"&&<div className="flex items-center gap-3 p-4 rounded-2xl bg-green-500/8 border border-green-500/20 text-green-600 dark:text-green-400 text-sm font-semibold"><svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{t("contact.success")}</div>}
                {status==="rate_limited"&&<div className="flex items-center gap-3 p-4 rounded-2xl bg-yellow-500/8 border border-yellow-500/20 text-yellow-600 dark:text-yellow-400 text-sm font-semibold"><svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>Too many requests — please wait a few minutes.</div>}
                {status==="error"&&<div className="flex items-center gap-3 p-4 rounded-2xl bg-red-500/8 border border-red-500/20 text-red-600 dark:text-red-400 text-sm font-semibold"><svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>{errorMsg||t("contact.error")}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer + Turnstile */}
      <div className={`text-center mt-20 transition-all duration-700 delay-500 ${visible?"opacity-100 translate-y-0":"opacity-0 translate-y-4"}`}>
        <div className="section-divider mb-8" />
        {siteKey ? (
          <div className="flex justify-center mb-6">
            <TurnstileWidget siteKey={siteKey} onVerify={handleTurnstileVerify} onExpire={handleTurnstileExpire} />
          </div>
        ) : (
          <p className="text-xs font-mono text-slate-400 mb-6">⚠ Set NEXT_PUBLIC_TURNSTILE_SITE_KEY in .env.local</p>
        )}
        <p className="text-slate-400 dark:text-slate-600 text-sm font-mono">
          Designed & built by <span className="gradient-text font-bold">Edgar Pérez-Figueroa</span> · {new Date().getFullYear()}
        </p>
      </div>
    </section>
  );
};

export default ContactMe;
