import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import {
  registerUserResponseSchema,
  registerUserSchema,
  loginUserSchema,
  loginUserSchemaResponse,
} from '../schemas/user.schema';
import UserController from '../controllers/UserController';

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
};
