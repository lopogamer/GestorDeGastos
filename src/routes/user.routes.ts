import { FastifyInstance } from "fastify";
import { userController } from "../controllers/user.controller";
import { userInfoSchema, updateUserSchema } from "../schemas/user.schemas";
import { NotFoundSchema } from "../schemas/common.schemas";

function getUserRoute(app: FastifyInstance) {
  app.get("/", {
    schema: {
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
  app.put("/", {
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
  getUserRoute(app);
  updateUserRoute(app);
  deleteUserRoute(app);
}
