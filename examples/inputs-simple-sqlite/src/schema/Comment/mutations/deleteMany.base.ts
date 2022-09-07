import * as Inputs from '../../inputs';
import { BatchPayload } from '../../objects';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyCommentMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.CommentWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await _context.db.comment.deleteMany({ where: args.where }),
  }),
);

export const deleteManyCommentMutation = defineMutation((t) => ({
  deleteManyComment: t.field(deleteManyCommentMutationObject(t)),
}));
