import { FastifyPluginAsync, FastifyRequest, FastifyReply } from 'fastify';
import { prisma } from './lib/prisma';

const routes: FastifyPluginAsync = async (fastify, options) => {
  fastify.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: 'world' };
  });
};

export default routes;
