import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyCommentMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.CommentWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await db.comment.deleteMany({ where: args.where }),
  }),
);

export const deleteManyCommentMutation = defineMutation((t) => ({
  deleteManyComment: t.field(deleteManyCommentMutationObject(t)),
}));
