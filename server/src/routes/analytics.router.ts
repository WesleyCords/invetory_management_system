import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import AnalyticsController from '../controllers/AnalyticsController';
import {
  analyticsQuerySchema,
  analyticsResponseSchema,
} from '../schemas/analytics.schema';

export const analyticsRouter: FastifyPluginAsyncZod = async (fastify) => {
  const analyticsController = new AnalyticsController();

  fastify.get(
    '/analytics/stats',
    {
      schema: {
        querystring: analyticsQuerySchema,
        response: {
          200: analyticsResponseSchema,
        },
      },
    },
    analyticsController.stats,
  );
};
