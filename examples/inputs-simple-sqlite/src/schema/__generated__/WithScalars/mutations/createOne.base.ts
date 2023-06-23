import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneWithScalarsMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithScalars',
    nullable: false,
    args: { data: t.arg({ type: Inputs.WithScalarsCreateInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await db.withScalars.create({ data: args.data, ...query }),
  }),
);

export const createOneWithScalarsMutation = defineMutation((t) => ({
  createOneWithScalars: t.prismaField(createOneWithScalarsMutationObject(t)),
}));
