import React from 'react';

export function Table({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
      <table className="w-full text-left border-collapse">
        {children}
      </table>
    </div>
  );
}

export function TableHeader({ headers }: { headers: string[] }) {
  return (
    <thead>
      <tr className="border-b border-stone-200 text-xs font-mono tracking-widest text-stone-400 uppercase bg-stone-50">
        {headers.map((h, i) => (
          <th key={i} className={`py-4 px-6 font-semibold ${i === headers.length - 1 ? 'text-right' : ''}`}>
            {h}
          </th>
        ))}
      </tr>
    </thead>
  );
}

export function TableRow({ children }: { children: React.ReactNode }) {
  return (
    <tr className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors text-sm font-medium">
      {children}
    </tr>
  );
}

export function TableCell({ children, isEnd = false }: { children: React.ReactNode, isEnd?: boolean }) {
  return (
    <td className={`py-4 px-6 text-stone-900 ${isEnd ? 'text-right font-display' : ''}`}>
      {children}
    </td>
  );
}
