import { PrismaClient } from "@prisma/client";

declare global {
  var __forgePrisma: PrismaClient | undefined;
}

export function getDb() {
  if (!globalThis.__forgePrisma) {
    globalThis.__forgePrisma = new PrismaClient();
  }

  return globalThis.__forgePrisma;
}
