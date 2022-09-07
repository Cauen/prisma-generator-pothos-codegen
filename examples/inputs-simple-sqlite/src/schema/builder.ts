import { Prisma } from '.prisma/client';
import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import { Scalars } from '../../../../src';
import { db } from '../db';
import PrismaTypes from '../generated/objects';
import { Context } from '@/server';

export const builder = new SchemaBuilder<{
  Context: Context;
  PrismaTypes: PrismaTypes;
  Scalars: Scalars<Prisma.Decimal, Prisma.InputJsonValue | null, Prisma.InputJsonValue>;
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: db,
  },
});
