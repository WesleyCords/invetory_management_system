import { FastifyReply, FastifyRequest } from 'fastify';
import CreateProductService, {
  IProductRequest,
} from '../services/CreateProductService';

class ProductController {
  async create(
    req: FastifyRequest<{ Body: IProductRequest }>,
    reply: FastifyReply,
  ) {
    const data = req.body;
    const createProduct = new CreateProductService();

    const product = await createProduct.execute(data);

    return reply.status(201).send({
      message: 'Product created with success!',
      data: product,
    });
  }
}

export default ProductController;
