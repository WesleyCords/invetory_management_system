import z from 'zod';
import { MovementType } from '@prisma/client';
import { getAuditLogsQuerySchema } from './logs.schema';

export const registerStockMovementSchema = z.object({
  productId: z.uuid('Format invalid ID'),
  type: z.enum(MovementType, {
    message: 'Type must be either IN or OUT',
  }),
  quantity: z.number().positive('Quantity must be greater than zero'),
});

export const registerStockMovementResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    id: z.uuid(),
    userId: z.uuid(),
    productId: z.uuid(),
    type: z.enum(MovementType),
    quantity: z.number().positive(),
    createdAt: z.date(),
  }),
});

export const getProductBalanceSchema = z.object({
  id: z.uuid('Format invalid ID'),
});

export const getProductBalanceResponseSchema = z.object({
  message: z.string(),
  data: z.number(),
});

export const getMovementsQuerySchema = getAuditLogsQuerySchema;

export const getMovementsResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    movements: z.array(
      z.object({
        id: z.uuid(),
        type: z.enum(MovementType),
        quantity: z.number().positive(),
        createdAt: z.date(),
        user: z.object({
          name: z.string(),
          avatarUrl: z.string().nullable(),
          role: z.string(),
          id: z.uuid(),
        }),
        product: z.object({
          name: z.string(),
          sku: z.string(),
          id: z.uuid(),
        }),
      }),
    ),
    totalCount: z.number(),
    totalPages: z.number(),
  }),
});
