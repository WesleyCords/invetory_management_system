import { FastifyReply, FastifyRequest } from 'fastify';
import { getAuditLogsQuerySchema } from '../schemas/logs.schema';
import GetActivitiesService from '../services/GetActivitiesService';
import GetLogsService from '../services/GetLogsStatsService';
import z from 'zod';

export type AuditLogs = z.infer<typeof getAuditLogsQuerySchema>;

class LogsController {
  async getAuditLogs(req: FastifyRequest, reply: FastifyReply) {
    const { period, search, userId, limit, page } = req.query as AuditLogs;

    const getLogs = new GetLogsService();
    const logsStats = await getLogs.execute({
      periodInDays: period,
      search,
      userId,
      limit,
      page,
    });

    reply.status(200).send({
      message: 'Audit logs retrieved successfully',
      data: logsStats,
    });
  }

  async getActivitys(req: FastifyRequest, reply: FastifyReply) {
    const getActivitys = new GetActivitiesService();
    const activitys = await getActivitys.execute();

    reply.status(200).send({
      message: 'Activitys retrieved successfully',
      data: activitys,
    });
  }
}

export default LogsController;
