import { PrismaClient } from "@prisma/client";

import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
declare global {
  var __forgePrisma: PrismaClient | undefined;
}

export function getDb() {
  if (!globalThis.__forgePrisma) {
    globalThis.__forgePrisma = new PrismaClient({ adapter: new PrismaBetterSqlite3({ url: process.env.DATABASE_URL ?? "file:./dev.db" }) });
  }

  return globalThis.__forgePrisma;
}
