import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import {
  registerUserResponseSchema,
  registerUserSchema,
  loginUserSchema,
  loginUserSchemaResponse,
  updatePasswordSchema,
  updateUserResponseSchema,
  updateAvatarResponseSchema,
  updateUserSchema,
  getUserSchemaResponse,
} from '../schemas/user.schema';
import UserController from '../controllers/UserController';
import VerifyJWT from '../middleware/verify-jwt';

export const userRoutes: FastifyPluginAsyncZod = async (fastify) => {
  const userController = new UserController();

  fastify.post(
    '/register',
    {
      schema: {
        body: registerUserSchema,
        response: {
          201: registerUserResponseSchema,
        },
      },
    },
    userController.register,
  );

  fastify.post(
    '/login',
    {
      schema: {
        body: loginUserSchema,
        response: {
          200: loginUserSchemaResponse,
        },
      },
    },
    userController.login,
  );

  fastify.patch(
    '/user/change-password',
    {
      schema: {
        body: updatePasswordSchema,
        response: {
          200: updateAvatarResponseSchema,
        },
      },
      preHandler: [VerifyJWT],
    },
    userController.updatePassword,
  );

  fastify.patch(
    '/user/upload-avatar',
    {
      preHandler: [VerifyJWT],
    },
    userController.uploadAvatar,
  );

  fastify.patch(
    '/user/profile',
    {
      schema: {
        body: updateUserSchema,
        response: {
          200: updateUserResponseSchema,
        },
      },
      preHandler: [VerifyJWT],
    },
    userController.updateProfile,
  );

  fastify.get(
    '/users',
    {
      preHandler: [VerifyJWT],
      schema: {
        response: {
          200: getUserSchemaResponse,
        },
      },
    },
    userController.getAllUsers,
  );
};
