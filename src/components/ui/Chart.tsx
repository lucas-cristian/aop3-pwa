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
        <div className="flex items-end gap-8 h-[250px] min-w-full lg:min-w-[500px]">
          {data.map((item, index) => {
            const heightPercentage = maxValue > 0 ? (item.value / maxValue) * 100 : 0;
            return (
              <div key={index} className="flex flex-col items-center flex-1 min-w-[60px] max-w-[80px]">
                <div className="w-full relative h-[200px] flex items-end justify-center group">
                  <div 
                    className={`w-full max-w-[48px] rounded-t-md transition-all duration-700 ease-out hover:opacity-80 ${colorClass}`} 
                    style={{ height: `${heightPercentage}%`, minHeight: '4px' }}
                  >
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-stone-600 text-[10px] font-semibold whitespace-nowrap z-10 font-mono">
                      {item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
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
