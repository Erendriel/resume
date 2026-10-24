"use client";
import { useState, useEffect, useCallback, useRef } from "react";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

type SectionKeys = "home" | "aboutme" | "resume" | "testimonial" | "contactme";

const Navbar: React.FC<{
  sections: { [key in SectionKeys]: React.RefObject<HTMLDivElement> };
}> = ({ sections }) => {
  const [isOpen, setIsOpen]                 = useState(false);
  const [scrolled, setScrolled]             = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection]   = useState<SectionKeys>("home");
  const { theme, toggleTheme }              = useTheme();
  const { t, locale, setLocale }            = useLanguage();
  const mobileMenuRef                       = useRef<HTMLDivElement>(null);

  const handleScroll = useCallback(() => {
    const scrollTop  = window.scrollY;
    const docHeight  = document.body.scrollHeight - window.innerHeight;
    const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    setScrollProgress(Math.min(progress, 100));
    setScrolled(scrollTop > 20);

    const keys = Object.keys(sections) as SectionKeys[];
    let current: SectionKeys = "home";
    for (const key of keys) {
      const el = sections[key].current;
      if (el && el.getBoundingClientRect().top <= window.innerHeight / 2) current = key;
    }
    setActiveSection(current);
  }, [sections]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(e.target as Node))
        setIsOpen(false);
    };
    if (isOpen) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen]);

  const handleScrollTo = (id: SectionKeys) => {
    sections[id].current?.scrollIntoView({ behavior: "smooth" });
    setActiveSection(id);
    setIsOpen(false);
  };

  const navLinks: { key: SectionKeys; label: string }[] = [
    { key: "home",        label: t("navbar.home") },
    { key: "aboutme",     label: t("navbar.about") },
    { key: "resume",      label: t("navbar.resume") },
    { key: "testimonial", label: t("navbar.testimonial") },
    { key: "contactme",   label: t("navbar.contact") },
  ];

  return (
    <>
      <div id="scroll-progress" style={{ width: `${scrollProgress}%` }} aria-hidden="true" />

      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? "py-2" : "py-4"}`}>
        <div className={`mx-auto px-4 transition-all duration-500 ${scrolled ? "max-w-5xl" : "max-w-7xl"}`}>
          <div className={`
            glass rounded-2xl px-5 py-3 flex items-center justify-between
            transition-all duration-500
            ${scrolled ? "shadow-glass border border-[var(--glass-border)]" : "border border-transparent"}
          `}>

            {/* Logo */}
            <button onClick={() => handleScrollTo("home")}
              className="relative group flex items-center gap-2 focus:outline-none" aria-label="Go to home">
              <span className="font-display font-extrabold text-xl tracking-tight gradient-text">EPF</span>
              <span className="text-[var(--text-muted)] font-mono text-xs">·dev</span>
              <span className="absolute -bottom-0.5 left-0 h-px w-0 group-hover:w-full bg-gradient-to-r from-orange-500 to-violet-500 transition-all duration-300" />
            </button>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map(({ key, label }) => (
                <button key={key} onClick={() => handleScrollTo(key)}
                  className={`
                    relative px-4 py-2 rounded-xl text-sm font-medium
                    transition-all duration-300 focus:outline-none
                    focus-visible:ring-2 focus-visible:ring-orange-500/50
                    ${activeSection === key
                      ? "text-orange-500 dark:text-orange-400"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100"
                    }
                  `}>
                  {activeSection === key && (
                    <span className="absolute inset-0 rounded-xl bg-orange-500/10 border border-orange-500/20" />
                  )}
                  <span className="relative">{label}</span>
                </button>
              ))}
            </nav>

            {/* Controls */}
            <div className="flex items-center gap-2">
              {/* Language */}
              <div className="flex items-center glass rounded-xl p-0.5 border border-[var(--glass-border)]">
                {(["en", "es"] as const).map((lang) => (
                  <button key={lang} onClick={() => setLocale(lang)}
                    className={`
                      px-3 py-1.5 rounded-[10px] text-xs font-bold uppercase
                      transition-all duration-300 focus:outline-none
                      ${locale === lang
                        ? "bg-gradient-to-r from-orange-500 to-orange-400 text-white shadow-glow-orange-sm"
                        : "text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
                      }
                    `}>
                    {lang}
                  </button>
                ))}
              </div>

              {/* Theme toggle */}
              <button onClick={toggleTheme}
                className="
                  glass border border-[var(--glass-border)] rounded-xl p-2
                  text-slate-500 dark:text-slate-400
                  hover:text-orange-500 dark:hover:text-orange-400
                  hover:border-orange-500/30 transition-all duration-300
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/50
                "
                aria-label="Toggle theme">
                {theme === "dark" ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="5" strokeWidth="2" strokeLinecap="round" />
                    <path strokeLinecap="round" strokeWidth="2"
                      d="M12 2v2m0 16v2M4.22 4.22l1.42 1.42m12.72 12.72 1.42 1.42M2 12h2m16 0h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                      d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>

              {/* Hamburger */}
              <button onClick={() => setIsOpen(!isOpen)}
                className="md:hidden glass border border-[var(--glass-border)] rounded-xl p-2 text-slate-500 dark:text-slate-400 hover:text-orange-500 dark:hover:text-orange-400 transition-all duration-300 focus:outline-none"
                aria-label="Toggle mobile menu" aria-expanded={isOpen}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile dropdown */}
          <div ref={mobileMenuRef}
            className={`md:hidden mt-2 glass rounded-2xl border border-[var(--glass-border)] overflow-hidden transition-all duration-300
              ${isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0 pointer-events-none"}`}>
            <nav className="flex flex-col p-3 gap-1">
              {navLinks.map(({ key, label }) => (
                <button key={key} onClick={() => handleScrollTo(key)}
                  className={`
                    text-left px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${activeSection === key
                      ? "bg-orange-500/10 border border-orange-500/20 text-orange-500 dark:text-orange-400"
                      : "text-slate-600 dark:text-slate-400 hover:bg-[var(--surface)] hover:text-slate-900 dark:hover:text-slate-100"
                    }
                  `}>
                  {label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
