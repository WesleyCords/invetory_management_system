import { prisma } from '../lib/prisma';
import { MovementType } from '@prisma/client';
import { getAllProductsQueryParams } from '../controllers/ProductController';

class GetAllProductService {
  async execute({ page, limit }: getAllProductsQueryParams) {
    const [productsIsActive, productsCount] = await prisma.$transaction([
      prisma.product.findMany({
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
          movements: {
            select: {
              type: true,
              quantity: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({
        where: { isActive: true },
      }),
    ]);

    const productsFormatted = productsIsActive.map((product) => {
      const { suppliers, price, movements, costPrice, ...dataProduct } =
        product;

      const currentQuantity = movements.reduce((total, movement) => {
        if (movement.type === MovementType.IN) {
          return total + movement.quantity;
        } else {
          return total - movement.quantity;
        }
      }, 0);

      const isLowStock = currentQuantity < 10;

      return {
        ...dataProduct,
        price: Number(price),
        costPrice: Number(costPrice),
        suppliers: suppliers.map((pivot) => pivot.supplier),
        quantity: currentQuantity,
        isLowStock,
      };
    });

    return {
      products: productsFormatted,
      totalCount: productsCount,
      totalPages: Math.ceil(productsCount / 10),
    };
  }
}

export default GetAllProductService;
