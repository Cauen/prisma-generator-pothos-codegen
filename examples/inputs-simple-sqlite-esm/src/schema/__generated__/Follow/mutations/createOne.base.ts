import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const createOneFollowMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.FollowCreateInput, required: true }) }))

export const createOneFollowMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Follow',
    nullable: false,
    args: createOneFollowMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.follow.create({ data: args.data, ...query }),
  }),
);

export const createOneFollowMutation = defineMutation((t) => ({
  createOneFollow: t.prismaField(createOneFollowMutationObject(t)),
}));
