import { FastifyPluginAsync } from 'fastify';
import ProductController from '../controllers/ProductController';

export const productRoutes: FastifyPluginAsync = async (fastify) => {
  const productController = new ProductController();
  fastify.post('/product', productController.create);
};
