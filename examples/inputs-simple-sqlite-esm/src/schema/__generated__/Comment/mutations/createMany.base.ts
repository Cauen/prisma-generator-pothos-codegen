import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const createManyCommentMutationArgs = builder.args((t) => ({ data: t.field({ type: [Inputs.CommentCreateInput], required: true }) }))

export const createManyCommentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: ['Comment'],
    nullable: false,
    args: createManyCommentMutationArgs,
    resolve: async (_query, _root, args, _context, _info) =>
      await _context.db.$transaction(args.data.map((data) => _context.db.comment.create({ data }))),
  }),
);

export const createManyCommentMutation = defineMutation((t) => ({
  createManyComment: t.prismaField(createManyCommentMutationObject(t)),
}));
