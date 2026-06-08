import Fastify from 'fastify';
import 'dotenv/config';

import {
  serializerCompiler,
  validatorCompiler,
  ZodTypeProvider,
  hasZodFastifySchemaValidationErrors,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod';
import swagger from '@fastify/swagger';
import swaggerUi from '@fastify/swagger-ui';
import { prisma } from './lib/prisma.js';
import { AppError } from './errors/appError.js';
import { appRoutes } from './routes/index.js';
import rateLimit from '@fastify/rate-limit';
import fastifyJwt from '@fastify/jwt';
import z from 'zod';
import cors from '@fastify/cors';

const envSchema = z.object({
  PORT: z.coerce.number().default(3000),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
  KEY_JWT: z.string().min(1, 'A chave JWT não pode ser vazia'),
});

const _env = envSchema.parse(process.env);

const envConfig = {
  production: true,
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true,
        translateTime: 'SYS:standard',
        ignore: 'pid,hostname',
      },
    },
  },
  test: false,
} as const;

const server = Fastify({
  logger: envConfig[_env.NODE_ENV] ?? true,
}).withTypeProvider<ZodTypeProvider>(); // the type is now of ZOD

server.register(rateLimit, {
  max: 100,
  timeWindow: '1 minute',
  errorResponseBuilder: function (request, context) {
    return {
      status: 'error',
      apiLimit: context.max,
      message: `Hold on! Request limit exceeded. Please try again in 1 minute.`,
    };
  },
});

server.setSerializerCompiler(serializerCompiler);
server.setValidatorCompiler(validatorCompiler);

server.register(swagger, {
  openapi: {
    info: {
      title: 'Inventory Management API',
      description: 'API documentation built with Fastify, Prisma, and Zod',
      version: '1.0.0',
    },
  },
  transform: jsonSchemaTransform,
});
server.register(swaggerUi, {
  routePrefix: '/docs',
});

server.setErrorHandler((err, req, reply) => {
  if (hasZodFastifySchemaValidationErrors(err)) {
    return reply.status(400).send({
      status: 'error_validation',
      message: 'Data validation error: ' + err.validation[0].message,
      issues: err.validation,
    });
  }

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

server.register(fastifyJwt, {
  secret: _env.KEY_JWT,
});

server.register(cors, {
  origin: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
});

server.register(appRoutes, { prefix: '/api/v1' });

const start = async () => {
  try {
    await prisma.$connect();
    console.log('BANCO DE DADOS CONECTADO COM SUCESSO!');

    await server.listen({ port: _env.PORT, host: '0.0.0.0' });
    console.log(`SERVIDOR SUBIU: http://localhost:${_env.PORT}/api/v1`);
    console.log(`DOC DO SERVIDOR : http://localhost:${_env.PORT}/docs`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
