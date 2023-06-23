import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneFollowMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Follow',
    nullable: false,
    args: { data: t.arg({ type: Inputs.FollowCreateInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await db.follow.create({ data: args.data, ...query }),
  }),
);

export const createOneFollowMutation = defineMutation((t) => ({
  createOneFollow: t.prismaField(createOneFollowMutationObject(t)),
}));
