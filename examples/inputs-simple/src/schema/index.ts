import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import { db } from '../db';
import { Scalars } from '../../../../src/inputsGenerator/types'

export const builder = new SchemaBuilder<{
  Scalars: Scalars,
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: db,
  },
});

export const schema = builder.toSchema({});
