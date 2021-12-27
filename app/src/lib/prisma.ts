// https://pris.ly/d/help/next-js-best-practices
import { PrismaClient } from "@prisma/client";

const prisma: PrismaClient =
  // @ts-ignore
  global.prisma ||
  new PrismaClient({
    log: ["query", "error", "info", "warn"],
  });

if (process.env.NODE_ENV === "development") {
  // @ts-ignore
  global.prisma = prisma;
}

export { prisma };
