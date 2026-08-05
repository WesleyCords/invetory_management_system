import * as argon2 from 'argon2';
import { prisma } from '../lib/prisma';
import { AppError } from '../errors/appError';

interface ChangePasswordDTO {
  userId: string;
  currentPassword: string;
  newPassword: string;
}

class UpdatePasswordService {
  async execute({ userId, currentPassword, newPassword }: ChangePasswordDTO) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const isPasswordValid = await argon2.verify(user.password, currentPassword);

    if (!isPasswordValid) {
      throw new AppError('Current password does not match', 401);
    }

    const isSamePassword = await argon2.verify(user.password, newPassword);
    if (isSamePassword) {
      throw new AppError(
        'New password cannot be the same as the current one',
        400,
      );
    }

    const hashedNewPassword = await argon2.hash(newPassword);

    await prisma.user.update({
      where: { id: userId },
      data: {
        password: hashedNewPassword,
      },
    });

    await prisma.auditLog.create({
      data: {
        userId,
        action: 'PASSWORD_CHANGED',
        category: 'SECURITY',
        description: 'Atualizou sua propria senha com sucesso.',
      },
    });

    return { message: 'Password updated successfully' };
  }
}

export default UpdatePasswordService;
