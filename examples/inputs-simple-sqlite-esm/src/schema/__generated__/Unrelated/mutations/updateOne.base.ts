import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

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
      await _context.db.unrelated.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneUnrelatedMutation = defineMutation((t) => ({
  updateOneUnrelated: t.prismaField(updateOneUnrelatedMutationObject(t)),
}));
