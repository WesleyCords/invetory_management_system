import { prisma } from '../lib/prisma';
import { AppError } from '../errors/appError';

interface IProductRequest {
  name: string;
  price: number;
  categoryId: string;
}

class CreateProductService {
  async execute({ name, price, categoryId }: IProductRequest) {
    if (price < 0) {
      throw new AppError('price cannot be negative', 400);
    }

    const existCategory = await prisma.category.findUnique({
      where: { id: categoryId },
    });

    if (!existCategory) {
      throw new AppError('Category not found', 404);
    }

    const product = await prisma.product.create({
      data: {
        name,
        price,
        categoryId,
      },
    });

    return product;
  }
}

export default CreateProductService;
