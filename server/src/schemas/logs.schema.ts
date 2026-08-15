import z from 'zod';
import { LogCategory } from '@prisma/client';

const jsonFieldSchema = z.record(z.string(), z.unknown()).nullable().optional();

export const logSchema = z.object({
  id: z.uuid(),
  action: z.string().max(50, 'Action must be at most 50 characters long'),
  description: z.string(),
  metadata: jsonFieldSchema.optional().nullable(),
  category: z.enum(Object.values(LogCategory)),
  createdAt: z.date(),
  userId: z.uuid(),
  productId: z.uuid().optional().nullable(),
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
    product: z
      .object({
        id: z.uuid(),
        name: z.string(),
        sku: z.string(),
      })
      .optional()
      .nullable(),
  });

export const getLogSchemaResponse = z.object({
  message: z.string(),
  data: z.object({
    totalLogs: z.number(),
    criticalLogsCount: z.number(),
    topUser: z
      .object({
        name: z.string(),
        actionsCount: z.number(),
      })
      .nullable()
      .optional(),
    logs: z.array(logFullSchema),
    totalPages: z.number(),
  }),
});

export const getActivitysSchemaResponse = z.object({
  message: z.string(),
  data: z.object({
    activities: z.array(
      z.object({
        id: z.uuid(),
        title: z.string(),
        description: z.string(),
        action: z.enum(['Movimentação', 'Sistema']),
        createdAt: z.date(),
        user: z.object({
          id: z.uuid(),
          name: z.string(),
          avatarUrl: z.url().nullable().optional(),
          role: z.enum(['MANAGER', 'EMPLOYEE']),
        }),
        product: z
          .object({
            id: z.uuid(),
            name: z.string(),
            sku: z.string(),
          })
          .optional()
          .nullable(),
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
  limit: z.coerce.number().min(1, 'O limite mínimo é 1').optional().default(10),
  productId: z.uuid().optional(),
  type: z.enum(['IN', 'OUT', 'all']).optional().default('all'),
  search: z.string().optional().default(''),
  userId: z.uuid().optional(),
});
