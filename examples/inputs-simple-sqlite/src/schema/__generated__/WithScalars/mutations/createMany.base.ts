import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyWithScalarsMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.WithScalarsCreateInput], required: true }) }))

export const createManyWithScalarsMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['WithScalars'],
    nullable: false,
    args: createManyWithScalarsMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await db.$transaction(args.data.map((data) => db.withScalars.create({ data }))),
  }),
);

export const createManyWithScalarsMutation = defineMutation((t) => ({
  createManyWithScalars: t.prismaField(createManyWithScalarsMutationObject(t)),
}));
