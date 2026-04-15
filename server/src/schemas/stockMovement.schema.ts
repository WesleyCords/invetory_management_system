import z from 'zod';

export const registerStockMovementSchema = z.object({
  productId: z.string().uuid('Format invalid ID'),
  type: z.enum(['IN', 'OUT'], {
    message: 'Type must be either IN or OUT',
  }),
  quantity: z.number().positive('Quantity must be greater than zero'),
});

export const registerStockMovementResponseSchema = z.object({
  message: z.string(),
  data: z.object({
    id: z.string().uuid(),
    productId: z.string().uuid(),
    type: z.enum(['IN', 'OUT']),
    quantity: z.number().positive(),
    createdAt: z.date(),
  }),
});

export const getProductBalanceSchema = z.object({
  id: z.string().uuid('Format invalid ID'),
});

export const getProductBalanceResponseSchema = z.object({
  message: z.string(),
  data: z.number(),
});
