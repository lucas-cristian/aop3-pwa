import { NextResponse } from 'next/server';
import { ConsultaService } from '@/server/services/consultaService';
import { buildSuccess, buildError } from '@/server/schemas/baseResponse';

export async function GET() {
  try {
    const service = new ConsultaService();
    const data = await service.getMediaPorCombustivel();

    const serializedData = JSON.parse(JSON.stringify(data, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));

    return NextResponse.json(buildSuccess(serializedData, "Evolução Global Média por Combustível"));
  } catch (error) {
    console.error(error);
    return NextResponse.json(buildError("DATABASE_ERROR", "Falha ao extrair dados gráficos"), { status: 500 });
  }
}
