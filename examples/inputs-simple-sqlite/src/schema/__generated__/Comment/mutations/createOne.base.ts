import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const createOneCommentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Comment',
    nullable: false,
    args: { data: t.arg({ type: Inputs.CommentCreateInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.comment.create({ data: args.data, ...query }),
  }),
);

export const createOneCommentMutation = defineMutation((t) => ({
  createOneComment: t.prismaField(createOneCommentMutationObject(t)),
}));
