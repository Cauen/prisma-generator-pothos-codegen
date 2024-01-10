import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const createOneCommentMutationArgs = builder.args((t) => ({ data: t.field({ type: Inputs.CommentCreateInput, required: true }) }))

export const createOneCommentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Comment',
    nullable: false,
    args: createOneCommentMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.comment.create({ data: args.data, ...query }),
  }),
);

export const createOneCommentMutation = defineMutation((t) => ({
  createOneComment: t.prismaField(createOneCommentMutationObject(t)),
}));
