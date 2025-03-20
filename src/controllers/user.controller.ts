import { updateUserSchema } from "./../schemas/user.schemas";
import bcrypt from "bcrypt";
import databaseClient from "../prisma/prisma_client";
import { FastifyRequest } from "fastify";
import { UserCreateObject as UserCreateRequest } from "../schemas/user.schemas";

export const userController = {
  async createUser(
    request: FastifyRequest<{ Body: UserCreateRequest }>,
    reply: any
  ) {
    try {
      const { name, email, password, income, expenses } = request.body;
      const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.HASH_SALT) || 10
      );
      await databaseClient.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
          income,
          expenses,
        },
      });
      reply.status(201).send({
        message: "User created successfully",
        name: name,
        email: email,
        password: process.env.NODE_ENV === "development" ? password : undefined,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      reply.status(500).send({
        message: "Internal server error",
      });
    }
  },

  async getUser(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: any
  ) {
    try {
      const { id } = request.params;
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
    request: FastifyRequest<{
      Params: { id: string };
      Body: typeof updateUserSchema;
    }>,
    reply: any
  ) {
    try {
      const { id } = request.params;
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

  async deleteUser(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: any
  ) {
    try {
      const { id } = request.params;
      const user = await databaseClient.user.findUnique({
        where: { id },
      });
      if (!user) {
        return reply.status(404).send();
      }

      await databaseClient.user.delete({
        where: { id },
      });

      reply.send({
        message: "User deleted successfully",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      reply.status(500).send({
        message: "Internal server error",
      });
    }
  },
};
