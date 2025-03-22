import { Type, Static } from "@sinclair/typebox";
export const NotFoundSchema = Type.Object({
  message: Type.String({
    default: "User not found",
  }),
});

export const idParamsSchema = Type.Object({
  id: Type.String({
    format: "uuid",
  }),
});
export const unathorizedSchema = Type.Object({
  message: Type.String({
    default: "Unauthorized",
  }),
});

export const successSchema = Type.Object({
  message: Type.String({
    default: "Success",
  }),
  data: Type.Optional(Type.Any()),
});

export type NotFoundObject = Static<typeof NotFoundSchema>;
export type IdParamsObject = Static<typeof idParamsSchema>;
export type UnathorizedObject = Static<typeof unathorizedSchema>;
export type SuccessObject = Static<typeof successSchema>;
