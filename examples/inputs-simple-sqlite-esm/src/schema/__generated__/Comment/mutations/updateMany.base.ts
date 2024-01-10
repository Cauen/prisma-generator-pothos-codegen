import * as Inputs from '../../inputs.js';
import { BatchPayload } from '../../objects.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils.js';

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
      await _context.db.comment.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyCommentMutation = defineMutation((t) => ({
  updateManyComment: t.field(updateManyCommentMutationObject(t)),
}));
