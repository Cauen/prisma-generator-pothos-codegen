import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const updateOneFollowMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.FollowWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.FollowUpdateInput, required: true }),
    }))

export const updateOneFollowMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Follow',
    nullable: true,
    args: updateOneFollowMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.follow.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneFollowMutation = defineMutation((t) => ({
  updateOneFollow: t.prismaField(updateOneFollowMutationObject(t)),
}));
