import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneUnrelatedMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.UnrelatedWhereUniqueInput, required: true }) }))

export const deleteOneUnrelatedMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Unrelated',
    nullable: true,
    args: deleteOneUnrelatedMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.unrelated.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneUnrelatedMutation = defineMutation((t) => ({
  deleteOneUnrelated: t.prismaField(deleteOneUnrelatedMutationObject(t)),
}));
