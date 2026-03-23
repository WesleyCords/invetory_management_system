import { FastifyPluginAsync } from 'fastify';
import { productRoutes } from './product.routes.js';
import { categoryRoutes } from './category.routes.js';

export const appRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(productRoutes);
  fastify.register(categoryRoutes);
};
