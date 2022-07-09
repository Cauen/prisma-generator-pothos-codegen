import { PrismaClient } from '@prisma/client'

export const db = new PrismaClient({
  // log: ['error', 'info', 'query', 'warn'],
});
