import { Type, Static } from "@sinclair/typebox";

export const UserCreateSchema = Type.Object({
  name: Type.String({
    minLength: 1,
    maxLength: 50,
    errorMessage: {
      minLength: "O Nome deve ter pelo menos 1 caractere",
      maxLength: "O Nome deve ter no máximo 50 caracteres",
    },
  }),
  email: Type.String({
    format: "email",
    errorMessage: {
      format: "O email deve ser um endereço de email válido",
    },
  }),
  password: Type.String({
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
    errorMessage: {
      pattern:
        "A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula e um número",
    },
  }),
  income: Type.Number({
    minimum: 0,
    pattern: "^[0-9]+(\\.[0-9]{1,2})?$",
    errorMessage: {
      minimum: "A renda deve ser um número positivo",
    },
  }),
  expenses: Type.Number({
    minimum: 0,
    errorMessage: {
      minimum: "As despesas devem ser um número positivo",
    },
  }),
});

export const UserCreateResponseSchema = Type.Object({
  message: Type.String({
    minLength: 1,
    maxLength: 100,
    default: "User created successfully",
  }),
  email: Type.String({
    format: "email",
  }),
  name: Type.String({
    minLength: 1,
    maxLength: 50,
  }),
  password: Type.Optional(
    Type.String({
      minLength: 8,
      maxLength: 100,
    })
  ),
  id: Type.Optional(
    Type.String({
      format: "uuid",
    })
  ),
});

export const userInfoSchema = Type.Object({
  id: Type.Optional(
    Type.String({
      format: "uuid",
    })
  ),
  name: Type.String({
    minLength: 1,
    maxLength: 50,
  }),
  email: Type.String({
    format: "email",
  }),
  income: Type.Number({
    minimum: 0,
  }),
  expenses: Type.Number({
    minimum: 0,
  }),
  createdAt: Type.String({
    format: "date-time",
  }),
  updatedAt: Type.String({
    format: "date-time",
  }),
});

export const updateUserSchema = Type.Object({
  name: Type.Optional(
    Type.String({
      minLength: 1,
      maxLength: 50,
      errorMessage: {
        minLength: "O Nome deve ter pelo menos 1 caractere",
        maxLength: "O Nome deve ter no máximo 50 caracteres",
      },
    })
  ),
  email: Type.Optional(
    Type.String({
      format: "email",
      errorMessage: {
        format: "O email deve ser um endereço de email válido",
      },
    })
  ),
  income: Type.Optional(
    Type.Number({
      minimum: 0,
      errorMessage: {
        minimum: "A renda deve ser um número positivo",
      },
    })
  ),
  expenses: Type.Optional(
    Type.Number({
      minimum: 0,
      errorMessage: {
        minimum: "As despesas devem ser um número positivo",
      },
    })
  ),
});

export type UserCreateObject = Static<typeof UserCreateSchema>;
export type UserCreateResponseObject = Static<typeof UserCreateResponseSchema>;
export type UserInfoObject = Static<typeof userInfoSchema>;
export type UpdateUserObject = Static<typeof updateUserSchema>;
