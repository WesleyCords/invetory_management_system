import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import verifyJWT from '../middleware/verify-jwt';
import {
  getAuditLogsQuerySchema,
  getLogSchemaResponse,
} from '../schemas/logs.schema';
import LogsController from '../controllers/LogsController';

export const logsRoutes: FastifyPluginAsyncZod = async (fastify) => {
  const logsController = new LogsController();

  fastify.addHook('preHandler', verifyJWT);

  fastify.get(
    '/audit-logs',
    {
      schema: {
        querystring: getAuditLogsQuerySchema,
        response: {
          200: getLogSchemaResponse,
        },
      },
    },
    logsController.getAuditLogs,
  );
  /* fastify.get(
    '/activitys',
    {
      schema: {
        querystring: getAuditLogsQuerySchema,
        response: {
          200: getLogSchemaResponse,
        },
      },
    },
    logsController.getActivityLogs,
  ); */
};
