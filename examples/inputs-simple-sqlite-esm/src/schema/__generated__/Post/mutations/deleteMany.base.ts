import * as Inputs from '../../inputs.js';
import { BatchPayload } from '../../objects.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils.js';

export const deleteManyPostMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.PostWhereInput, required: true }) }))

export const deleteManyPostMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyPostMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await _context.db.post.deleteMany({ where: args.where }),
  }),
);

export const deleteManyPostMutation = defineMutation((t) => ({
  deleteManyPost: t.field(deleteManyPostMutationObject(t)),
}));
