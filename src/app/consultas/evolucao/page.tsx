"use client";
import { useState } from "react";
import { useFetch } from "@/lib/api";
import { Chart } from "@/components/ui/Chart";

type Posto = { id_posto: number; nome: string };
type Combustivel = { id_combustivel: number; descricao: string };
type Evolucao = { valor_combustivel: string; data_coleta: string; };

export default function EvolucaoPage() {
  const { data: postos } = useFetch<Posto[]>('/api/postos');
  const { data: combustiveis } = useFetch<Combustivel[]>('/api/combustiveis');

  const [postoId, setPostoId] = useState<string>('');
  const [combustivelId, setCombustivelId] = useState<string>('');

  const urlEvolucao = postoId && combustivelId ? `/api/consultas/evolucao?postoId=${postoId}&combustivelId=${combustivelId}` : null;
  const { data, loading, error } = useFetch<Evolucao[]>(urlEvolucao);

  const chartData = data?.map(d => ({
    label: new Date(d.data_coleta).toLocaleDateString(undefined, { day: '2-digit', month: '2-digit' }),
    value: Number(d.valor_combustivel)
  })) || [];

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="mb-10">
        <h2 className="text-4xl font-display font-medium text-stone-900 leading-tight">Evolução do Preço</h2>
        <p className="mt-4 text-stone-500 text-lg leading-relaxed font-light">
          Selecione o posto e o tipo de combustível para visualizar o histórico contínuo dos repasses através do tempo.
        </p>
      </div>

      {/* Filtros em Glassmorphism Base */}
      <div className="glass-card p-6 md:p-8 mb-10 flex flex-col md:flex-row gap-6 bg-white/50 border border-stone-200 items-end">
        <div className="flex-1 w-full">
          <label className="block text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">Posto ANP</label>
          <select 
            className="w-full bg-white border border-stone-300 text-stone-800 rounded-lg px-4 py-3 appearance-none font-medium outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-colors shadow-sm cursor-pointer"
            value={postoId} 
            onChange={e => setPostoId(e.target.value)}
          >
            <option value="">Selecione um posto...</option>
            {postos?.map(p => (
              <option key={p.id_posto} value={p.id_posto}>{p.nome}</option>
            ))}
          </select>
        </div>

        <div className="flex-1 w-full">
          <label className="block text-xs font-mono uppercase tracking-widest text-stone-500 mb-2">Combustível</label>
          <select 
            className="w-full bg-white border border-stone-300 text-stone-800 rounded-lg px-4 py-3 appearance-none font-medium outline-none focus:border-stone-500 focus:ring-1 focus:ring-stone-500 transition-colors shadow-sm cursor-pointer"
            value={combustivelId} 
            onChange={e => setCombustivelId(e.target.value)}
          >
            <option value="">Selecione o combustível...</option>
            {combustiveis?.map(c => (
              <option key={c.id_combustivel} value={c.id_combustivel}>{c.descricao}</option>
            ))}
          </select>
        </div>
      </div>

      {loading && <div className="text-stone-400 font-mono animate-pulse uppercase text-sm border border-stone-200 bg-white p-6 rounded-lg text-center">Calculando eixo temporal...</div>}
      {error && <div className="text-rose-500 p-4 border border-rose-200 bg-rose-50 rounded-lg text-sm">{error}</div>}

      {!loading && !data && (
         <div className="p-12 border border-stone-200 bg-stone-50/50 rounded-lg flex flex-col items-center justify-center gap-4 text-stone-400">
           <iconify-icon icon="solar:cursor-square-outline" className="text-5xl"></iconify-icon>
           <p className="font-mono text-sm max-w-sm text-center">Selecione um posto e um combustível nos filtros acima para carregar o histórico.</p>
         </div>
      )}

      {!loading && data && data.length === 0 && (
         <div className="p-12 border border-stone-200 bg-stone-50/50 rounded-lg flex flex-col items-center justify-center gap-4 text-stone-400">
           <iconify-icon icon="solar:chart-square-linear" className="text-5xl"></iconify-icon>
           <p className="font-mono text-sm">Nenhum histórico encontrado para esta combinação.</p>
         </div>
      )}

      {/* Gráfico Artools Dashboard-list pattern */}
      {!loading && data && data.length > 0 && (
         <div className="animate-in slide-in-from-bottom-4 duration-500">
           <Chart 
             title="Curva de Preços" 
             subtitle="Gráfico de flutuação temporal" 
             data={chartData} 
             colorClass="bg-stone-900" 
           />
         </div>
      )}
    </div>
  );
}
