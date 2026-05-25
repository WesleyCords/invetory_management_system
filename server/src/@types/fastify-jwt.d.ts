import '@fastify/jwt';

declare module '@fastify/jwt' {
  interface FastifyJWT {
    // O que vai no token quando geramos no Login
    payload: {
      sub: string;
      name: string;
      username: string;
      role: 'MANAGER' | 'EMPLOYEE';
    };
    // O que o request.user vai retornar na rota protegida
    user: {
      sub: string;
      name: string;
      username: string;
      role: 'MANAGER' | 'EMPLOYEE';
    };
  }
}
