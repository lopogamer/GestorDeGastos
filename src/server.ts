import fastify from "fastify";
import databaseClient from "./prisma/prisma_client";
import { routes as userRoutes } from "./routes/user.routes";
import { envConfig } from "./config/env.config";
import addErrors from "ajv-errors";
import Ajv from "ajv";
import { customErrorHandler } from "./utils/error_handle";
import authPlugin from "./plugin/auth.plugin";
import jwt from "fastify-jwt";
import { authRoutes } from "./routes/auth.routes";
import { transactionRoutes } from "./routes/transation.routes";
const transport_opts = {
  target: "pino-pretty",
  options: {
    colorize: true,
    translateTime: "SYS:standard",
    ignore: "pid,hostname",
  },
};

const ajv = new Ajv({
  allErrors: true,
  strict: false,
});

addErrors(ajv);

const server = fastify({
  logger: {
    transport: transport_opts,
  },
  ajv: {
    customOptions: {
      allErrors: true,
    },
    plugins: [addErrors],
  },
});

server.setValidatorCompiler(({ schema }) => ajv.compile(schema));
server.setErrorHandler(customErrorHandler);
server.register(jwt, { secret: process.env.JWT_SECRET || "supersecret" });
server.register(authPlugin);
server.register(userRoutes, { prefix: "/users" });
server.register(authRoutes, { prefix: "/auth" });
server.register(transactionRoutes, { prefix: "/transactions" });

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
