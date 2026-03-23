import { z } from 'zod';

export const evolucaoQueryParamsSchema = z.object({
  postoId: z.string({ message: "postoId deve ser uma string" })
    .min(1, "postoId é obrigatório")
    .regex(/^\d+$/, "postoId deve conter apenas números"),
  
  combustivelId: z.string({ message: "combustivelId deve ser uma string" })
    .min(1, "combustivelId é obrigatório")
    .regex(/^\d+$/, "combustivelId deve conter apenas números"),
});
