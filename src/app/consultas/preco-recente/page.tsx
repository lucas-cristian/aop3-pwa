"use client";
import { useFetch } from "@/lib/api";
import { Badge } from "@/components/ui/Badge";

type PrecoRecente = {
  nome_posto: string;
  bairro: string;
  tipo_combustivel: string;
  valor_combustivel: string;
  data_coleta: string;
}

export default function PrecoRecentePage() {
  const { data, loading, error } = useFetch<PrecoRecente[]>('/api/consultas/preco-recente');

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full animate-pulse"></span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-cyan-600 font-semibold">Live Data</span>
        </div>
        <h2 className="text-4xl font-display font-medium text-stone-900 leading-tight">Preço Mais Recente</h2>
        <p className="mt-4 text-stone-500 text-lg leading-relaxed font-light">
          Monitoramento em tempo real do último valor coletado para cada variável por localidade.
        </p>
      </div>

      {loading && <div className="text-stone-400 font-mono animate-pulse uppercase text-sm border border-stone-200 bg-white p-6 rounded-lg text-center">Buscando varredura mais recente...</div>}
      {error && <div className="text-rose-500 p-4 border border-rose-200 bg-rose-50 rounded-lg">{error}</div>}

      {!loading && !error && (!data || data.length === 0) && (
        <div className="p-12 border border-stone-200 bg-white rounded-lg flex flex-col items-center justify-center gap-4 text-stone-400">
           <iconify-icon icon="solar:history-line-duotone" className="text-5xl"></iconify-icon>
           <p>Sem coletas recentes neste momento.</p>
        </div>
      )}

      {!loading && data && data.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.map((item, index) => (
             <div key={index} className="glass-card hover:-translate-y-2 relative overflow-hidden group">
               {/* Accent line on top */}
               <div className="absolute top-0 left-0 w-full h-1 bg-cyan-200 group-hover:bg-cyan-500 transition-colors"></div>
               
               <div className="p-6">
                  <div className="flex justify-between items-start mb-6">
                     <Badge variant="cyan">{item.bairro}</Badge>
                     <div className="flex items-center gap-1 text-[10px] uppercase font-mono text-stone-400">
                       <iconify-icon icon="solar:clock-circle-outline"></iconify-icon>
                       {new Date(item.data_coleta).toLocaleDateString()}
                     </div>
                  </div>

                  <h3 className="font-display font-semibold text-lg text-stone-900 leading-tight mb-4 min-h-[50px]">
                    {item.nome_posto}
                  </h3>

                  <div className="border-t border-stone-100 pt-4 flex justify-between items-end">
                    <div>
                      <p className="text-[10px] font-mono uppercase text-stone-400 mb-1">Combustível</p>
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
             </div>
          ))}
        </div>
      )}
    </div>
  );
}
