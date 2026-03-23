import { FastifyPluginAsync } from 'fastify';

export const categoryRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.get('/categories', async () => {
    return { hello: 'categories' };
  });
};
