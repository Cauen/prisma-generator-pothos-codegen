import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const createOnePostMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.PostCreateInput, required: true }) }))

export const createOnePostMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Post',
    nullable: false,
    args: createOnePostMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.post.create({ data: args.data, ...query }),
  }),
);

export const createOnePostMutation = defineMutation((t) => ({
  createOnePost: t.prismaField(createOnePostMutationObject(t)),
}));
