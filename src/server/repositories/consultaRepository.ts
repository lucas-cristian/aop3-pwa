import { prisma } from '@/lib/prisma';
import { 
  MenorMaiorPrecoItem, 
  PrecoMedioItem, 
  PrecoRecenteItem, 
  EvolucaoItem, 
  MediaPorCombustivelItem, 
  MediaPorCombustivelPorPostoItem,
  CombustivelListItem
} from '../types/consultaTypes';

export class ConsultaRepository {

  async getAllMenorMaiorPreco(): Promise<MenorMaiorPrecoItem[]> {
    return await prisma.$queryRaw<MenorMaiorPrecoItem[]>`
      SELECT
        p.nome       AS nome_posto,
        CONCAT(p.logradouro, ', ', COALESCE(p.numero, 'S/N'), ' - CEP: ', p.cep) AS endereco,
        b.nome       AS bairro,
        c.descricao  AS tipo_combustivel,
        co.valor     AS valor_combustivel,
        co.data_coleta
      FROM coleta co
      JOIN posto p        ON co.id_posto = p.id_posto
      JOIN bairro b       ON p.id_bairro = b.id_bairro
      JOIN combustivel c  ON co.id_combustivel = c.id_combustivel
      WHERE co.valor = (
          SELECT MIN(co2.valor)
          FROM coleta co2
          WHERE co2.id_combustivel = co.id_combustivel
      )
         OR co.valor = (
          SELECT MAX(co2.valor)
          FROM coleta co2
          WHERE co2.id_combustivel = co.id_combustivel
      )
      ORDER BY c.descricao, co.valor;
    `;
  }

  async getAllPrecoMedio(): Promise<PrecoMedioItem[]> {
    return await prisma.$queryRaw<PrecoMedioItem[]>`
      SELECT
        p.nome                      AS nome_posto,
        b.nome                      AS bairro,
        c.descricao                 AS tipo_combustivel,
        ROUND(AVG(co.valor), 3)     AS preco_medio,
        CAST(COUNT(co.id_coleta) AS SIGNED) AS quantidade_amostras
      FROM coleta co
      JOIN posto p        ON co.id_posto = p.id_posto
      JOIN bairro b       ON p.id_bairro = b.id_bairro
      JOIN combustivel c  ON co.id_combustivel = c.id_combustivel
      GROUP BY p.id_posto, p.nome, b.nome, c.id_combustivel, c.descricao
      ORDER BY p.nome, c.descricao;
    `;
  }

  async getPrecoRecente(): Promise<PrecoRecenteItem[]> {
    return await prisma.$queryRaw<PrecoRecenteItem[]>`
      SELECT 
          p.nome AS nome_posto,
          b.nome AS bairro,
          c.descricao AS tipo_combustivel,
          co.valor AS valor_combustivel,
          co.data_coleta
      FROM coleta co
      JOIN posto p ON co.id_posto = p.id_posto
      JOIN bairro b ON p.id_bairro = b.id_bairro
      JOIN combustivel c ON co.id_combustivel = c.id_combustivel
      WHERE co.data_coleta = (
          SELECT MAX(co2.data_coleta)
          FROM coleta co2
          WHERE co2.id_posto = co.id_posto 
            AND co2.id_combustivel = co.id_combustivel
      );
    `;
  }

  async getEvolucao(postoId: number, combustivelId: number): Promise<EvolucaoItem[]> {
    return await prisma.$queryRaw<EvolucaoItem[]>`
      SELECT
        p.nome       AS nome_posto,
        b.nome       AS bairro,
        c.descricao  AS tipo_combustivel,
        co.valor     AS valor_combustivel,
        co.data_coleta
      FROM coleta co
      JOIN posto p        ON co.id_posto = p.id_posto
      JOIN bairro b       ON p.id_bairro = b.id_bairro
      JOIN combustivel c  ON co.id_combustivel = c.id_combustivel
      WHERE p.id_posto = ${postoId}
        AND c.id_combustivel = ${combustivelId}
      ORDER BY co.data_coleta ASC;
    `;
  }

  async getMediaPorCombustivel(): Promise<MediaPorCombustivelItem[]> {
    return await prisma.$queryRaw<MediaPorCombustivelItem[]>`
      SELECT 
        c.descricao AS tipo_combustivel,
        co.data_coleta,
        ROUND(AVG(co.valor), 3) AS preco_medio
      FROM coleta co
      JOIN combustivel c ON c.id_combustivel = co.id_combustivel
      GROUP BY c.id_combustivel, c.descricao, co.data_coleta
      ORDER BY co.data_coleta ASC;
    `;
  }

  async getPostos() {
    return await prisma.posto.findMany({
      select: {
        id_posto: true,
        nome: true,
        bairro: {
          select: {
            nome: true,
            cidade: {
              select: {
                nome: true
              }
            }
          }
        }
      },
      orderBy: { nome: 'asc' }
    });
  }

  async getCombustiveis(): Promise<CombustivelListItem[]> {
    return await prisma.combustivel.findMany({
      select: {
        id_combustivel: true,
        descricao: true
      },
      orderBy: { descricao: 'asc' }
    });
  }

  async getMediaPorCombustivelPorPosto(): Promise<MediaPorCombustivelPorPostoItem[]> {
    return await prisma.$queryRaw<MediaPorCombustivelPorPostoItem[]>`
      SELECT 
        p.nome AS posto,
        c.descricao AS combustivel,
        co.data_coleta,
        ROUND(AVG(co.valor), 3) AS preco_medio
      FROM coleta co
      JOIN posto p ON p.id_posto = co.id_posto
      JOIN combustivel c ON c.id_combustivel = co.id_combustivel
      GROUP BY p.id_posto, p.nome, c.id_combustivel, c.descricao, co.data_coleta
      ORDER BY co.data_coleta ASC, p.nome ASC;
    `;
  }
}
