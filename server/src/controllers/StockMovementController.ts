import { FastifyReply, FastifyRequest } from 'fastify';
import StockMovementService, {
  IStockRequest,
} from '../services/StockMovementService';
import GetProductBalanceService from '../services/GetProductBalance';

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

    console.log('Stock movement registered successfully', movement);

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
}

export default StockMovementController;
