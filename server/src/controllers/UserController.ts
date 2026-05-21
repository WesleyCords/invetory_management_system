import { FastifyReply, FastifyRequest } from 'fastify';
import CreateUserService, { IUserRequest } from '../services/CreateUserService';
import AuthenticateUserService, {
  ILoginUserRequest,
} from '../services/AuthenticateUserService';

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

  async login(
    req: FastifyRequest<{ Body: ILoginUserRequest }>,
    reply: FastifyReply,
  ) {
    const { username, password } = req.body;
    const authUser = new AuthenticateUserService();

    const user = await authUser.execute({ username, password });

    const token = await reply.jwtSign(
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '1d',
        },
      },
    );

    reply.status(200).send({
      token,
      user,
      message: 'Login successful',
    });
  }
}

export default UserController;
