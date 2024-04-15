import { PrismaClient } from "@prisma/client";

let db: PrismaClient;

// @ts-ignore
if (!db) {
  db = new PrismaClient();
}

export { db };
