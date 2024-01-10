import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const deleteOneUnrelatedMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.UnrelatedWhereUniqueInput, required: true }) }))

export const deleteOneUnrelatedMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Unrelated',
    nullable: true,
    args: deleteOneUnrelatedMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.unrelated.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneUnrelatedMutation = defineMutation((t) => ({
  deleteOneUnrelated: t.prismaField(deleteOneUnrelatedMutationObject(t)),
}));
