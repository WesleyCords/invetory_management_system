import { FastifyReply, FastifyRequest } from 'fastify';
import StockMovementService, {
  IStockRequest,
} from '../services/StockMovementService';
import GetProductBalanceService from '../services/GetProductBalance';
import GetStockMovementsService from '../services/GetAllStockMovementsService';
import z from 'zod';
import { getMovementsQuerySchema } from '../schemas/stockMovement.schema';

export type GetMovementsQueryParams = z.infer<typeof getMovementsQuerySchema>;

class StockMovementController {
  async register(
    req: FastifyRequest<{ Body: Omit<IStockRequest, 'userId'> }>,
    reply: FastifyReply,
  ) {
    const registerStock = new StockMovementService();
    const idUser = req.user.sub; // Pegando o ID do usuário logado a partir do token

    const movement = await registerStock.execute({
      ...req.body,
      userId: idUser,
    });

    reply.status(201).send({
      message: 'Stock movement registered successfully',
      data: movement,
    });
  }

  async getBalance(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = req.params;

    const currentBalance = await new GetProductBalanceService().execute(id);

    reply.status(200).send({
      message: 'Get total balance the product is succesely',
      data: currentBalance,
    });
  }

  async getMovements(
    req: FastifyRequest<{
      Querystring: GetMovementsQueryParams;
    }>,
    reply: FastifyReply,
  ) {
    const stockMovementService = new GetStockMovementsService();

    const { movements, totalCount, totalPages } =
      await stockMovementService.execute(req.query);

    reply.status(200).send({
      message: 'Get all stock movements successfully',
      data: {
        movements,
        totalCount,
        totalPages,
      },
    });
  }
}

export default StockMovementController;
