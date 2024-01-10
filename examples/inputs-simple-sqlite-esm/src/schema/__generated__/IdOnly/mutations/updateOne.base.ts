import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const updateOneIdOnlyMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.IdOnlyWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.IdOnlyUpdateInput, required: true }),
    }))

export const updateOneIdOnlyMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'IdOnly',
    nullable: true,
    args: updateOneIdOnlyMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.idOnly.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneIdOnlyMutation = defineMutation((t) => ({
  updateOneIdOnly: t.prismaField(updateOneIdOnlyMutationObject(t)),
}));
