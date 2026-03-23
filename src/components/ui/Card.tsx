import React from 'react';

export function Card({ children, title, icon, subtitle }: { children: React.ReactNode, title: string, icon?: string, subtitle?: string }) {
  return (
    <div className="glass-card p-6 flex flex-col justify-between group h-full">
      <div className="flex items-center gap-4 mb-4">
        {icon && (
          <div className="w-10 h-10 bg-stone-100 rounded-lg flex items-center justify-center text-stone-900 group-hover:bg-stone-900 group-hover:text-white transition-colors duration-500">
            <iconify-icon icon={icon} className="text-xl"></iconify-icon>
          </div>
        )}
        <div>
           <h3 className="text-lg font-display font-medium text-stone-900 leading-tight">{title}</h3>
           {subtitle && <p className="text-xs font-mono text-stone-400 mt-1 uppercase tracking-widest">{subtitle}</p>}
        </div>
      </div>
      <div className="text-stone-600 text-sm leading-relaxed flex-grow">
        {children}
      </div>
    </div>
  );
}

export function FlashlightCard({ children, title, icon }: { children: React.ReactNode, title: string, icon: string }) {
  return (
    <div className="flashlight-card h-full flex flex-col justify-between">
      <div className="w-12 h-12 bg-stone-100 rounded-lg flex items-center justify-center text-stone-900 mb-6 group-hover:bg-stone-900 group-hover:text-white transition-colors duration-500">
        <iconify-icon icon={icon} className="text-2xl"></iconify-icon>
      </div>
      <div>
        <h3 className="text-2xl font-display font-medium mb-3">{title}</h3>
        <div className="text-stone-500 text-sm leading-relaxed">{children}</div>
      </div>
      <div className="h-1 w-full bg-stone-100 mt-8 overflow-hidden">
        <div className="h-full bg-stone-900 w-0 group-hover:w-full transition-all duration-700 ease-out delay-100"></div>
      </div>
    </div>
  );
}
