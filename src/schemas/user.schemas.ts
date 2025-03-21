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
    })
  ),
  email: Type.Optional(
    Type.String({
      format: "email",
    })
  ),
  income: Type.Optional(
    Type.Number({
      minimum: 0,
    })
  ),
  expenses: Type.Optional(
    Type.Number({
      minimum: 0,
    })
  ),
});

export const NotFoundSchema = Type.Object({
  message: Type.String({
    default: "User not found",
  }),
});

export type UserCreateObject = Static<typeof UserCreateSchema>;
export type UserCreateResponseObject = Static<typeof UserCreateResponseSchema>;
export type UserInfoObject = Static<typeof userInfoSchema>;
export type UpdateUserObject = Static<typeof updateUserSchema>;
export type NotFoundObject = Static<typeof NotFoundSchema>;
