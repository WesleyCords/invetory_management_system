import z from 'zod';

enum ActionLog {
  'CREATE',
  'UPDATE',
  'DELETE',
}

const jsonFieldSchema = z.record(z.string(), z.unknown()).nullable().optional();

export const logSchema = z.object({
  id: z.uuid(),
  action: z.enum(ActionLog),
  oldValue: jsonFieldSchema,
  newValue: jsonFieldSchema,
  createdAt: z.date(),
  userId: z.uuid(),
  productId: z.uuid(),
});

export const getLogSchemaResponse = z.object({
  message: z.string(),
  data: z.array(logSchema),
});

export const getAuditLogsQuerySchema = z.object({
  period: z.coerce
    .number()
    .min(1, 'O período mínimo é de 1 dia')
    .optional()
    .default(7),
  page: z.coerce.number().min(1, 'A página mínima é 1').optional().default(1),
  productId: z.uuid().optional(),
});
