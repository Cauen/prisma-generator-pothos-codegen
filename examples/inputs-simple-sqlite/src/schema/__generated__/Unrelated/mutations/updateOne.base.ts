import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneUnrelatedMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Unrelated',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.UnrelatedWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.UnrelatedUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await db.unrelated.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneUnrelatedMutation = defineMutation((t) => ({
  updateOneUnrelated: t.prismaField(updateOneUnrelatedMutationObject(t)),
}));
