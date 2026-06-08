import z from 'zod';
import { updateProductBodySchema } from '../schemas/product.schema';
import { AppError } from '../errors/appError';
import { prisma } from '../lib/prisma';

type UpdateProductData = z.infer<typeof updateProductBodySchema> & {
  id: string;
};

class UpdateProductService {
  async execute(data: UpdateProductData) {
    const { id, supplierIds, ...restData } = data;

    const productExists = await prisma.product.findUnique({
      where: { id },
    });

    if (!productExists) {
      throw new AppError('Product not found', 404);
    }

    let suppliersToUpdate = {};

    if (supplierIds) {
      suppliersToUpdate = {
        suppliers: {
          deleteMany: {},
          create: supplierIds.map((supplierId) => ({
            supplierId,
          })),
        },
      };
    }

    try {
      const updatedProduct = await prisma.product.update({
        where: { id },
        data: {
          ...restData,
          ...suppliersToUpdate,
        },
        include: {
          suppliers: {
            include: {
              supplier: true,
            },
          },
          category: true,
          brand: true,
        },
      });

      return {
        ...updatedProduct,
        price: Number(updatedProduct.price),
        costPrice: Number(updatedProduct.costPrice),
      };
    } catch (error) {
      console.error('Error updating product:', error);
      throw new AppError('Failed to update product', 500);
    }
  }
}

export default UpdateProductService;
