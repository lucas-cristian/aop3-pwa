import { NextRequest, NextResponse } from 'next/server';
import { ConsultaService } from '@/server/services/consultaService';
import { buildSuccess, buildError } from '@/server/schemas/baseResponse';
import { evolucaoQueryParamsSchema } from '@/server/schemas/consultaSchemas';
import { ZodError } from 'zod';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const authQuery = {
      postoId: searchParams.get('postoId'),
      combustivelId: searchParams.get('combustivelId')
    };

    const validated = evolucaoQueryParamsSchema.parse(authQuery);

    const service = new ConsultaService();
    const data = await service.getEvolucao(Number(validated.postoId), Number(validated.combustivelId));

    const serializedData = JSON.parse(JSON.stringify(data, (key, value) =>
      typeof value === 'bigint' ? value.toString() : value
    ));

    return NextResponse.json(buildSuccess(serializedData, "Consulta de Evolução Realizada"));
  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(buildError("VALIDATION_ERROR", error.issues[0].message), { status: 400 });
    }
    console.error(error);
    return NextResponse.json(buildError("DATABASE_ERROR", "Falha ao processar consulta"), { status: 500 });
  }
}
