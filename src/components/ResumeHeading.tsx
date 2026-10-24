import React from "react";

interface ResumeHeadingProps {
  heading?: string;
  subHeading?: string;
  fromDate?: string;
  toDate?: string;
  description?: string;
}

const ResumeHeading: React.FC<ResumeHeadingProps> = ({ heading="", subHeading="", fromDate, toDate, description="" }) => (
  <div className="relative pl-8 group">
    <div className="absolute left-0 top-1.5 flex items-center justify-center">
      <div className="w-3 h-3 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.7)] z-10" />
      <div className="absolute w-5 h-5 rounded-full bg-orange-500/20 animate-ping-slow" />
    </div>
    <div className="glass border border-[var(--glass-border)] rounded-2xl p-5
      hover:border-orange-500/30 hover:shadow-glow-orange-sm
      transition-all duration-300 group-hover:-translate-y-0.5">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-2">
        <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white leading-tight">{heading}</h3>
        {fromDate && toDate && (
          <span className="flex-shrink-0 self-start px-3 py-1 rounded-xl text-xs font-mono font-semibold
            bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400">
            {fromDate} — {toDate}
          </span>
        )}
      </div>
      {subHeading && <div className="text-sm font-semibold text-violet-600 dark:text-violet-400 mb-2 font-mono">{subHeading}</div>}
      {description && <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">{description}</p>}
    </div>
  </div>
);

export default ResumeHeading;
