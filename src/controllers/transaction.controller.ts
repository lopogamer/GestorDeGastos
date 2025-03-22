import { createTransactionSchema } from "./../schemas/transation.schema";
import { FastifyRequest } from "fastify";
import databaseClient from "../prisma/prisma_client";
import { Category, TransactionType } from "@prisma/client";

export const transactionController = {
  async createTransaction(
    request: FastifyRequest<{ Body: typeof createTransactionSchema }>,
    reply: any
  ) {
    try {
      const {
        amount,
        description,
        type: transactionType,
        category,
        date,
        expense_type,
      } = request.body;
      const userId = request.user as { id: string };
      const id = crypto.randomUUID();
      const transaction = await databaseClient.transaction.create({
        data: {
          id,
          amount,
          description,
          type: transactionType as TransactionType,
          category: category as Category,
          transactionDate: new Date(date),
          expense_type,
          userId: userId.id,
        },
      });

      return reply.status(201).send({
        message: "Transaction created successfully",
        data: transaction,
      });
    } catch (error) {}
  },
};
