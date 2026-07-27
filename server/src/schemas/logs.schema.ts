import z from 'zod';

const jsonFieldSchema = z.record(z.string(), z.unknown()).nullable().optional();

export const logSchema = z.object({
  id: z.uuid(),
  action: z.enum(['CREATE', 'UPDATE', 'DELETE']),
  description: z.string(),
  oldValue: jsonFieldSchema,
  newValue: jsonFieldSchema,
  createdAt: z.date(),
  userId: z.uuid(),
  productId: z.uuid(),
});

const logFullSchema = logSchema
  .omit({
    userId: true,
    productId: true,
  })
  .extend({
    user: z.object({
      id: z.uuid(),
      name: z.string(),
      avatarUrl: z.url().nullable().optional(),
      role: z.enum(['MANAGER', 'EMPLOYEE']),
    }),
    product: z.object({
      id: z.uuid(),
      name: z.string(),
      sku: z.string(),
    }),
  });

export const getLogSchemaResponse = z.object({
  message: z.string(),
  data: z.object({
    logs: z.array(logFullSchema),
    totalCount: z.number(),
    totalPages: z.number(),
  }),
});

export const getActivitysSchemaResponse = z.object({
  message: z.string(),
  data: z.object({
    activities: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        action: z.enum(['Movimentação', 'Produto']),
        createdAt: z.date(),
        user: z.object({
          id: z.uuid(),
          name: z.string(),
          avatarUrl: z.url().nullable().optional(),
          role: z.enum(['MANAGER', 'EMPLOYEE']),
        }),
        product: z.object({
          id: z.uuid(),
          name: z.string(),
          sku: z.string(),
        }),
      }),
    ),
    totalCount: z.number(),
  }),
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
