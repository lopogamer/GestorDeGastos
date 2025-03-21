import { FastifyInstance } from "fastify";
import { authController } from "../controllers/auth.controller";
import {
  AuthLoginResponseSchema,
  AuthLoginSchema,
  authRegisterResponseSchema,
} from "../schemas/auth.schemas";
import { NotFoundSchema, unathorizedSchema } from "../schemas/common.schemas";
import { UserCreateSchema } from "../schemas/user.schemas";

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
async function registerRoute(app: FastifyInstance) {
  app.post("/register", {
    schema: {
      body: UserCreateSchema,
      response: {
        200: authRegisterResponseSchema,
      },
    },
    handler: authController.register,
  });
}

export async function authRoutes(app: FastifyInstance) {
  loginRoute(app);
}
