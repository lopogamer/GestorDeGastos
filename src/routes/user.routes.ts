import { FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify";
import { userController } from "../controllers/user.controller";
import {
  UserCreateSchema,
  UserCreateResponseSchema,
  UserCreateObject,
} from "../schemas/user.schemas";

export async function routes(app: FastifyInstance, options: any) {
  app.post("/", {
    schema: {
      body: UserCreateSchema,
      response: {
        201: UserCreateResponseSchema,
      },
    },
    handler: async (
      request: FastifyRequest<{ Body: UserCreateObject }>,
      reply
    ) => userController.createUser(request, reply),
  });
}
