import { FastifyReply, FastifyRequest } from 'fastify';
import MetricsDahboardService from '../services/MetricsDashboardService';

class MetricsController {
  async search(req: FastifyRequest, reply: FastifyReply) {
    const calcMetrics = new MetricsDahboardService();

    const metrics = calcMetrics.execute();

    reply.status(200).send({
      message: 'Deu certo',
      data: metrics,
    });
  }
}

export default MetricsController;
