import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const createManyFollowMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.FollowCreateInput], required: true }) }))

export const createManyFollowMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Follow'],
    nullable: false,
    args: createManyFollowMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await _context.db.$transaction(args.data.map((data) => _context.db.follow.create({ data }))),
  }),
);

export const createManyFollowMutation = defineMutation((t) => ({
  createManyFollow: t.prismaField(createManyFollowMutationObject(t)),
}));
