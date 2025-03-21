import { FastifyInstance } from "fastify";
import { authController } from "../controllers/auth.controller";
import {
  AuthLoginResponseSchema,
  AuthLoginSchema,
} from "../schemas/auth.schemas";
import { NotFoundSchema, unathorizedSchema } from "../schemas/common.schemas";

async function loginRoute(app: FastifyInstance) {
  app.post("/login", {
    schema: {
      body: AuthLoginSchema,
      response: {
        401: unathorizedSchema,
        404: NotFoundSchema,
        200: AuthLoginResponseSchema,
      },
    },
    handler: authController.login,
  });
}

export async function authRoutes(app: FastifyInstance) {
  loginRoute(app);
}
