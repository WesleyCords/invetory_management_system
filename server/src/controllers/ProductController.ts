import { FastifyReply, FastifyRequest } from 'fastify';
import CreateProductService from '../services/CreateProductService';

interface IParams {
  name: string;
  categoryId: string;
  price: number;
}

class ProductController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    // VOu melhorar com zod
    const { name, categoryId, price } = req.body as IParams;

    const createProduct = new CreateProductService();

    const product = await createProduct.execute({ name, categoryId, price });

    reply.status(201).send(product);
  }
}

export default ProductController;
