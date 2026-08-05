import { prisma } from '../lib/prisma';
import { AppError } from '../errors/appError';

class UpdateProfileService {
  async execute(userId: string, name?: string, username?: string) {
    if (!name && !username) {
      throw new AppError(
        'At least one field (name or username) must be provided',
        400,
      );
    }

    const userExists = await prisma.user.findUnique({ where: { id: userId } });
    if (!userExists) throw new AppError('User not found', 404);

    const hasNameChanged = name !== undefined && name !== userExists.name;
    const hasUsernameChanged =
      username !== undefined && username !== userExists.username;
    const isDirty = hasNameChanged || hasUsernameChanged;

    const usernameExists = await prisma.user.findUnique({
      where: { username },
    });

    if (hasUsernameChanged && usernameExists) {
      throw new AppError('Username already exists', 400);
    }

    if (!isDirty) {
      return {
        message: 'No changes detected',
        user: userExists,
      };
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { name, username },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        avatarUrl: true,
      },
    });

    const changedFields = [];
    if (hasNameChanged) changedFields.push('nome');
    if (hasUsernameChanged) changedFields.push('nome de usuário');

    await prisma.auditLog.create({
      data: {
        action: 'UPDATE_PROFILE',
        userId: userId,
        category: 'SYSTEM',
        description: `Atualizou os seguintes dados do perfil: ${changedFields.join(' e ')}.`,
      },
    });

    return {
      message: 'Profile updated successfully',
      user: updatedUser,
    };
  }
}

export default UpdateProfileService;
