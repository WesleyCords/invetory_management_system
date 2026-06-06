import { FastifyReply, FastifyRequest } from 'fastify';
import GetCategoriesService from '../services/GetCategoriesService';

class ControllerCategory {
  async search(req: FastifyRequest, reply: FastifyReply) {
    const searchCategories = new GetCategoriesService();

    const categories = await searchCategories.execute();

    reply.status(200).send({
      message: 'A very successful search by category',
      data: categories,
    });
  }
}

export default ControllerCategory;
