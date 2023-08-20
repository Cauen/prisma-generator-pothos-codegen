import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyFollowMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.FollowCreateInput], required: true }) }))

export const createManyFollowMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Follow'],
    nullable: false,
    args: createManyFollowMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await db.$transaction(args.data.map((data) => db.follow.create({ data }))),
  }),
);

export const createManyFollowMutation = defineMutation((t) => ({
  createManyFollow: t.prismaField(createManyFollowMutationObject(t)),
}));
