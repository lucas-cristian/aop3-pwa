import { ConsultaRepository } from '../repositories/consultaRepository';

export class ConsultaService {
  private repository: ConsultaRepository;

  constructor() {
    this.repository = new ConsultaRepository();
  }

  async getMenorMaiorPreco() {
    return await this.repository.gellAllMenorMaiorPreco();
  }

  async getPrecoMedio() {
    return await this.repository.getAllPrecoMedio();
  }

  async getPrecoRecente() {
    return await this.repository.getPrecoRecente();
  }

  async getEvolucao(postoId: number, combustivelId: number) {
    return await this.repository.getEvolucao(postoId, combustivelId);
  }

  async getMediaPorCombustivel() {
    return await this.repository.getMediaPorCombustivel();
  }

  async getPostos() {
    const postos = await this.repository.getPostos();
    return postos.map((p: any) => ({
      id_posto: p.id_posto,
      nome: p.nome,
      bairro: p.bairro.nome,
      cidade: p.bairro.cidade.nome
    }));
  }

  async getCombustiveis() {
    return await this.repository.getCombustiveis();
  }

  async getMediaPorCombustivelPorPosto() {
    return await this.repository.getMediaPorCombustivelPorPosto();
  }
}
