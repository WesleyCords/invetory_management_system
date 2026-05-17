import { FastifyReply, FastifyRequest } from 'fastify';
import CreateUserService, { IUserRequest } from '../services/CreateUserService';

class UserController {
  async register(
    req: FastifyRequest<{ Body: IUserRequest }>,
    reply: FastifyReply,
  ) {
    const { name, username, password } = req.body;
    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, username, password });

    reply.status(201).send({
      message: 'User registered successfully',
      data: user,
    });
  }
}

export default UserController;
