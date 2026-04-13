import { FastifyReply, FastifyRequest } from 'fastify';
import StockMovementService, {
  IStockRequest,
} from '../services/StockMovementService';

class StockMovementController {
  async register(
    req: FastifyRequest<{ Body: IStockRequest }>,
    reply: FastifyReply,
  ) {
    const registerStock = new StockMovementService();

    const movement = await registerStock.execute(req.body);

    reply.status(201).send({
      message: 'Stock movement registered successfully',
      data: movement,
    });
  }
}

export default StockMovementController;
