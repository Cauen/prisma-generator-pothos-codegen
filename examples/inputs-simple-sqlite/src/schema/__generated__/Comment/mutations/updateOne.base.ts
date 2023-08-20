import * as Inputs from '@/schema/__generated__/inputs'
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationPrismaObject } from '../../utils';

export const updateOneCommentMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.CommentWhereUniqueInput, required: true }),
      data: t.field({ type: Inputs.CommentUpdateInput, required: true }),
    }))

export const updateOneCommentMutationObject = defineMutationFunction((t) =>
  defineMutationPrismaObject({
    type: 'Comment',
    nullable: true,
    args: updateOneCommentMutationArgs,
    resolve: async (query, _root, args, _context, _info) =>
      await db.comment.update({ where: args.where, data: args.data, ...query }),
  }),
);

export const updateOneCommentMutation = defineMutation((t) => ({
  updateOneComment: t.prismaField(updateOneCommentMutationObject(t)),
}));
