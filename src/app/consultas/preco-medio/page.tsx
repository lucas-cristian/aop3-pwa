"use client";
import { useFetch } from "@/lib/api";
import { Badge } from "@/components/ui/Badge";

type PrecoMedio = {
  nome_posto: string;
  bairro: string;
  tipo_combustivel: string;
  preco_medio: string;
  quantidade_amostras: string;
}

export default function PrecoMedioPage() {
  const { data, loading, error } = useFetch<PrecoMedio[]>('/api/consultas/preco-medio');

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500">
      <div className="mb-10">
        <div className="inline-flex items-center gap-2 mb-4">
            <span className="w-1.5 h-1.5 bg-stone-400 rounded-full"></span>
            <span className="text-xs font-mono uppercase tracking-[0.2em] text-stone-400">Consultas</span>
        </div>
        <h2 className="text-4xl font-display font-medium text-stone-900 leading-tight">Preço Médio e Amostras</h2>
        <p className="mt-4 text-stone-500 text-lg leading-relaxed font-light">
          Cruzamento estatístico da volatilidade dos preços vs volume de repasses da ANP na região.
        </p>
      </div>

      {loading && <div className="text-stone-400 font-mono animate-pulse uppercase text-sm border border-stone-200 bg-white p-6 rounded-lg text-center">Consultando malha de dados...</div>}
      {error && <div className="text-red-500 p-4 border border-red-200 bg-red-50 rounded-lg shadow-sm text-sm font-mono">{error}</div>}

      {!loading && !error && (!data || data.length === 0) && (
        <div className="p-12 border border-stone-200 bg-white rounded-lg flex flex-col items-center justify-center gap-4 text-stone-400">
           <iconify-icon icon="solar:folder-with-files-outline" className="text-5xl"></iconify-icon>
           <p>Sem estatísticas de médias no momento.</p>
        </div>
      )}

      {/* Tabela Responsiva Estilizada c/ dashboard-list pattern */}
      {!loading && data && data.length > 0 && (
        <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-sm">
           
           <div className="hidden md:grid grid-cols-12 gap-4 bg-stone-50 border-b border-stone-200 px-6 py-4 text-xs font-mono uppercase tracking-widest text-stone-500 font-semibold">
              <div className="col-span-4">Identificação do Posto</div>
              <div className="col-span-3">Combustível</div>
              <div className="col-span-3 text-right">Média Computada</div>
              <div className="col-span-2 text-center">Nº Amostras</div>
           </div>

           <div className="divide-y divide-stone-100">
              {data.map((item, idx) => (
                <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center px-6 py-5 hover:bg-stone-50/50 transition-colors">
                   
                   <div className="col-span-4 flex items-center gap-4">
                      <div className="hidden sm:flex w-10 h-10 rounded-full bg-stone-100 border border-stone-200 items-center justify-center text-stone-500">
                         <iconify-icon icon="solar:gas-station-bold-duotone" className="text-xl"></iconify-icon>
                      </div>
                      <div>
                        <p className="font-semibold text-stone-900 text-sm md:text-base">{item.nome_posto}</p>
                        <p className="text-[11px] font-mono text-stone-500 mt-1 uppercase">{item.bairro}</p>
                      </div>
                   </div>

                   <div className="col-span-3">
                      <div className="md:hidden text-[10px] font-mono uppercase text-stone-400 mb-1">Combustível</div>
                      <Badge variant="indigo">{item.tipo_combustivel}</Badge>
                   </div>

                   <div className="col-span-3 md:text-right">
                      <div className="md:hidden text-[10px] font-mono uppercase text-stone-400 mb-1">Média Registrada</div>
                      <span className="font-display font-bold text-xl text-stone-900 bg-stone-100 py-1.5 px-3 rounded-lg border border-stone-200 inline-block">
                        R$ {Number(item.preco_medio).toFixed(3)}
                      </span>
                   </div>

                   <div className="col-span-2 md:text-center mt-2 md:mt-0">
                      <div className="flex items-center gap-1.5 md:justify-center">
                         <iconify-icon icon="solar:database-outline" className="text-stone-400"></iconify-icon>
                         <span className="text-sm font-medium text-stone-600">{item.quantidade_amostras}</span>
                      </div>
                   </div>

                </div>
              ))}
           </div>
        </div>
      )}
    </div>
  );
}
