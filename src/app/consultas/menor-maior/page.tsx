"use client";
import { useFetch } from "@/lib/api";
import { Badge } from "@/components/ui/Badge";

type MenorMaior = {
  nome_posto: string;
  bairro: string;
  tipo_combustivel: string;
  valor_combustivel: string;
  data_coleta: string;
}

export default function MenorMaiorPage() {
  const { data, loading, error } = useFetch<MenorMaior[]>('/api/consultas/menor-maior-preco');

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-stone-400 rounded-full"></span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-stone-400">Consultas</span>
        </div>
        <h2 className="text-4xl font-display font-medium text-stone-900 leading-tight">Menor e Maior Preço</h2>
        <p className="mt-4 text-stone-500 text-lg leading-relaxed font-light">
          Amplitude de variação detectada para os combustíveis nos postos analisados.
        </p>
      </div>

      {loading && <div className="text-stone-400 font-mono animate-pulse uppercase text-sm border border-stone-200 bg-stone-50 p-6 rounded-lg text-center">Carregando dados...</div>}
      
      {error && (
        <div className="p-6 border border-rose-200 bg-rose-50 rounded-lg flex flex-col items-center justify-center gap-2">
           <iconify-icon icon="solar:danger-triangle-bold-duotone" className="text-3xl text-rose-500"></iconify-icon>
           <p className="text-rose-700 font-medium">Não foi possível carregar os preços.</p>
           <p className="text-sm text-rose-600 font-mono">{error}</p>
        </div>
      )}

      {!loading && !error && (!data || data.length === 0) && (
        <div className="p-12 border border-stone-200 bg-white rounded-lg flex flex-col items-center justify-center gap-4">
           <iconify-icon icon="solar:box-minimalistic-linear" className="text-4xl text-stone-300"></iconify-icon>
           <p className="text-stone-500 font-medium">Nenhum registro encontrado no momento.</p>
        </div>
      )}

      {!loading && data && data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
             <div key={index} className="glass-card p-6 flex flex-col justify-between group">
               {/* Left Section (Identification) */}
               <div className="flex-1 mb-6">
                  <div className="flex items-center justify-between mb-2">
                     <Badge variant="stone">{item.bairro}</Badge>
                     <p className="text-[10px] items-center gap-1 font-mono uppercase tracking-widest text-stone-400 flex"><iconify-icon icon="solar:calendar-date-outline"></iconify-icon> {new Date(item.data_coleta).toLocaleDateString()}</p>
                  </div>
                  <p className="font-semibold text-stone-900 font-display text-lg leading-tight group-hover:text-stone-700 transition-colors mt-2 mb-2">{item.nome_posto}</p>
               </div>
               
               {/* Right Section (Prices) */}
               <div className="border-t border-stone-100 pt-4 flex justify-between items-end">
                  <div>
                    <p className="text-[10px] font-mono uppercase text-stone-400 mb-1 flex items-center gap-1"><iconify-icon icon="solar:gas-station-outline"></iconify-icon> Combustível</p>
                    <p className="font-medium text-stone-700">{item.tipo_combustivel}</p>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-mono uppercase text-stone-400 mb-1">Registrado</p>
                     <span className="font-display font-bold text-2xl text-stone-900">
                       R$ {Number(item.valor_combustivel).toFixed(3)}
                     </span>
                  </div>
               </div>
             </div>
          ))}
        </div>
      )}
    </div>
  );
}
