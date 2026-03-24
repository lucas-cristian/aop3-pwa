"use client";
import { useFetch } from "@/lib/api";
import { Chart } from "@/components/ui/Chart";

type GraficoMediaGlobal = {
  tipo_combustivel: string;
  preco_medio: string;
}

type GraficoMediaPosto = {
  posto: string;
  combustivel: string;
  preco_medio: string;
}

export default function GraficosPage() {
  const { data: mediaGlobal, loading: loadGlobal } = useFetch<GraficoMediaGlobal[]>('/api/graficos/media-por-combustivel');
  const { data: mediaPosto, loading: loadPosto } = useFetch<GraficoMediaPosto[]>('/api/graficos/media-por-combustivel-por-posto');

  const chartGlobalData = mediaGlobal?.map(d => ({
    label: d.tipo_combustivel,
    value: Number(d.preco_medio)
  })) || [];

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      
      <div className="mb-14">
        <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-stone-900 rounded-sm"></span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-stone-500">Analytics</span>
        </div>
        <h2 className="text-4xl font-display font-medium text-stone-900 leading-tight">Análise de Redes Globais</h2>
        <p className="mt-4 text-stone-500 text-lg leading-relaxed font-light">
          Dashboard central de análises da ANP, mesclando dados de todos os postos mapeados.
        </p>
      </div>

      <div className="space-y-16">
        {/* Grafico Global */}
        <section>
          {loadGlobal ? (
             <div className="h-64 bg-stone-100 animate-pulse rounded-2xl"></div>
          ) : (
             <Chart 
               title="Média por Combustível" 
               subtitle="Agrupamento de preço médio na cidade, ignorando os postos." 
               data={chartGlobalData} 
               colorClass="bg-emerald-600" 
             />
          )}
        </section>

        {/* Tabela de Dispersao por posto */}
        <section className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
           <div className="p-8 border-b border-stone-100 bg-stone-50/50">
              <h3 className="text-xl font-bold font-display text-stone-900">Média por Combustível, por Posto</h3>
              <p className="text-sm text-stone-500 font-mono mt-1">Visão tabular analítica desdobrada</p>
           </div>
           
           <div className="px-8 pb-8 pt-4 overflow-auto">
             {loadPosto ? (
                <div className="h-40 bg-stone-100 animate-pulse mt-4 rounded-lg"></div>
             ) : (
                <table className="w-full text-left border-collapse">
                   <thead>
                     <tr className="border-b border-stone-200 text-xs font-mono tracking-widest text-stone-400 uppercase">
                       <th className="py-4 font-semibold">Posto</th>
                       <th className="py-4 font-semibold">Combustível</th>
                       <th className="py-4 font-semibold text-right">R$ (Média)</th>
                     </tr>
                   </thead>
                   <tbody>
                     {mediaPosto?.map((m, i) => (
                       <tr key={i} className="border-b border-stone-100 hover:bg-stone-50 transition-colors text-sm font-medium">
                         <td className="py-4 text-stone-900">{m.posto}</td>
                         <td className="py-4 text-stone-500">{m.combustivel}</td>
                         <td className="py-4 text-right text-stone-900 font-display">{Number(m.preco_medio).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
                       </tr>
                     ))}
                   </tbody>
                </table>
             )}
           </div>
        </section>
      </div>

    </div>
  );
}
