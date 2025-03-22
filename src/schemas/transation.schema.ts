import { Type } from "@sinclair/typebox";

export const createTransactionSchema = Type.Object({
  amount: Type.Number({
    minimum: 0,
    errorMessage: {
      type: "O valor deve ser um número",
      minimum: "O valor deve ser maior ou igual a 0",
    },
  }),
  type: Type.Enum(
    {
      INCOME: "INCOME",
      EXPENSE: "EXPENSE",
    },
    {
      errorMessage: {
        enumValues: "Tipo de transação inválido. Use 'INCOME' ou 'EXPENSE'.",
      },
    }
  ),
  description: Type.Optional(
    Type.String({
      minLength: 1,
      maxLength: 255,
      errorMessage: {
        minLength: "A descrição deve ter pelo menos 1 caractere",
        maxLength: "A descrição deve ter no máximo 255 caracteres",
      },
    })
  ),
  category: Type.Enum(
    {
      FOOD: "FOOD",
      TRANSPORT: "TRANSPORT",
      ENTERTAINMENT: "ENTERTAINMENT",
      UTILITIES: "UTILITIES",
      HEALTH: "HEALTH",
      EDUCATION: "EDUCATION",
      OTHER: "OTHER",
    },
    {
      errorMessage: {
        enumValues: "Categoria inválida",
      },
    }
  ),
  date: Type.String({
    format: "date-time",
    errorMessage: {
      type: "A data deve ser uma string no formato ISO 8601, ex: 2023-10-01T00:00:00Z",
    },
  }),
  expense_type: Type.Optional(
    Type.Union([
      Type.Enum(
        {
          ESSENTIAL: "ESSENTIAL",
          OPTIONAL: "OPTIONAL",
        },
        {
          errorMessage: {
            enumValues:
              "Tipo de gasto inválido. Use 'ESSENTIAL' ou 'OPTIONAL'.",
          },
        }
      ),
      Type.Null(),
    ])
  ),
});

export type CreateTransactionSchema = typeof createTransactionSchema;
