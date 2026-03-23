import { NextResponse } from 'next/server';
import { buildSuccess } from '@/server/schemas/baseResponse';

export async function GET() {
  return NextResponse.json(buildSuccess({ status: 'API is running' }, "Servidor OK"));
}
