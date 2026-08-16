import { FastifyReply, FastifyRequest } from 'fastify';
import GetAnalyticsSystemService from '../services/GetAnalyticsSystemService';
import GetWorkflowChartService from '../services/GetWorkflowChartService';
import GetPriceChartService from '../services/GetPriceChartService';

class AnalyticsController {
  async stats(req: FastifyRequest, reply: FastifyReply) {
    const { periodInDays } = req.query as { periodInDays: number };

    const [stats, priceData, workflowData] = await Promise.all([
      new GetAnalyticsSystemService().execute({ periodInDays }),
      new GetPriceChartService().execute({ periodInDays }),
      new GetWorkflowChartService().execute({ periodInDays }),
    ]);

    reply.status(200).send({
      message: `Analytics data of ${periodInDays} days retrieved successfully`,
      data: {
        ...stats,
        priceData,
        workflowData,
      },
    });
  }
}

export default AnalyticsController;
