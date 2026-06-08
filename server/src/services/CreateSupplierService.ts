import z from 'zod';
import { prisma } from '../lib/prisma';
import { CreateSupplierRequest } from '../schemas/supplier.schema';

export type ICreateSupplierRequest = z.infer<typeof CreateSupplierRequest>;

class CreateSupplierService {
  async execute(data: ICreateSupplierRequest) {
    const { name } = data;

    const isNameAlreadyUsed = await prisma.supplier.findFirst({
      where: {
        name,
      },
    });

    if (isNameAlreadyUsed) {
      throw new Error('Supplier name already used');
    }

    const newSupplier = await prisma.supplier.create({
      data,
    });

    return newSupplier;
  }
}

export default CreateSupplierService;
