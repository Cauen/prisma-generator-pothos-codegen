import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import { db } from '../db';
import { Scalars } from '../../../../src/inputsGenerator/types'
import PrismaTypes from '../generated/objects'
import { Decimal } from '@prisma/client/runtime';
import { Context } from '@/server';

export const builder = new SchemaBuilder<{
  Context: Context,
  PrismaTypes: PrismaTypes,
  Scalars: Scalars<Decimal>,
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: db,
  },
});