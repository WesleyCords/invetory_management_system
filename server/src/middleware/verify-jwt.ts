import { FastifyReply, FastifyRequest } from 'fastify';

const VerifyJWT = async (req: FastifyRequest, reply: FastifyReply) => {
  // Middleware para verificar token
  try {
    await req.jwtVerify();
  } catch (err) {
    return reply.status(401).send({
      message: 'Unauthorized. Token missing or invalid.',
      data: err,
    });
  }
};

export default VerifyJWT;
