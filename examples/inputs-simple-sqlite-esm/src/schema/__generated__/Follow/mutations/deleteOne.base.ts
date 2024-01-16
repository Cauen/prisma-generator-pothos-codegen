import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const deleteOneFollowMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.FollowWhereUniqueInput, required: true }) }))

export const deleteOneFollowMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Follow',
    nullable: true,
    args: deleteOneFollowMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.follow.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneFollowMutation = defineMutation((t) => ({
  deleteOneFollow: t.prismaField(deleteOneFollowMutationObject(t)),
}));
