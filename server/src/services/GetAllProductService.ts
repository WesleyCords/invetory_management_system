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
      const { suppliers, price, ...dataProduct } = product;

      return {
        ...dataProduct,
        price: Number(price),
        suppliers: suppliers.map((pivot) => pivot.supplier),
      };
    });

    return productsFormatted;
  }
}

export default GetAllProductService;
