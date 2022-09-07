import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneCommentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Comment',
    nullable: true,
    args: {
      where: t.arg({ type: Inputs.CommentWhereUniqueInput, required: true }),
      data: t.arg({ type: Inputs.CommentUpdateInput, required: true }),
    },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.comment.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneCommentMutation = defineMutation((t) => ({
  updateOneComment: t.prismaField(updateOneCommentMutationObject(t)),
}));
