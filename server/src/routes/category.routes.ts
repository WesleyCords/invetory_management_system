// import { FastifyPluginAsync } from 'fastify'; // was replace for plguin of ZOD
import * as z from 'zod';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';

export const categoryRoutes: FastifyPluginAsyncZod = async (fastify) => {
  fastify.post(
    '/categories',
    {
      schema: {
        body: z.object({
          name: z.string().min(3, 'Name must contain at least 3 characters.'),
        }),
      },
    },
    async (request, reply) => {
      const data = request.body;

      reply.status(200).send(data);
    },
  );

  fastify.get('/categories', async () => {
    return { hello: 'rota do categories' };
  });
};
