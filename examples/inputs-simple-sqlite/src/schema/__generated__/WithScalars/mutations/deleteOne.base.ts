import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneWithScalarsMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.WithScalarsWhereUniqueInput, required: true }) }))

export const deleteOneWithScalarsMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'WithScalars',
    nullable: true,
    args: deleteOneWithScalarsMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.withScalars.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneWithScalarsMutation = defineMutation((t) => ({
  deleteOneWithScalars: t.prismaField(deleteOneWithScalarsMutationObject(t)),
}));
