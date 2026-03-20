import { FastifyPluginAsync, FastifyRequest, FastifyReply } from "fastify";

interface IParams {
  name: string;
}

const schemaForPost = {
  body: {
    type: "object",
    required: ["username", "email"],
    properties: {
      username: { type: "string", minLength: 3 },
      email: { type: "string", format: "email" },
      age: { type: "number" },
    },
  },
};

const routes: FastifyPluginAsync = async (fastify, options) => {
  fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    return { hello: "world" };
  });

  fastify.get(
    "/hello/:name",
    async (
      request: FastifyRequest<{ Params: IParams }>,
      reply: FastifyReply,
    ) => {
      const { name } = request.params;
      return { name };
    },
  );

  fastify.post(
    "/user",
    { schema: schemaForPost },
    async (request: FastifyRequest, reply: FastifyReply) => {
      const { username, age, email } = request.body as {
        username: string;
        age?: number;
        email: string;
      };

      return reply.code(201).send({
        id: 1,
        message: `Usuário ${username} criado no Fedora!`,
        age,
        email,
      });
    },
  );
};

export default routes;
