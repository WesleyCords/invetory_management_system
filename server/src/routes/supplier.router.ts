import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import {
  CreateSupplierRequest,
  ResponseSupplier,
  ResponseSuppliers,
} from '../schemas/supplier.schema';
import ControllerSupplier from '../controllers/SupplierController';

export const supplierRouter: FastifyPluginAsyncZod = async (fastify) => {
  const controllerSupplier = new ControllerSupplier();

  fastify.post(
    '/supplier',
    {
      schema: {
        body: CreateSupplierRequest,
        response: {
          201: ResponseSupplier,
        },
      },
    },
    controllerSupplier.create,
  );

  fastify.get(
    '/suppliers',
    {
      schema: {
        response: {
          200: ResponseSuppliers,
        },
      },
    },
    controllerSupplier.getAll,
  );
};
