import { FastifyReply, FastifyRequest } from 'fastify';
import { getAuditLogsQuerySchema } from '../schemas/logs.schema';
import GetLogsService from '../services/GetLogsService';
import z from 'zod';

export type AuditLogs = z.infer<typeof getAuditLogsQuerySchema>;

class LogsController {
  async getAuditLogs(
    req: FastifyRequest<{ Querystring: AuditLogs }>,
    reply: FastifyReply,
  ) {
    const getLogs = new GetLogsService();
    const logs = await getLogs.execute(req.query);

    reply.status(200).send({
      message: 'Audit logs retrieved successfully',
      data: logs,
    });
  }
}

export default LogsController;
