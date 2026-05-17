import { FastifyPluginAsync } from 'fastify';
import { productRoutes } from './product.routes.js';
import { stockRoutes } from './stock.routes.js';
import { userRoutes } from './user.routes.js';

export const appRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(productRoutes);
  fastify.register(stockRoutes);
  fastify.register(userRoutes);
};
