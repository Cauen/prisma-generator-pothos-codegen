import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

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
      await db.follow.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneFollowMutation = defineMutation((t) => ({
  updateOneFollow: t.prismaField(updateOneFollowMutationObject(t)),
}));
