import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneFollowMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Follow',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.FollowWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.FollowUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await db.follow.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneFollowMutation = defineMutation((t) => ({
  updateOneFollow: t.prismaField(updateOneFollowMutationObject(t)),
}));
