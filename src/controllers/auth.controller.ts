import { AuthLoginSchema } from "./../schemas/auth.schemas";
import { FastifyRequest } from "fastify";
import databaseClient from "../prisma/prisma_client";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";

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
  async logout(request: FastifyRequest, reply: any) {
    try {
      const { id } = request.user as User;
      const user = await databaseClient.user.findUnique({
        where: { id },
      });
      if (!user) {
        return reply.status(404).send({
          message: "User not found",
        });
      }
      reply.status(200).send({
        message: "Logout successful",
      });
    } catch (error) {
      console.error("Error logging out:", error);
      reply.status(500).send({
        message: "Internal server error",
      });
    }
  },
};
