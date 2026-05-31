import { FastifyReply, FastifyRequest } from 'fastify';
import MetricsDahboardService from '../services/MetricsDashboardService';

class MetricsController {
  async search(req: FastifyRequest, reply: FastifyReply) {
    const calcMetrics = new MetricsDahboardService();

    const metrics = await calcMetrics.execute();

    reply.status(200).send({
      message: 'Dashboard data fetched successfully',
      data: metrics,
    });
  }
}

export default MetricsController;
