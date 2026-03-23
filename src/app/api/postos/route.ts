import { NextResponse } from 'next/server';
import { ConsultaService } from '@/server/services/consultaService';
import { buildSuccess, buildError } from '@/server/schemas/baseResponse';

export async function GET() {
  try {
    const service = new ConsultaService();
    const data = await service.getPostos();
    
    const serializedData = JSON.parse(JSON.stringify(data, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));

    return NextResponse.json(buildSuccess(serializedData, "Lista de postos recuperada com sucesso"));
  } catch (error) {
    console.error(error);
    return NextResponse.json(buildError("DATABASE_ERROR", "Erro ao recuperar lista de postos"), { status: 500 });
  }
}
