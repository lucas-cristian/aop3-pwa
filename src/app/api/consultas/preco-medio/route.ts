import { NextResponse } from 'next/server';
import { ConsultaService } from '@/server/services/consultaService';
import { buildSuccess, buildError } from '@/server/schemas/baseResponse';

export async function GET() {
  try {
    const service = new ConsultaService();
    const data = await service.getPrecoMedio();

    const serializedData = JSON.parse(JSON.stringify(data, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));

    return NextResponse.json(buildSuccess(serializedData, "Preço médio global recuperado com sucesso"));
  } catch (error) {
    console.error(error);
    return NextResponse.json(buildError("DATABASE_ERROR", "Erro ao calcular preço médio global"), { status: 500 });
  }
}
