import { ConsultaRepository } from '../repositories/consultaRepository';
import { 
  PostoListItem, 
  CombustivelListItem, 
  MenorMaiorPrecoItem, 
  PrecoMedioItem, 
  PrecoRecenteItem, 
  EvolucaoItem, 
  MediaPorCombustivelItem, 
  MediaPorCombustivelPorPostoItem 
} from '../types/consultaTypes';

export class ConsultaService {
  private repository: ConsultaRepository;

  constructor() {
    this.repository = new ConsultaRepository();
  }

  async getMenorMaiorPreco(): Promise<MenorMaiorPrecoItem[]> {
    return await this.repository.getAllMenorMaiorPreco();
  }

  async getPrecoMedio(): Promise<PrecoMedioItem[]> {
    return await this.repository.getAllPrecoMedio();
  }

  async getPrecoRecente(): Promise<PrecoRecenteItem[]> {
    return await this.repository.getPrecoRecente();
  }

  async getEvolucao(postoId: number, combustivelId: number): Promise<EvolucaoItem[]> {
    return await this.repository.getEvolucao(postoId, combustivelId);
  }

  async getMediaPorCombustivel(): Promise<MediaPorCombustivelItem[]> {
    return await this.repository.getMediaPorCombustivel();
  }

  async getPostos(): Promise<PostoListItem[]> {
    const postos = await this.repository.getPostos();
    
    interface PrismaPosto {
      id_posto: number;
      nome: string;
      bairro: {
        nome: string;
        cidade: {
          nome: string;
        }
      }
    }

    return (postos as unknown as PrismaPosto[]).map((p) => ({
      id_posto: p.id_posto,
      nome: p.nome,
      bairro: p.bairro.nome,
      cidade: p.bairro.cidade.nome
    }));
  }

  async getCombustiveis(): Promise<CombustivelListItem[]> {
    return await this.repository.getCombustiveis();
  }

  async getMediaPorCombustivelPorPosto(): Promise<MediaPorCombustivelPorPostoItem[]> {
    return await this.repository.getMediaPorCombustivelPorPosto();
  }
}
