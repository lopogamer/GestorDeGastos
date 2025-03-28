import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { transactionController } from "../controllers/transaction.controller";
import {
  createTransactionSchema,
  transationInfoSchema,
  updateTransactionSchema,
} from "../schemas/transation.schema";
import { successSchema } from "../schemas/common.schemas";

export async function transactionRoutes(app: FastifyInstance) {
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
  app.get("/", {
    schema: {
      response: {
        200: transationInfoSchema,
      },
    },
    preHandler: app.authenticate,
    handler: transactionController.getTransactions,
  });
  app.get("/search", {
    schema: {
      response: {
        200: transationInfoSchema,
      },
    },
    preHandler: app.authenticate,
    handler: transactionController.searchTransaction,
  });

  app.put("/:id", {
    schema: {
      body: updateTransactionSchema,
      response: {
        200: transationInfoSchema,
      },
    },
    preHandler: app.authenticate,
    handler: transactionController.updateTransaction,
  });

  app.delete("/:id", {
    schema: {
      response: {
        200: successSchema,
      },
    },
    preHandler: app.authenticate,
    handler: transactionController.deleteTransaction,
  });
  app.get("/dashboard", {
    preHandler: app.authenticate,
    handler: transactionController.getDashboardData,
  });
}
