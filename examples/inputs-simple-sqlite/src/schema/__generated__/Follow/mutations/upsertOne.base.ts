import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const upsertOneFollowMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.FollowWhereUniqueInput, required: true }),
      create: t.field({ type: Inputs.FollowCreateInput, required: true }),
      update: t.field({ type: Inputs.FollowUpdateInput, required: true }),
    }))

export const upsertOneFollowMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Follow',
    nullable: false,
    args: upsertOneFollowMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.follow.upsert({
        where: args.where,
        create: args.create,
        update: args.update,
        ...query,
      }),
  }),
);

export const upsertOneFollowMutation = defineMutation((t) => ({
  upsertOneFollow: t.prismaField(upsertOneFollowMutationObject(t)),
}));
