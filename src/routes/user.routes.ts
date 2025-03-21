import { FastifyInstance } from "fastify";
import { userController } from "../controllers/user.controller";
import {
  UserCreateSchema,
  UserCreateResponseSchema,
  userInfoSchema,
  updateUserSchema,
} from "../schemas/user.schemas";
import { idParamsSchema, NotFoundSchema } from "../schemas/common.schemas";

function createUserRoute(app: FastifyInstance) {
  app.post("/", {
    schema: {
      body: UserCreateSchema,
      response: {
        201: UserCreateResponseSchema,
      },
    },
    handler: userController.createUser,
  });
}

function getUserRoute(app: FastifyInstance) {
  app.get("/:id", {
    schema: {
      params: idParamsSchema,
      response: {
        200: userInfoSchema,
        404: NotFoundSchema,
      },
    },
    preHandler: app.authenticate,
    handler: userController.getUser,
  });
}

function updateUserRoute(app: FastifyInstance) {
  app.put("/:id", {
    schema: {
      body: updateUserSchema,
      response: {
        200: userInfoSchema,
        404: NotFoundSchema,
      },
    },
    preHandler: app.authenticate,
    handler: userController.updateUser,
  });
}

function deleteUserRoute(app: FastifyInstance) {
  app.delete("/", {
    schema: {
      response: {
        204: {
          type: "null",
        },
        404: NotFoundSchema,
      },
    },
    preHandler: app.authenticate,
    handler: userController.deleteUser,
  });
}

export async function routes(app: FastifyInstance, options: any) {
  createUserRoute(app);
  getUserRoute(app);
  updateUserRoute(app);
  deleteUserRoute(app);
}
