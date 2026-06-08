import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import VerifyJWT from '../middleware/verify-jwt';
import { ResponseCategory } from '../schemas/category.schema';
import ControllerCategory from '../controllers/ControllerCategory';

export const categoryRouter: FastifyPluginAsyncZod = async (fastify) => {
  fastify.addHook('preHandler', VerifyJWT);
  const controllerCategory = new ControllerCategory();

  fastify.get(
    '/categories',
    {
      schema: {
        response: {
          200: ResponseCategory,
        },
      },
    },
    controllerCategory.search,
  );
};
