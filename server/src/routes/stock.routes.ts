import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import StockMovementController from '../controllers/StockMovementController';
import {
  getProductBalanceResponseSchema,
  getProductBalanceSchema,
  registerStockMovementResponseSchema,
  registerStockMovementSchema,
} from '../schemas/stockMovement.schema';

export const stockRoutes: FastifyPluginAsyncZod = async (fastify) => {
  const stockController = new StockMovementController();

  fastify.post(
    '/movements',
    {
      schema: {
        body: registerStockMovementSchema,
        response: {
          201: registerStockMovementResponseSchema,
        },
      },
    },
    stockController.register,
  );

  fastify.get(
    '/product/:id/balance',
    {
      schema: {
        params: getProductBalanceSchema,
        response: {
          200: getProductBalanceResponseSchema,
        },
      },
    },
    stockController.getBalance,
  );
};
