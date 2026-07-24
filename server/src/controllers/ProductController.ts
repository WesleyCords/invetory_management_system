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

  async getAllIsActive(
    req: FastifyRequest<{
      Querystring: getAllProductsQueryParams;
    }>,
    reply: FastifyReply,
  ) {
    const getAllProducts = new GetAllProductService();

    const { products, totalCount, totalPages } = await getAllProducts.execute(
      req.query,
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

  async update(
    req: FastifyRequest<{
      Params: { id: string };
      Body: typeof updateProductBodySchema;
    }>,
    reply: FastifyReply,
  ) {
    const { id } = req.params;
    const data = req.body;

    const updateProduct = new UpdateProductService();

    const updatedProduct = await updateProduct.execute({
      id,
      ...data,
    });

    reply.status(200).send({
      message: 'Product updated successfully',
      data: updatedProduct,
    });
  }
}

export default ProductController;
