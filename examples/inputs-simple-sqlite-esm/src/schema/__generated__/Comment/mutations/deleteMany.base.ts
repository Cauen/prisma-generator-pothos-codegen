import * as Inputs from '../../inputs.js';
import { BatchPayload } from '../../objects.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils.js';

export const deleteManyCommentMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.CommentWhereInput, required: true }) }))

export const deleteManyCommentMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyCommentMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await _context.db.comment.deleteMany({ where: args.where }),
  }),
);

export const deleteManyCommentMutation = defineMutation((t) => ({
  deleteManyComment: t.field(deleteManyCommentMutationObject(t)),
}));
