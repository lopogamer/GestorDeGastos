import { PrismaClient } from "@prisma/client";

const databaseClient = new PrismaClient({
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "stdout",
      level: "info",
    },
    {
      emit: "stdout",
      level: "warn",
    },
    {
      emit: "stdout",
      level: "error",
    },
  ],
});

if (process.env.NODE_ENV === "development") {
  databaseClient.$on("query", (e) => {
    console.log("Query: " + e.query);
    console.log("Params: " + e.params);
    console.log("Duration: " + e.duration + "ms");
  });
}

databaseClient.$use(async (params, next) => {
  try {
    const result = await next(params);
    return result;
  } catch (error) {
    console.error("Prisma Error:", error);
    throw error;
  }
});

export default databaseClient;
