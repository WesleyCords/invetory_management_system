import { prisma } from '../lib/prisma';
import { AppError } from '../errors/appError';

export interface IProductRequest {
  sku: string;
  name: string;
  price: number;
  description?: string;
  brandId: string;
  categoryId: string;
  supplierIds: string[];
}

class CreateProductService {
  async execute(infos: IProductRequest) {
    const uniqueSuppliersIds = Array.from(new Set(infos.supplierIds));
    if (infos.price < 0) throw new AppError('Price cannot be negative', 400);

    const [existCategory, existBrand] = await Promise.all([
      prisma.category.findUnique({ where: { id: infos.categoryId } }),
      prisma.brand.findUnique({ where: { id: infos.brandId } }),
    ]);

    if (!existCategory) throw new AppError('Category not found', 404);
    if (!existBrand) throw new AppError('Brand not found', 404);

    const existSuppliers = await Promise.all(
      uniqueSuppliersIds.map((id) =>
        prisma.supplier.findUnique({ where: { id } }),
      ),
    );

    if (existSuppliers.includes(null))
      throw new AppError('One or more suppliers not found', 404);

    const existingProduct = await prisma.product.findUnique({
      where: { sku: infos.sku },
    });

    if (existingProduct) {
      if (existingProduct.isActive) {
        throw new AppError(
          'A product with this SKU already exists and is active.',
          409,
        );
      }

      const restoredProduct = await prisma.product.update({
        where: { id: existingProduct.id },
        data: {
          name: infos.name,
          price: infos.price,
          description: infos.description,
          brandId: infos.brandId,
          categoryId: infos.categoryId,
          isActive: true,
          suppliers: {
            deleteMany: {},
            create: uniqueSuppliersIds.map((id) => ({ supplierId: id })),
          },
        },
        include: { suppliers: true },
      });

      return { ...restoredProduct, price: Number(restoredProduct.price) };
    }

    const { supplierIds, ...dataProduct } = infos;

    const product = await prisma.product.create({
      data: {
        ...dataProduct,
        suppliers: {
          create: supplierIds.map((id) => ({ supplierId: id })),
        },
      },
      include: { suppliers: true },
    });

    return product;
  }
}

export default CreateProductService;
