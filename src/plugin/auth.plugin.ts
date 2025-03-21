import fp from "fastify-plugin";
import fastifyJwt from "fastify-jwt";
import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";

async function authPlugin(fastify: FastifyInstance) {
  fastify.decorate(
    "authenticate",
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        const decoded = await request.jwtVerify<{ id: string }>();
        request.user = { id: decoded.id };
      } catch (err) {
        reply.status(401).send({ error: "Unauthorized" });
      }
    }
  );
}

export default fp(authPlugin);
