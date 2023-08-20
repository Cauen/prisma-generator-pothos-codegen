import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneWithScalarsMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.WithScalarsWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.WithScalarsUpdateInput, required: true }),
    }))

export const updateOneWithScalarsMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithScalars',
    nullable: true,
    args: updateOneWithScalarsMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.withScalars.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneWithScalarsMutation = defineMutation((t) => ({
  updateOneWithScalars: t.prismaField(updateOneWithScalarsMutationObject(t)),
}));
