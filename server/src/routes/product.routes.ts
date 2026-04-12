import * as z from 'zod';
import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import ProductController from '../controllers/ProductController';

export const productRoutes: FastifyPluginAsyncZod = async (fastify) => {
  const productController = new ProductController();

  fastify.post(
    '/product',
    {
      schema: {
        body: z.object({
          sku: z.string().min(3, 'SKU is required').toUpperCase(),
          name: z
            .string()
            .max(100, 'The product name must be no longer than 100 characters'),
          price: z.number().positive('A price cannot be negative'),
          description: z.string().optional(),
          categoryId: z.string().uuid('Invalid categoryId format'),
          brandId: z.string().uuid('Invalid brandId format'),
          supplierIds: z
            .array(z.string().uuid('Invalid supplierId format'))
            .min(1, 'The product requires at least one supplier'),
        }),
      },
    },
    productController.create,
  );
};
