import Fastify from "fastify";
import firstRoute from "./routes.js";

const PORT = 3000;

const server = Fastify({
  logger: true,
});

server.register(firstRoute);

const start = async () => {
  try {
    await server.listen({ port: PORT, host: "0.0.0.0" });
    console.log(`SERVIDOR SUBIU: http://localhost:${PORT}`);
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

start();
