import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneFollowMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.FollowWhereUniqueInput, required: true }) }))

export const deleteOneFollowMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Follow',
    nullable: true,
    args: deleteOneFollowMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.follow.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneFollowMutation = defineMutation((t) => ({
  deleteOneFollow: t.prismaField(deleteOneFollowMutationObject(t)),
}));
