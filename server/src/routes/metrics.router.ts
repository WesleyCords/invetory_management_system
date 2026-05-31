import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import VerifyJWT from '../middleware/verify-jwt';
import { MetricsDashboardResponse } from '../schemas/metrics.schema';
import MetricsController from '../controllers/MetricsController';

export const MetricsRoutes: FastifyPluginAsyncZod = async (fastify) => {
  const metricsController = new MetricsController();
  fastify.addHook('preHandler', VerifyJWT);

  fastify.get(
    '/metrics/dashboard',
    {
      schema: {
        response: {
          200: MetricsDashboardResponse,
        },
      },
    },
    metricsController.search,
  );
};
