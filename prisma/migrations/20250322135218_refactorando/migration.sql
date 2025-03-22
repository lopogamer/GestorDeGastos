/*
  Warnings:

  - You are about to drop the column `data` on the `Transaction` table. All the data in the column will be lost.
  - Added the required column `transactionDate` to the `Transaction` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExpenseType" AS ENUM ('ESSENTIAL', 'OPTIONAL');

-- DropIndex
DROP INDEX "Transaction_data_idx";

-- AlterTable
ALTER TABLE "Transaction" DROP COLUMN "data",
ADD COLUMN     "expense_type" "ExpenseType",
ADD COLUMN     "transactionDate" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Transaction_transactionDate_idx" ON "Transaction"("transactionDate");

-- CreateIndex
CREATE INDEX "Transaction_type_expense_type_idx" ON "Transaction"("type", "expense_type");
