import { FastifyReply, FastifyRequest } from 'fastify';
import CreateProductService, {
  IProductRequest,
} from '../services/CreateProductService';
import GetAllProductService from '../services/GetAllProductService';
import DeleteProductService from '../services/DeleteProductService';
import {
  getProductQueryParamsSchema,
  updateProductBodySchema,
} from '../schemas/product.schema';
import UpdateProductService from '../services/UpdateProductService';
import z from 'zod';

export type getAllProductsQueryParams = z.infer<
  typeof getProductQueryParamsSchema
>;
class ProductController {
  async create(req: FastifyRequest, reply: FastifyReply) {
    const data = req.body as IProductRequest;
    const createProduct = new CreateProductService();
    const userId = req.user?.sub;

    const product = await createProduct.execute({ infos: data, userId });

    return reply.status(201).send({
      message: 'Product created with success!',
      data: product,
    });
  }

  async getAllIsActive(req: FastifyRequest, reply: FastifyReply) {
    const getAllProducts = new GetAllProductService();

    const { products, totalCount, totalPages } = await getAllProducts.execute(
      req.query as getAllProductsQueryParams,
    );

    return reply.status(200).send({
      message: 'Get all producst is ACTIVE',
      data: {
        products,
        totalCount,
        totalPages,
      },
    });
  }

  async delete(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const userId = req.user?.sub;
    const deleteProduct = new DeleteProductService();

    const product = await deleteProduct.execute(id, userId);

    reply.status(200).send({
      message: 'Product deleted successfully',
      data: product,
    });
  }

  async update(req: FastifyRequest, reply: FastifyReply) {
    const { id } = req.params as { id: string };
    const userId = req.user?.sub;
    const data = req.body as typeof updateProductBodySchema;

    const updateProduct = new UpdateProductService();

    const updatedProduct = await updateProduct.execute(
      {
        id,
        ...data,
      },
      userId,
    );

    reply.status(200).send({
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  }
}

export default ProductController;
