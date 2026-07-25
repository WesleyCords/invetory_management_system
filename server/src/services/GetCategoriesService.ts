import { prisma } from '../lib/prisma';

class GetCategoriesService {
  async execute() {
    const categories = await prisma.category.findMany({
      select: {
        id: true,
        name: true,
      },
    });

    return categories;
  }
}

export default GetCategoriesService;
