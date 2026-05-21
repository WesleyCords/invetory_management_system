import { z } from 'zod';
import { loginUserSchema } from '../schemas/user.schema';
import { prisma } from '../lib/prisma';
import { AppError } from '../errors/appError';
import argon2 from 'argon2';

export type ILoginUserRequest = z.infer<typeof loginUserSchema>;

class AuthenticateUserService {
  async execute({ username, password }: ILoginUserRequest) {
    const user = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (!user) {
      throw new AppError('No user with that username was found', 404);
    }

    const isPasswordValid = await argon2.verify(user.password, password);

    if (!isPasswordValid) {
      throw new AppError('Invalid credentials', 401);
    }

    return user;
  }
}

export default AuthenticateUserService;
