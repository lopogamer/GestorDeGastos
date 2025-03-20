import fastify from "fastify";
import databaseClient from "./prisma/prisma_client";
import { routes as userRoutes } from "./routes/user.routes";
import { envConfig } from "./config/env.config";

const server = fastify({
  logger: true,
});

server.register(userRoutes, { prefix: "/users" });

server.get("/health", async () => {
  return { status: "ok" };
});
const start = async () => {
  try {
    await envConfig(server);
    await server.listen({ port: server.config.PORT, host: server.config.HOST });
    console.log("Server is running on port ", server.config.PORT);
    await databaseClient.$connect();
    console.log("Connected to the database");
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
};

process.on("SIGINT", async () => {
  await databaseClient.$disconnect();
  process.exit(0);
});

start();
