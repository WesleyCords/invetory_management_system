import { prisma } from '../lib/prisma';
import { AppError } from '../errors/appError';
import { Prisma } from '@prisma/client';

// Assumindo a tipagem do seu UpdateProductData
export interface UpdateProductData {
  id: string;
  name?: string;
  price?: number;
  costPrice?: number;
  description?: string;
  brandId?: string;
  categoryId?: string;
  isActive?: boolean;
  supplierIds?: string[];
}

class UpdateProductService {
  async execute(data: UpdateProductData, userId: string) {
    const { id, supplierIds, ...restData } = data;

    try {
      const result = await prisma.$transaction(async (tx) => {
        const productExists = await tx.product.findUnique({
          where: { id },
          include: { suppliers: true },
        });

        if (!productExists) {
          throw new AppError('Product not found', 404);
        }

        const changedOldValues: Record<string, unknown> = {};
        const changedNewValues: Record<string, unknown> = {};

        for (const key of Object.keys(restData) as Array<
          keyof typeof restData
        >) {
          const newValue = restData[key];
          const oldValue = productExists[key as keyof typeof productExists];

          if (newValue !== undefined && newValue !== oldValue) {
            changedOldValues[key] = oldValue;
            changedNewValues[key] = newValue;
          }
        }

        let suppliersToUpdate = {};

        if (supplierIds) {
          const oldSupplierIds = productExists.suppliers.map(
            (s) => s.supplierId,
          );

          const isSuppliersDifferent =
            JSON.stringify(oldSupplierIds.sort()) !==
            JSON.stringify([...supplierIds].sort());

          if (isSuppliersDifferent) {
            changedOldValues['supplierIds'] = oldSupplierIds;
            changedNewValues['supplierIds'] = supplierIds;

            suppliersToUpdate = {
              suppliers: {
                deleteMany: {},
                create: supplierIds.map((supplierId) => ({
                  supplierId,
                })),
              },
            };
          }
        }

        const updatedProduct = await tx.product.update({
          where: { id },
          data: {
            ...restData,
            ...suppliersToUpdate,
          },
          include: {
            suppliers: {
              include: { supplier: true },
            },
            category: true,
            brand: true,
          },
        });

        const changedKeys = Object.keys(changedNewValues);

        if (changedKeys.length > 0) {
          const fieldTranslations: Record<string, string> = {
            name: 'nome',
            price: 'preço',
            costPrice: 'preço de custo',
            description: 'descrição',
            brandId: 'marca',
            categoryId: 'categoria',
            isActive: 'status',
            supplierIds: 'fornecedores',
          };

          let dynamicDescription: string;

          if (changedKeys.length === 1) {
            const key = changedKeys[0];
            const translatedKey = fieldTranslations[key] || key;

            const oldVal = Array.isArray(changedOldValues[key])
              ? 'uma lista'
              : changedOldValues[key];
            const newVal = Array.isArray(changedNewValues[key])
              ? 'outra lista'
              : changedNewValues[key];

            dynamicDescription = `O ${translatedKey} do produto "${updatedProduct.name}" foi alterado de '${oldVal}' para '${newVal}'.`;
          } else {
            const translatedKeys = changedKeys
              .map((k) => fieldTranslations[k] || k)
              .join(', ');

            dynamicDescription = `O produto "${updatedProduct.name}" teve os seguintes campos alterados: ${translatedKeys}.`;
          }

          await tx.auditLogs.create({
            data: {
              action: 'UPDATE',
              description: dynamicDescription,
              oldValue: changedOldValues as Prisma.InputJsonObject,
              newValue: changedNewValues as Prisma.InputJsonObject,
              userId: userId,
              productId: updatedProduct.id,
            },
          });
        }

        return updatedProduct;
      });

      return {
        ...result,
        price: Number(result.price),
        costPrice: Number(result.costPrice),
      };
    } catch (error) {
      if (error instanceof AppError) {
        throw error;
      }

      console.error('Error updating product:', error);
      throw new AppError('Failed to update product', 500);
    }
  }
}

export default UpdateProductService;
