import { FastifyRequest, FastifyInstance } from "fastify";
import { userController } from "../controllers/user.controller";
import {
  UserCreateSchema,
  UserCreateResponseSchema,
  UserCreateObject,
  userInfoSchema,
  updateUserSchema,
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
        404: {
          type: "object",
          properties: {
            message: {
              type: "string",
              default: "User not found",
            },
          },
        },
      },
    },
    handler: async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply
    ) => userController.getUser(request, reply),
  });
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
        404: {
          type: "object",
          properties: {
            message: {
              type: "string",
              default: "User not found",
            },
          },
        },
      },
    },
    handler: async (
      request: FastifyRequest<{
        Params: { id: string };
        Body: typeof updateUserSchema;
      }>,
      reply: any
    ) => userController.updateUser(request, reply),
  });

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
        404: {
          type: "object",
          properties: {
            message: {
              type: "string",
            },
          },
        },
      },
    },
    handler: async (
      request: FastifyRequest<{ Params: { id: string } }>,
      reply: any
    ) => userController.deleteUser(request, reply),
  });
}
