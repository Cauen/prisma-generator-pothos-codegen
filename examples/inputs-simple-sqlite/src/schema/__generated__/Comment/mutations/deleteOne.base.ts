import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const deleteOneCommentMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.CommentWhereUniqueInput, required: true }) }))

export const deleteOneCommentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Comment',
    nullable: true,
    args: deleteOneCommentMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.comment.delete({ where: args.where, ...query }),
  }),
);

export const deleteOneCommentMutation = defineMutation((t) => ({
  deleteOneComment: t.prismaField(deleteOneCommentMutationObject(t)),
}));
