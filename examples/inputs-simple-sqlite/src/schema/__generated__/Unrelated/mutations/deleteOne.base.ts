import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneUnrelatedMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Unrelated',
    nullable: true,
    args: { where: t.arg({ type: Inputs.UnrelatedWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await db.unrelated.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneUnrelatedMutation = defineMutation((t) => ({
  deleteOneUnrelated: t.prismaField(deleteOneUnrelatedMutationObject(t)),
}));
