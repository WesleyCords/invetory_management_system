import { FastifyReply, FastifyRequest } from 'fastify';
import CreateUserService, { IUserRequest } from '../services/CreateUserService';
import AuthenticateUserService, {
  ILoginUserRequest,
} from '../services/AuthenticateUserService';
import z from 'zod';
import { updatePasswordSchema, updateUserSchema } from '../schemas/user.schema';
import UpdatePasswordService from '../services/UpdatePasswordService';
import UploadAvatarService from '../services/UploadAvatarService';
import UpdateProfileService from '../services/UpdateProfileService';

type IChangePasswordRequest = z.infer<typeof updatePasswordSchema>;
type IChangeProfileRequest = z.infer<typeof updateUserSchema>;

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

    const userPayloadToken = {
      sub: user.id,
      name: user.name,
      username: user.username,
      role: user.role,
    };

    const token = await reply.jwtSign(userPayloadToken, {
      sign: {
        expiresIn: '1d',
      },
    });

    reply.status(200).send({
      token,
      user,
      message: 'Login successful',
    });
  }

  async updatePassword(
    req: FastifyRequest<{ Body: IChangePasswordRequest }>,
    reply: FastifyReply,
  ) {
    const { currentPassword, newPassword } = req.body;
    const userId = req.user.sub;

    const updatePasswordService = new UpdatePasswordService();

    const result = await updatePasswordService.execute({
      userId,
      currentPassword,
      newPassword,
    });

    reply.status(200).send(result);
  }

  async uploadAvatar(req: FastifyRequest, reply: FastifyReply) {
    const data = await req.file();

    if (!data) {
      return reply.status(400).send({ message: 'No file uploaded' });
    }

    const userId = req.user.sub;

    const fileBuffer = await data.toBuffer();

    const service = new UploadAvatarService();

    const result = await service.execute(
      userId,
      fileBuffer,
      data.mimetype,
      data.filename,
    );

    return reply.status(200).send(result);
  }

  async updateProfile(
    req: FastifyRequest<{ Body: IChangeProfileRequest }>,
    reply: FastifyReply,
  ) {
    const { name, username } = req.body;
    const userId = req.user.sub;

    const updateProfileService = new UpdateProfileService();

    const result = await updateProfileService.execute(userId, name, username);

    reply.status(200).send({
      message: result.message,
      data: result.user,
    });
  }
}

export default UserController;
