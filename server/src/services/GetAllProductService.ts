import { prisma } from '../lib/prisma';

class GetAllProductService {
  async execute() {
    const productsIsActive = await prisma.product.findMany({
      where: { isActive: true },
      include: {
        brand: {
          select: {
            name: true,
          },
        },
        category: true,
        suppliers: {
          select: {
            id: true,
            supplier: true,
          },
        },
      },
    });

    const productsFormatted = productsIsActive.map((product) => {
      const { suppliers, ...dataProduct } = product;

      console.log(suppliers);

      return {
        ...dataProduct,
        suppliers: suppliers.map((pivot) => pivot.supplier),
      };
    });

    return productsFormatted;
  }
}

export default GetAllProductService;
