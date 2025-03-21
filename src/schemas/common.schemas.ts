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

export type NotFoundObject = Static<typeof NotFoundSchema>;
export type IdParamsObject = Static<typeof idParamsSchema>;
