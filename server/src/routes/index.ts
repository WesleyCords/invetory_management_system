import { FastifyPluginAsync } from 'fastify';
import { productRoutes } from './product.routes.js';
import { stockRoutes } from './stock.routes.js';
import { userRoutes } from './user.routes.js';
import { MetricsRoutes } from './metrics.router.js';
import { categoryRouter } from './category.router.js';

export const appRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(productRoutes);
  fastify.register(stockRoutes);
  fastify.register(userRoutes);
  fastify.register(MetricsRoutes);
  fastify.register(categoryRouter);
};
