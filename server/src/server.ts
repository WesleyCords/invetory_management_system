import Fastify from 'fastify';
import { prisma } from './lib/prisma.js';
import { AppError } from './errors/appError.js';
import { appRoutes } from './routes/index.js';

const PORT = 3000;

const server = Fastify({
  logger: true,
});

server.setErrorHandler((err, req, reply) => {
  if (err instanceof AppError) {
    return reply.status(err.statusCode).send({
      status: 'error',
      message: err.message,
    });
  }

  console.log(err);

  reply.status(500).send({
    status: 'error',
    message: 'Error Internal Server',
  });
});
server.register(appRoutes, { prefix: '/api/v1' });

const start = async () => {
  try {
    await prisma.$connect();
    console.log('BANCO DE DADOS CONECTADO COM SUCESSO!');

    await server.listen({ port: PORT, host: '0.0.0.0' });
    console.log(`SERVIDOR SUBIU: http://localhost:${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
