import { prisma } from '../lib/prisma';
import { AppError } from '../errors/appError';

export interface IProductRequest {
  sku: string;
  name: string;
  price: number;
  description?: string;
  brandId?: string;
  brandName?: string;
  categoryId?: string;
  categoryName?: string;
  supplierIds: string[];
  costPrice: number;
  currentStock: number;
}

interface IProps {
  infos: IProductRequest;
  userId: string;
}

class CreateProductService {
  async execute({ infos, userId }: IProps) {
    if (infos.price < 0) throw new AppError('Price cannot be negative', 400);

    if (infos.costPrice < 0 || infos.costPrice > infos.price) {
      throw new AppError(
        'Cost price cannot be negative and cannot be greater than the selling price',
        400,
      );
    }

    let finalCategoryId = infos.categoryId;

    if (!finalCategoryId && infos.categoryName) {
      const existingCategoryByName = await prisma.category.findFirst({
        where: {
          name: {
            equals: infos.categoryName,
            mode: 'insensitive',
          },
        },
      });

      if (existingCategoryByName) {
        finalCategoryId = existingCategoryByName.id;
      } else {
        const newCategory = await prisma.category.create({
          data: { name: infos.categoryName },
        });
        finalCategoryId = newCategory.id;
      }
    } else if (finalCategoryId) {
      const existCategory = await prisma.category.findUnique({
        where: { id: finalCategoryId },
      });
      if (!existCategory) throw new AppError('Category not found', 404);
    } else {
      throw new AppError(
        'Either categoryId or categoryName must be provided',
        400,
      );
    }

    let finalBrandId = infos.brandId;

    if (!finalBrandId && infos.brandName) {
      const existingBrandByName = await prisma.brand.findFirst({
        where: {
          name: {
            equals: infos.brandName,
            mode: 'insensitive',
          },
        },
      });

      if (existingBrandByName) {
        finalBrandId = existingBrandByName.id;
      } else {
        const newBrand = await prisma.brand.create({
          data: { name: infos.brandName },
        });
        finalBrandId = newBrand.id;
      }
    } else if (finalBrandId) {
      const existingBrand = await prisma.brand.findUnique({
        where: { id: finalBrandId },
      });

      if (!existingBrand) {
        throw new AppError('Brand not found', 404);
      }
    } else {
      throw new AppError('Either brandId or brandName must be provided', 400);
    }

    const uniqueSuppliersIds = Array.from(new Set(infos.supplierIds));

    if (uniqueSuppliersIds.length > 0) {
      const existSuppliers = await prisma.supplier.findMany({
        where: { id: { in: uniqueSuppliersIds } },
      });

      // Se o banco retornou menos fornecedores do que pedimos, algum ID é inválido
      if (existSuppliers.length !== uniqueSuppliersIds.length) {
        throw new AppError('One or more suppliers not found', 404);
      }
    }

    const result = await prisma.$transaction(async (tx) => {
      const existingProduct = await tx.product.findUnique({
        where: { sku: infos.sku },
      });

      if (existingProduct) {
        if (existingProduct.isActive) {
          throw new AppError(
            'A product with this SKU already exists and is active.',
            409,
          );
        }

        const restoredProduct = await tx.product.update({
          where: { id: existingProduct.id },
          data: {
            name: infos.name,
            price: infos.price,
            costPrice: infos.costPrice,
            description: infos.description,
            brandId: finalBrandId,
            categoryId: finalCategoryId,
            isActive: true,
            suppliers: {
              deleteMany: {},
              create: uniqueSuppliersIds.map((id) => ({ supplierId: id })),
            },
          },
          include: { suppliers: true },
        });

        await tx.auditLog.create({
          data: {
            action: 'UPDATE',
            description: `Restaurado e atualizado o produto com SKU: ${infos.sku}`,
            metadata: {
              oldValues: existingProduct,
              newValues: restoredProduct,
            },
            category: 'PRODUCT',
            userId,
            productId: restoredProduct.id,
          },
        });

        return { ...restoredProduct, price: Number(restoredProduct.price) };
      }

      const {
        supplierIds,
        categoryName,
        brandName,
        categoryId,
        brandId,
        ...safeDataProduct
      } = infos;

      const product = await tx.product.create({
        data: {
          ...safeDataProduct,
          categoryId: finalCategoryId as string,
          brandId: finalBrandId as string,
          costPrice: infos.costPrice,
          suppliers: {
            create: uniqueSuppliersIds.map((id) => ({ supplierId: id })),
          },
        },
        include: { suppliers: true },
      });

      await tx.auditLog.create({
        data: {
          action: 'CREATE',
          description: `Criado o produto com SKU: ${infos.sku}`,
          metadata: {
            newValues: product,
            oldValues: null,
          },
          category: 'PRODUCT',
          userId,
          productId: product.id,
        },
      });

      return product;
    });

    return {
      ...result,
      price: Number(result.price),
      costPrice: Number(result.costPrice),
    };
  }
}

export default CreateProductService;
