import { prisma } from '../lib/prisma';

class GetAllSuppliersService {
  async execute() {
    const suppliers = await prisma.supplier.findMany();

    return suppliers;
  }
}

export default GetAllSuppliersService;
