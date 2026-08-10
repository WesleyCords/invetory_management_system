import { FastifyPluginAsync } from 'fastify';
import { productRoutes } from './product.routes.js';
import { stockRoutes } from './stock.routes.js';
import { userRoutes } from './user.routes.js';
import { MetricsRoutes } from './metrics.router.js';
import { categoryRouter } from './category.router.js';
import { supplierRouter } from './supplier.router.js';
import { brandRouter } from './brand.router.js';
import { logsRoutes } from './logs.router.js';
import { analyticsRouter } from './analytics.router.js';

export const appRoutes: FastifyPluginAsync = async (fastify) => {
  fastify.register(productRoutes);
  fastify.register(stockRoutes);
  fastify.register(userRoutes);
  fastify.register(MetricsRoutes);
  fastify.register(categoryRouter);
  fastify.register(supplierRouter);
  fastify.register(brandRouter);
  fastify.register(logsRoutes);
  fastify.register(analyticsRouter);
};
