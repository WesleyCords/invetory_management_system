import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import StockMovementController from '../controllers/StockMovementController';
import verifyJWT from '../middleware/verify-jwt';
import {
  getMovementsQuerySchema,
  getMovementsResponseSchema,
  registerStockMovementResponseSchema,
  registerStockMovementSchema,
} from '../schemas/stockMovement.schema';

export const stockRoutes: FastifyPluginAsyncZod = async (fastify) => {
  const stockController = new StockMovementController();

  fastify.addHook('preHandler', verifyJWT);

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
    '/movements',
    {
      schema: {
        querystring: getMovementsQuerySchema,
        response: {
          200: getMovementsResponseSchema,
        },
      },
    },
    stockController.getMovements,
  );
};
