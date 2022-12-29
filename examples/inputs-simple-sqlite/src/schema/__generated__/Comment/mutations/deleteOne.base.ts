import * as Inputs from '../../inputs';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneCommentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Comment',
    nullable: true,
    args: { where: t.arg({ type: Inputs.CommentWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.comment.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneCommentMutation = defineMutation((t) => ({
  deleteOneComment: t.prismaField(deleteOneCommentMutationObject(t)),
}));
