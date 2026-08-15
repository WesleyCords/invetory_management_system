import { AppError } from '../errors/appError';
import { prisma } from '../lib/prisma';
import argon2 from 'argon2';
import { registerUserSchema } from '../schemas/user.schema';
import z from 'zod';

export type IUserRequest = z.infer<typeof registerUserSchema>;

class CreateUserService {
  async execute({ name, username, password }: IUserRequest) {
    const usernameExists = await prisma.user.findUnique({
      where: { username },
    });

    if (usernameExists) {
      throw new AppError('Username already exists', 409);
    }

    const passwordHash = await argon2.hash(password);

    const user = await prisma.user.create({
      data: {
        name,
        username,
        password: passwordHash,
      },
    });

    return user;
  }

  async getAllUsers() {
    const users = await prisma.user.findMany({
      where: {
        role: {
          not: 'MANAGER',
        },
      },
      select: {
        id: true,
        name: true,
        username: true,
        role: true,
        avatarUrl: true,
      },
    });
    return users;
  }
}

export default CreateUserService;
