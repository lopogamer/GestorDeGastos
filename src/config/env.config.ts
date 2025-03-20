import { FastifyInstance } from "fastify";

export async function envConfig(fastify: FastifyInstance) {
  fastify.decorate("config", {
    PORT: process.env.PORT ? parseInt(process.env.PORT, 10) : 3000,
    HOST: process.env.HOST || "0.0.0.0",
    DB_HOST: process.env.DB_HOST || "localhost",
    DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 5432,
    DB_USER: process.env.DB_USER || "user",
    DB_PASSWORD: process.env.DB_PASSWORD || "password",
    DB_NAME: process.env.DB_NAME || "database",
  });
}
