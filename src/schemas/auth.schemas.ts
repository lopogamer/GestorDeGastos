import { Type, Static } from "@sinclair/typebox";

export const AuthLoginSchema = Type.Object({
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
});

export const AuthLoginResponseSchema = Type.Object({
  message: Type.String({
    minLength: 1,
    maxLength: 100,
    default: "Login realizado com sucesso",
  }),
  token: Type.String({
    minLength: 1,
    maxLength: 500,
    default: "token",
  }),
});

export const authRegisterResponseSchema = Type.Object({
  message: Type.String({
    minLength: 1,
    maxLength: 100,
    default: "Usuário criado com sucesso",
  }),
});

export type AuthLoginObject = Static<typeof AuthLoginSchema>;
export type AuthLoginResponseObject = Static<typeof AuthLoginResponseSchema>;
export type AuthRegisterResponseObject = Static<
  typeof authRegisterResponseSchema
>;
