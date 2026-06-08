import { prisma } from '../lib/prisma';

class GetAllBrandsService {
  async execute() {
    const brands = await prisma.brand.findMany();

    return brands;
  }
}

export default GetAllBrandsService;
