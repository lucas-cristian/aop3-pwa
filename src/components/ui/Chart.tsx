import React from 'react';

type ChartProps = {
  data: { label: string; value: number }[];
  title?: string;
  subtitle?: string;
  colorClass?: string;
};

export function Chart({ data, title, subtitle, colorClass = "bg-stone-900" }: ChartProps) {
  if (!data || data.length === 0) return null;

  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-6 lg:p-10">
      {(title || subtitle) && (
        <div className="mb-10">
          {title && <h3 className="text-xl font-bold font-display text-stone-900">{title}</h3>}
          {subtitle && <p className="text-sm text-stone-500 font-mono mt-1">{subtitle}</p>}
        </div>
      )}

      {/* Overflow container */}
      <div className="overflow-x-auto pb-4">
        {/* Enforce a minimum width so bars don't squeeze too much on mobile */}
        <div className="flex items-end gap-4 md:gap-8 h-[250px] min-w-[500px]">
          {data.map((item, index) => {
            const heightPercentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
            return (
              <div key={index} className="flex flex-col items-center flex-1 min-w-[40px]">
                <div className="w-full relative h-[200px] flex items-end group">
                  <div 
                    className={`w-full rounded-t-sm transition-all duration-700 ease-out group-hover:opacity-80 ${colorClass}`} 
                    style={{ height: `${heightPercentage}%`, minHeight: '4px' }}
                  >
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 bg-stone-900 text-white text-xs px-2 py-1 rounded shadow-lg transition-opacity whitespace-nowrap z-10 pointer-events-none font-mono">
                      {item.value.toFixed(2)}
                    </div>
                  </div>
                </div>
                <span className="text-stone-600 text-xs font-medium mt-3 text-center truncate w-full" title={item.label}>
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
