import { FastifyInstance } from "fastify";

export async function envConfig(fastify: FastifyInstance) {
  fastify.decorate("config", {
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    HOST: process.env.HOST || "0.0.0.0",
    SALT_HASH: process.env.SALT_HASH || 10,
  });
}
