import {
  createTransactionSchema,
  transationInfoSchema,
  updateTransactionSchema,
} from "./../schemas/transation.schema";
import { FastifyReply, FastifyRequest } from "fastify";
import databaseClient from "../prisma/prisma_client";
import { Category, TransactionType } from "@prisma/client";
import { get } from "http";
export const transactionController = {
  async createTransaction(
    request: FastifyRequest<{ Body: typeof createTransactionSchema }>,
    reply: any
  ) {
    try {
      const {
        amount,
        description,
        type,
        category,
        transactionDate,
        expense_type,
      } = request.body;
      const userId = request.user as { id: string };
      const transactionId = crypto.randomUUID();
      const transactionType = type as string;
      const isIncome = transactionType === "INCOME";

      console.log("Transaction Type: ", transactionType);

      const transactionData = {
        id: transactionId,
        amount,
        description,
        type: transactionType as TransactionType,
        category: isIncome ? null : (category as Category),
        transactionDate: new Date(transactionDate),
        expense_type: isIncome ? null : expense_type,
        userId: userId.id,
      };

      const transaction = await databaseClient.transaction.create({
        data: transactionData,
      });

      return reply.status(201).send({
        message: "Transaction created successfully",
        data: transaction,
      });
    } catch (error) {
      console.error("Error creating transaction:", error);
      return reply.status(500).send({
        message: "Internal server error",
        error: error,
      });
    }
  },
  async getTransactions(
    request: any,
    reply: FastifyReply<{ Body: typeof transationInfoSchema }>
  ) {
    try {
      const userId = request.user as { id: string };
      const transactions = await databaseClient.transaction.findMany({
        where: {
          userId: userId.id,
        },
        orderBy: {
          transactionDate: "desc",
        },
      });

      return reply.status(200).send(transactions);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      return reply.status(500).send({
        message: "Internal server error",
        error: error,
      });
    }
  },
  async searchTransaction(
    request: any,
    reply: FastifyReply<{ Body: typeof transationInfoSchema }>
  ) {
    try {
      const userId = request.user as { id: string };
      const { startDate, endDate, title, type, category } = request.query;

      const where: any = {
        userId: userId.id,
      };

      if (startDate && endDate) {
        try {
          const startDataStr = startDate as string;
          const endDataStr = endDate as string;
          const cleanStartDate = startDataStr.replace("}", "").trim();
          const cleanEndDate = endDataStr.replace("}", "").trim();
          const parsedStartDate = new Date(cleanStartDate);
          const parsedEndDate = new Date(cleanEndDate);

          where.transactionDate = {
            gte: parsedStartDate,
            lte: parsedEndDate,
          };
        } catch (dateError) {
          console.error("Error parsing dates:", dateError);
          return reply.status(400).send({
            message:
              "Invalid date format. Please use YYYY-MM-DD HH:mm:ss format",
          });
        }
      }

      if (title) {
        where.description = {
          contains: title,
          mode: "insensitive",
        };
      }

      if (type) {
        where.type = type;
      }

      if (category) {
        where.category = category;
      }
      console.log("final where", where);
      const transactions = await databaseClient.transaction.findMany({
        where,
        orderBy: {
          transactionDate: "desc",
        },
      });

      return reply.status(200).send(transactions);
    } catch (error) {
      console.error("Error searching transactions:", error);
      return reply.status(500).send({
        message: "Internal server error",
        error: error,
      });
    }
  },
  async deleteTransaction(request: any, reply: any) {
    try {
      const userId = request.user as { id: string };
      const { transactionId } = request.params;
      const transaction = await databaseClient.transaction.deleteMany({
        where: {
          id: transactionId,
          userId: userId.id,
        },
      });

      return reply.status(200).send({
        message: "Transaction deleted successfully",
        data: transaction,
      });
    } catch (error) {
      console.error("Error deleting transaction:", error);
      return reply.status(500).send({
        message: "Internal server error",
        error: error,
      });
    }
  },
  async updateTransaction(request: any, reply: any) {
    try {
      const userId = request.user as { id: string };
      const { transactionId } = request.params;
      const {
        amount,
        description,
        type,
        category,
        transactionDate,
        expense_type,
      } = request.body;
      console.log("request.body: ", request.body);
      const transactionType = type as string;
      const isIncome = transactionType === "INCOME";

      console.log("Transaction Type: ", transactionType);

      const transactionData = {
        amount,
        description,
        type: transactionType as TransactionType,
        category: isIncome ? null : (category as Category),
        transactionDate: new Date(transactionDate),
        expense_type: isIncome ? null : expense_type,
      };

      await databaseClient.transaction.updateMany({
        where: {
          id: transactionId,
          userId: userId.id,
        },
        data: transactionData,
      });
      const transactions = await databaseClient.transaction.findMany({
        where: {
          id: transactionId,
          userId: userId.id,
        },
      });

      return reply.status(200).send(transactions);
    } catch (error) {
      console.error("Error updating transaction:", error);
      return reply.status(500).send({
        message: "Internal server error",
        error: error,
      });
    }
  },
  async getDashboardData(request: any, reply: any) {
    try {
      const userId = request.user as { id: string };
      const transactions = await databaseClient.transaction.findMany({
        where: {
          userId: userId.id,
        },
        orderBy: {
          transactionDate: "desc",
        },
      });

      const totalIncome = transactions.reduce((acc, transaction) => {
        if (transaction.type === "INCOME") {
          return acc + transaction.amount;
        }
        return acc;
      }, 0);

      const totalExpenses = transactions.reduce((acc, transaction) => {
        if (transaction.type === "EXPENSE") {
          return acc + transaction.amount;
        }
        return acc;
      }, 0);

      const balance = totalIncome - totalExpenses;

      return reply.status(200).send({
        totalIncome,
        totalExpenses,
        balance,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      return reply.status(500).send({
        message: "Internal server error",
        error: error,
      });
    }
  },
};
