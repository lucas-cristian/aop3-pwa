"use client";
import { useFetch } from "@/lib/api";
import { Card, FlashlightCard } from "@/components/ui/Card";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";

export default function Home() {
  const { data: health } = useFetch<{ status: string }>('/api/health');

  return (
    <div className="animate-in fade-in duration-700">
      
      {/* Hero Section Artools Style */}
      <div className="mb-24 mt-8 flex flex-col items-start gap-4 text-left">
        <div className="inline-flex items-center gap-3">
          <span className={`w-2 h-2 rounded-full ${health?.status === 'ok' ? 'bg-emerald-500 animate-pulse' : 'bg-stone-300'}`}></span>
          <span className="text-xs font-mono uppercase tracking-[0.2em] text-stone-500">
            {health?.status === 'ok' ? 'Conectado à Base ANP' : 'Status: Desconhecido'}
          </span>
        </div>
        
        <h1 className="font-display text-5xl md:text-7xl lg:text-[5.5rem] font-bold tracking-tighter leading-[0.9] text-stone-900 max-w-4xl">
          Painel de Combustíveis.<br />
          <span className="text-stone-400">Em tempo real.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-stone-500 leading-relaxed max-w-2xl font-light mt-4">
          Projeto experimental (AOP3) de análise de dados da ANP. Consulta dinâmica da evolução, margens médias e extremos do mercado de combustíveis nas cidades monitoradas.
        </p>

        <div className="flex gap-4 mt-8 flex-wrap">
          <Badge variant="stone">Cidades Analisadas</Badge>
          <Badge variant="emerald">Fonte: API ANP</Badge>
          <Badge variant="amber">Período: Recente</Badge>
        </div>
      </div>

      {/* Cards de Navegacao baseados em (Dashboard-List / Artools Flashlight approach) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-10 border-t border-stone-200">
        
        <Link href="/consultas/menor-maior" className="block h-full cursor-pointer">
           <FlashlightCard title="Menor e Maior Preço" icon="solar:chart-square-linear">
             Identifique os postos com valores extremos em sua região. Extremamente útil para saber rapidamente o teto e o piso de preços praticados.
           </FlashlightCard>
        </Link>

        <Link href="/consultas/preco-medio" className="block h-full cursor-pointer hover:-translate-y-1 transition-transform">
           <FlashlightCard title="Média de Preços" icon="solar:graph-up-linear">
             Cruzamento das amostras em banco consolidadas com volumetria (N amostras) por posto e bairro.
           </FlashlightCard>
        </Link>
        
        <Link href="/consultas/preco-recente" className="block h-full cursor-pointer hover:-translate-y-1 transition-transform">
           <FlashlightCard title="Valores Recentes" icon="solar:history-linear">
             Relatório das últimas coletas enviadas do AOP2. Verifique os dados mais quentes direto no painel da ANP.
           </FlashlightCard>
        </Link>

        <Link href="/consultas/evolucao" className="block h-full cursor-pointer hover:-translate-y-1 transition-transform">
           <FlashlightCard title="Evolução Temporal" icon="solar:presentation-graph-linear">
             Acompanhe o comportamento e as tendências de variação do preço ao longo dos dias para cada posto e combustível específico.
           </FlashlightCard>
        </Link>

        <Link href="/graficos" className="block h-full cursor-pointer hover:-translate-y-1 transition-transform md:col-span-2">
           <div className="flashlight-card h-full border border-stone-300 bg-stone-900 text-stone-100 p-8 flex flex-col justify-between rounded-sm shadow-2xl transition-all duration-500 group">
             <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center text-white mb-6">
               <iconify-icon icon="solar:pie-chart-3-linear" className="text-2xl"></iconify-icon>
             </div>
             <div>
               <h3 className="text-2xl font-display font-medium mb-3 text-white">Análise de Redes - Gráficos</h3>
               <p className="text-stone-400 text-sm leading-relaxed">
                 Visualize consolidações avançadas como Ganhos Médios por Combustível ou Distribuição Comparativa. 
               </p>
             </div>
           </div>
        </Link>

      </div>
    </div>
  );
}
