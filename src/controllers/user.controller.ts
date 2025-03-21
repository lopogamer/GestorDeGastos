import { updateUserSchema } from "./../schemas/user.schemas";
import databaseClient from "../prisma/prisma_client";
import { FastifyRequest } from "fastify";
import { User } from "@prisma/client";

export const userController = {
  async getUser(request: any, reply: any) {
    try {
      const { id } = request.user;
      const user = await databaseClient.user.findUnique({
        where: { id },
      });
      if (!user) {
        return reply.status(404).send({
          message: "User not found",
        });
      }
      reply.send({
        id: process.env.NODE_ENV === "development" ? user.id : undefined,
        name: user.name,
        email: user.email,
        income: user.income,
        expenses: user.expenses,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      });
    } catch (error) {
      console.error("Error fetching user:", error);
      reply.status(500).send({
        message: "Internal server error",
      });
    }
  },

  async updateUser(
    request: FastifyRequest<{ Body: typeof updateUserSchema }>,
    reply: any
  ) {
    try {
      const { id } = request.user as User;
      const { name, email, income, expenses } = request.body;

      const user = await databaseClient.user.findUnique({
        where: { id },
      });
      if (!user) {
        return reply.status(404).send();
      }

      const updatedUser = await databaseClient.user.update({
        where: { id },
        data: {
          name,
          email,
          income,
          expenses,
        },
      });

      reply.send({
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        income: updatedUser.income,
        expenses: updatedUser.expenses,
        createdAt: updatedUser.createdAt,
        updatedAt: updatedUser.updatedAt,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      reply.status(500).send({
        message: "Internal server error",
      });
    }
  },

  async deleteUser(request: any, reply: any) {
    try {
      const { id } = request.user;
      const user = await databaseClient.user.findUnique({
        where: { id },
      });
      if (!user) {
        return reply.status(404).send();
      }

      await databaseClient.user.delete({
        where: { id },
      });

      reply.status(204).send();
    } catch (error) {
      console.error("Error deleting user:", error);
      reply.status(500).send({
        message: "Internal server error",
      });
    }
  },
};
