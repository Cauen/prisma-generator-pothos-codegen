import SchemaBuilder from '@pothos/core';
import PrismaPlugin from '@pothos/plugin-prisma';
import { db } from '../db';
import { Scalars } from '../../../../src/inputsGenerator/types'
import PrismaTypes from '../generated/objects'

export const builder = new SchemaBuilder<{
  PrismaTypes: PrismaTypes,
  Scalars: Scalars,
}>({
  plugins: [PrismaPlugin],
  prisma: {
    client: db,
  },
});