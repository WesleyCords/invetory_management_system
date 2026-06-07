import { FastifyReply, FastifyRequest } from 'fastify';
import CreateProductService, {
  IProductRequest,
} from '../services/CreateProductService';
import GetAllProductService from '../services/GetAllProductService';
import DeleteProductService from '../services/DeleteProductService';

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

  async getAllIsActive(req: FastifyRequest, reply: FastifyReply) {
    const getAllProducts = new GetAllProductService();

    const products = await getAllProducts.execute();

    return reply.status(200).send({
      message: 'Get all producst is ACTIVE',
      data: products,
    });
  }

  async delete(
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = req.params;
    const deleteProduct = new DeleteProductService();

    const product = await deleteProduct.execute(id);

    reply.status(200).send({
      message: 'Product deleted successfully',
      data: product,
    });
  }
}

export default ProductController;
