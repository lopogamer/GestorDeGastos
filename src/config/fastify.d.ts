import "fastify";

declare module "fastify" {
  interface FastifyInstance {
    config: {
      PORT: number;
      HOST: string;
    };
    authenticate: (request: any, reply: any) => Promise<void>;
  }
}
