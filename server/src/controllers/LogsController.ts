import { FastifyReply, FastifyRequest } from 'fastify';
import { getAuditLogsQuerySchema } from '../schemas/logs.schema';
import GetActivitysService from '../services/GetActivitysService';
import GetLogsService from '../services/GetLogsService';
import z from 'zod';

export type AuditLogs = z.infer<typeof getAuditLogsQuerySchema>;

class LogsController {
  async getAuditLogs(
    req: FastifyRequest<{ Querystring: AuditLogs }>,
    reply: FastifyReply,
  ) {
    const getLogs = new GetLogsService();
    const { logs, totalCount, totalPages } = await getLogs.execute(req.query);

    reply.status(200).send({
      message: 'Audit logs retrieved successfully',
      data: {
        logs,
        totalCount,
        totalPages,
      },
    });
  }

  async getActivitys(req: FastifyRequest, reply: FastifyReply) {
    const getActivitys = new GetActivitysService();
    const activitys = await getActivitys.execute();

    reply.status(200).send({
      message: 'Activitys retrieved successfully',
      data: activitys,
    });
  }
}

export default LogsController;
