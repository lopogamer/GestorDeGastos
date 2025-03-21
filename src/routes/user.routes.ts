import { FastifyInstance } from "fastify";
import { userController } from "../controllers/user.controller";
import {
  UserCreateSchema,
  UserCreateResponseSchema,
  userInfoSchema,
  updateUserSchema,
  NotFoundSchema,
} from "../schemas/user.schemas";

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
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
      },
      response: {
        200: userInfoSchema,
        404: NotFoundSchema,
      },
    },
    handler: userController.getUser,
  });
}

function updateUserRoute(app: FastifyInstance) {
  app.put("/:id", {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
      },
      body: updateUserSchema,
      response: {
        200: userInfoSchema,
        404: NotFoundSchema,
      },
    },
    handler: userController.updateUser,
  });
}

function deleteUserRoute(app: FastifyInstance) {
  app.delete("/:id", {
    schema: {
      params: {
        type: "object",
        properties: {
          id: { type: "string" },
        },
      },
      response: {
        200: {
          type: "object",
          properties: {
            message: { type: "string" },
          },
        },
        404: NotFoundSchema,
      },
    },
    handler: userController.deleteUser,
  });
}

export async function routes(app: FastifyInstance, options: any) {
  createUserRoute(app);
  getUserRoute(app);
  updateUserRoute(app);
  deleteUserRoute(app);
}
