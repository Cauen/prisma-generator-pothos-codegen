import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createManyFollowMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Follow'],
    nullable: false,
    args: { data: t.arg({ type: [Inputs.FollowCreateInput], required: true }) },
    resolve: async (_query, _root, args, _context, _info) =>
      await db.$transaction(args.data.map((data) => db.follow.create({ data }))),
  }),
);

export const createManyFollowMutation = defineMutation((t) => ({
  createManyFollow: t.prismaField(createManyFollowMutationObject(t)),
}));
