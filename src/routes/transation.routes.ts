import { FastifyInstance } from "fastify";
import { transactionController } from "../controllers/transaction.controller";
import { createTransactionSchema } from "../schemas/transation.schema";
import { successSchema } from "../schemas/common.schemas";

function createTransationRoute(app: FastifyInstance) {
  app.post("/", {
    schema: {
      body: createTransactionSchema,
      response: {
        201: successSchema,
      },
    },
    preHandler: app.authenticate,
    handler: transactionController.createTransaction,
  });
}

export async function transactionRoutes(app: FastifyInstance) {
  createTransationRoute(app);
}
