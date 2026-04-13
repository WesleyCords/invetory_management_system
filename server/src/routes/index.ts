import { FastifyPluginAsync } from 'fastify';
import { productRoutes } from './product.routes.js';

export const appRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(productRoutes);
};
