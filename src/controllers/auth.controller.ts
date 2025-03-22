import { AuthLoginSchema } from "./../schemas/auth.schemas";
import { FastifyRequest } from "fastify";
import databaseClient from "../prisma/prisma_client";
import bcrypt from "bcrypt";
import { UserCreateSchema } from "../schemas/user.schemas";

export const authController = {
  async login(
    request: FastifyRequest<{ Body: typeof AuthLoginSchema }>,
    reply: any
  ) {
    try {
      const { email, password } = request.body;
      const user = await databaseClient.user.findUnique({
        where: { email },
      });

      if (!user) {
        return reply.status(404).send({
          message: "User not found",
        });
      }
      const match = await bcrypt.compare(password, user.password || "");
      if (!match) {
        return reply.status(401).send({
          message: "Unauthorized",
        });
      }
      const payload = {
        id: user.id,
      };

      const token = await reply.jwtSign(payload, {
        expiresIn: "1h",
      });
      reply.status(200).send({
        message: "Login successful",
        token,
      });
    } catch (error) {
      console.error("Error logging in:", error);
      reply.status(500).send({
        message: "Internal server error",
      });
    }
  },
  async register(
    request: FastifyRequest<{ Body: typeof UserCreateSchema }>,
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
        data: {
          name: name,
          email: email,
          password:
            process.env.NODE_ENV === "development" ? password : undefined,
          id: process.env.NODE_ENV === "development" ? id : undefined,
        },
      });
    } catch (error) {
      console.error("Error creating user:", error);
      reply.status(500).send({
        message: "Internal server error",
      });
    }
  },
};
