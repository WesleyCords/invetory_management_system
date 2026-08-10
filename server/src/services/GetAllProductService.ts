import { prisma } from '../lib/prisma';
import { Prisma } from '@prisma/client';
import { getAllProductsQueryParams } from '../controllers/ProductController';

class GetAllProductService {
  async execute({ page, limit, search }: getAllProductsQueryParams) {
    const whereClause: Prisma.ProductWhereInput = {
      isActive: true,
      ...(search && {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { sku: { contains: search, mode: 'insensitive' } },
        ],
      }),
    };

    const [productsIsActive, productsCount] = await prisma.$transaction([
      prisma.product.findMany({
        where: whereClause,
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
        skip: (page - 1) * limit,
        take: limit,
      }),
      prisma.product.count({
        where: whereClause,
      }),
    ]);

    const productsFormatted = productsIsActive.map((product) => {
      const { suppliers, price, costPrice, currentStock, ...dataProduct } =
        product;

      const isLowStock = currentStock < 10;

      return {
        ...dataProduct,
        price: Number(price),
        costPrice: Number(costPrice),
        suppliers: suppliers.map((pivot) => pivot.supplier),
        quantity: currentStock,
        isLowStock,
      };
    });

    return {
      products: productsFormatted,
      totalCount: productsCount,
      totalPages: Math.ceil(productsCount / limit),
    };
  }
}

export default GetAllProductService;
