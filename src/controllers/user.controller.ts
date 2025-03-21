import { updateUserSchema } from "./../schemas/user.schemas";
import bcrypt from "bcrypt";
import databaseClient from "../prisma/prisma_client";
import { FastifyRequest } from "fastify";
import { UserCreateObject as UserCreateRequest } from "../schemas/user.schemas";
import { User } from "@prisma/client";

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
      const id = crypto.randomUUID();
      await databaseClient.user.create({
        data: {
          id,
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
        id: process.env.NODE_ENV === "development" ? id : undefined,
      });
    } catch (error) {
      console.error("Error creating user:", error);
      reply.status(500).send({
        message: "Internal server error",
      });
    }
  },

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
