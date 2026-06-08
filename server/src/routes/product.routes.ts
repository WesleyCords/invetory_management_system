import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import ProductController from '../controllers/ProductController';
import verifyJWT from '../middleware/verify-jwt';

import {
  createProductSchema,
  deleteProductResponse,
  deleteProductSchema,
  getAllProductsResponseSchema,
  productResponseSchema,
  updateProductBodySchema,
  updateProductParamsSchema,
} from '../schemas/product.schema';

export const productRoutes: FastifyPluginAsyncZod = async (fastify) => {
  const productController = new ProductController();

  fastify.addHook('preHandler', verifyJWT);

  fastify.post(
    '/product',
    {
      schema: {
        body: createProductSchema,
        response: {
          201: productResponseSchema,
        },
      },
    },
    productController.create,
  );

  fastify.get(
    '/products',
    {
      schema: {
        response: {
          200: getAllProductsResponseSchema,
        },
      },
    },
    productController.getAllIsActive,
  );

  fastify.delete(
    '/product/:id',
    {
      schema: {
        params: deleteProductSchema,
        response: {
          200: deleteProductResponse,
        },
      },
    },
    productController.delete,
  );

  fastify.patch(
    '/product/:id',
    {
      schema: {
        params: updateProductParamsSchema,
        body: updateProductBodySchema,
        response: {
          200: productResponseSchema,
        },
      },
    },
    productController.update,
  );
};
