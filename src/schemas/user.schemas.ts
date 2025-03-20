import { Type, Static } from "@sinclair/typebox";

export const UserCreateSchema = Type.Object({
  name: Type.String({
    minLength: 1,
    maxLength: 50,
  }),
  email: Type.String({
    format: "email",
  }),
  password: Type.String({
    minLength: 8,
    maxLength: 100,
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
  }),
  income: Type.Number({
    minimum: 0,
  }),
  expenses: Type.Number({
    minimum: 0,
  }),
});

export const UserCreateResponseSchema = Type.Object({
  message: Type.String({
    minLength: 1,
    maxLength: 100,
    default: "User created successfully",
  }),
});

export type UserCreateObject = Static<typeof UserCreateSchema>;
export type UserCreateResponseObject = Static<typeof UserCreateResponseSchema>;
