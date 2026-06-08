import { FastifyReply, FastifyRequest } from 'fastify';
import GetAllSuppliersService from '../services/GetAllSuppliersService';
import CreateSupplierService, {
  ICreateSupplierRequest,
} from '../services/CreateSupplierService';

class ControllerSupplier {
  async create(
    req: FastifyRequest<{ Body: ICreateSupplierRequest }>,
    reply: FastifyReply,
  ) {
    const data = req.body;
    const createSupplier = new CreateSupplierService();

    const supplier = await createSupplier.execute(data);

    return reply.status(201).send({
      message: 'Supplier created with success!',
      data: supplier,
    });
  }

  async getAll(req: FastifyRequest, reply: FastifyReply) {
    const getAllSuppliers = new GetAllSuppliersService();

    const suppliers = await getAllSuppliers.execute();

    return reply.status(200).send({
      message: 'Get all suppliers with success!',
      data: suppliers,
    });
  }
}

export default ControllerSupplier;
