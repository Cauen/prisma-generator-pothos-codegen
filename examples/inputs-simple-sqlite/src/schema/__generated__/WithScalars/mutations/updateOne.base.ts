import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneWithScalarsMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithScalars',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.WithScalarsWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.WithScalarsUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await db.withScalars.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneWithScalarsMutation = defineMutation((t) => ({
  updateOneWithScalars: t.prismaField(updateOneWithScalarsMutationObject(t)),
}));
