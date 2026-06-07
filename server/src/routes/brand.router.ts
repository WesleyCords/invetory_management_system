import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { BrandListResponse } from '../schemas/brand.schema';
import BrandController from '../controllers/BrandController';

export const brandRouter: FastifyPluginAsyncZod = async (fastify) => {
  const brandController = new BrandController();

  fastify.get(
    '/brands',
    {
      schema: {
        response: {
          200: BrandListResponse,
        },
      },
    },
    brandController.getAll,
  );
};
