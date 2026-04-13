import { AppError } from '../errors/appError';
import { prisma } from '../lib/prisma';
import GetProductBalanceService from './GetProductBalance';

class DeleteProductService {
  async execute(id: string) {
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    });

    if (!existingProduct)
      throw new AppError('The product you want to delete does not exist', 404);

    if (!existingProduct.isActive)
      throw new AppError('The product is already been deleted', 400);

    const currentBalance = await new GetProductBalanceService().execute(id);

    if (currentBalance > 0)
      throw new AppError(
        `Cannot delete product. It still has ${currentBalance} items in stock.`,
        400,
      );

    const productDeleted = await prisma.product.update({
      where: { id },
      data: {
        isActive: false,
      },
    });

    return productDeleted;
  }
}

export default DeleteProductService;
