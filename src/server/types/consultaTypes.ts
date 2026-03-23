export interface PostoListItem {
  id_posto: number;
  nome: string;
  bairro: string;
  cidade: string;
}

export interface CombustivelListItem {
  id_combustivel: number;
  descricao: string;
}

export interface MenorMaiorPrecoItem {
  nome_posto: string;
  endereco: string;
  bairro: string;
  tipo_combustivel: string;
  valor_combustivel: number;
  data_coleta: Date | string;
}

export interface PrecoMedioItem {
  nome_posto: string;
  bairro: string;
  tipo_combustivel: string;
  preco_medio: number;
  quantidade_amostras: number;
}

export interface PrecoRecenteItem {
  nome_posto: string;
  bairro: string;
  tipo_combustivel: string;
  valor_combustivel: number;
  data_coleta: Date | string;
}

export interface EvolucaoItem {
  nome_posto: string;
  bairro: string;
  tipo_combustivel: string;
  valor_combustivel: number;
  data_coleta: Date | string;
}

export interface MediaPorCombustivelItem {
  tipo_combustivel: string;
  data_coleta: Date | string;
  preco_medio: number;
}

export interface MediaPorCombustivelPorPostoItem {
  posto: string;
  combustivel: string;
  data_coleta: Date | string;
  preco_medio: number;
}
