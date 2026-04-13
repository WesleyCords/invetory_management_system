import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import StockMovementController from '../controllers/StockMovementController';
import z from 'zod';

export const stockRoutes: FastifyPluginAsyncZod = async (fastify) => {
  const stockController = new StockMovementController();

  fastify.post(
    '/movements',
    {
      schema: {
        body: z.object({
          productId: z.string().uuid('Format invalid'),
          type: z.enum(['IN', 'OUT'], {
            message: 'Type must be either IN or OUT',
          }),
          quantity: z.number().positive('Quantity must be greater than zero'),
        }),
      },
    },
    stockController.register,
  );

  fastify.get(
    '/product/:id/balance',
    {
      schema: {
        params: z.object({
          id: z.string().uuid('Format Invalid ID'),
        }),
      },
    },
    stockController.getBalance,
  );
};
