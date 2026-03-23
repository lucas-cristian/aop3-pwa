import React from 'react';

export function Badge({ children, variant = 'stone' }: { children: React.ReactNode, variant?: 'stone' | 'emerald' | 'amber' | 'rose' | 'indigo' | 'cyan' }) {
  const variants = {
    stone: "bg-stone-100 text-stone-700 border-stone-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    rose: "bg-rose-50 text-rose-700 border-rose-100",
    indigo: "bg-indigo-50 text-indigo-700 border-indigo-100",
    cyan: "bg-cyan-50 text-cyan-700 border-cyan-100",
  };
  return (
    <span className={`px-2 py-1 text-[10px] md:text-xs font-mono uppercase tracking-[0.1em] rounded-sm border ${variants[variant]} whitespace-nowrap`}>
      {children}
    </span>
  );
}
