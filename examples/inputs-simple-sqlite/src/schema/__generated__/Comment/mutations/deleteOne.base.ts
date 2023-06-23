import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneCommentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Comment',
    nullable: true,
    args: { where: t.arg({ type: Inputs.CommentWhereUniqueInput, required: true }) },
    resolve: async (query, _root, args, _context, _info) =>
      await db.comment.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneCommentMutation = defineMutation((t) => ({
  deleteOneComment: t.prismaField(deleteOneCommentMutationObject(t)),
}));
