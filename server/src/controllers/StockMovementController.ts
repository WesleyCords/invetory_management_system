import { FastifyReply, FastifyRequest } from 'fastify';
import StockMovementService, {
  IStockRequest,
} from '../services/StockMovementService';
import GetStockMovementsService from '../services/GetAllStockMovementsService';
import z from 'zod';
import { getMovementsQuerySchema } from '../schemas/stockMovement.schema';

export type GetMovementsQueryParams = z.infer<typeof getMovementsQuerySchema>;

class StockMovementController {
  async register(req: FastifyRequest, reply: FastifyReply) {
    const registerStock = new StockMovementService();
    const idUser = req.user.sub; // Pegando o ID do usuário logado a partir do token

    const movement = await registerStock.execute({
      ...(req.body as Omit<IStockRequest, 'userId'>),
      userId: idUser,
    });

    reply.status(201).send({
      message: 'Stock movement registered successfully',
      data: movement,
    });
  }

  async getMovements(req: FastifyRequest, reply: FastifyReply) {
    const stockMovementService = new GetStockMovementsService();

    const { movements, totalCount, totalPages, summary } =
      await stockMovementService.execute(req.query as GetMovementsQueryParams);

    reply.status(200).send({
      message: 'Get all stock movements successfully',
      data: {
        movements,
        totalCount,
        totalPages,
        summary,
      },
    });
  }
}

export default StockMovementController;
