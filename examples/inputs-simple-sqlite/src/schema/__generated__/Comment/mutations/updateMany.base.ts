import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyCommentMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.CommentWhereInput, required: false }),
      data: t.field({ type: Inputs.CommentUpdateManyMutationInput, required: true }),
    }))

export const updateManyCommentMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyCommentMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await db.comment.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyCommentMutation = defineMutation((t) => ({
  updateManyComment: t.field(updateManyCommentMutationObject(t)),
}));
