import { FastifyReply, FastifyRequest } from 'fastify';
import GetAllBrandsService from '../services/GetAllBrandsService';

class BrandController {
  async getAll(request: FastifyRequest, reply: FastifyReply) {
    const brandService = new GetAllBrandsService();

    const brands = await brandService.execute();

    return reply.status(200).send({
      message: 'Get all brands with success!',
      data: brands,
    });
  }
}

export default BrandController;
