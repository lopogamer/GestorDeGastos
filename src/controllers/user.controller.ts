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
      const hashedPassword = await bcrypt.hash(password, 10);
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
      });
    } catch (error) {
      console.error("Error creating user:", error);
      reply.status(500).send({
        message: "Internal server error",
      });
    }
  },
};
