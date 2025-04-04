import { FastifyInstance } from "fastify";
import { authController } from "../controllers/auth.controller";
import {
  AuthLoginResponseSchema,
  AuthLoginSchema,
} from "../schemas/auth.schemas";
import {
  NotFoundSchema,
  successSchema,
  unathorizedSchema,
} from "../schemas/common.schemas";
import { UserCreateSchema, userInfoSchema } from "../schemas/user.schemas";

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
        201: successSchema,
      },
    },
    handler: authController.register,
  });
}

export async function authRoutes(app: FastifyInstance) {
  loginRoute(app);
  registerRoute(app);
}
