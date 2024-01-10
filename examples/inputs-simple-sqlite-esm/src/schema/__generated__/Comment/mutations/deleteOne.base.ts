import * as Inputs from '../../inputs.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils.js';

export const deleteOneCommentMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.CommentWhereUniqueInput, required: true }) }))

export const deleteOneCommentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Comment',
    nullable: true,
    args: deleteOneCommentMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await _context.db.comment.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneCommentMutation = defineMutation((t) => ({
  deleteOneComment: t.prismaField(deleteOneCommentMutationObject(t)),
}));
