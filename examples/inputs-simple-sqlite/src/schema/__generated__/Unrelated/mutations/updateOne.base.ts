import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneUnrelatedMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.UnrelatedWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.UnrelatedUpdateInput, required: true }),
    }))

export const updateOneUnrelatedMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Unrelated',
    nullable: true,
    args: updateOneUnrelatedMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.unrelated.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneUnrelatedMutation = defineMutation((t) => ({
  updateOneUnrelated: t.prismaField(updateOneUnrelatedMutationObject(t)),
}));
