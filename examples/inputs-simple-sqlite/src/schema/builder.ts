import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import { db } from '../db';
import { Scalars } from '../../../../src/inputsGenerator/types'
import PrismaTypes from '../generated/objects'
import { Context } from '@/server';
import { Prisma } from '.prisma/client'

export const builder = new SchemaBuilder<{
  Context: Context,
  PrismaTypes: PrismaTypes,
  Scalars: Scalars<Prisma.Decimal, Prisma.InputJsonValue | null, Prisma.InputJsonValue>,
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: db,
  },
});