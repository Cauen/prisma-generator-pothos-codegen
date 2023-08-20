import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyCommentMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.CommentWhereInput, required: true }) }))

export const deleteManyCommentMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyCommentMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await db.comment.deleteMany({ where: args.where }),
  }),
);

export const deleteManyCommentMutation = defineMutation((t) => ({
  deleteManyComment: t.field(deleteManyCommentMutationObject(t)),
}));
