import { z } from 'zod';

export const evolucaoQueryParamsSchema = z.object({
  postoId: z.string().regex(/^\d+$/, "postoId deve ser um número inteiro"),
  combustivelId: z.string().regex(/^\d+$/, "combustivelId deve ser um número inteiro"),
});
