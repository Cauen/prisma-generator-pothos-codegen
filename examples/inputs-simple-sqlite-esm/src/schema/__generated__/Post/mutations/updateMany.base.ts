import * as Inputs from '../../inputs.js';
import { BatchPayload } from '../../objects.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils.js';

export const updateManyPostMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.PostWhereInput, required: false }),
      data: t.field({ type: Inputs.PostUpdateManyMutationInput, required: true }),
    }))

export const updateManyPostMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyPostMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await _context.db.post.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyPostMutation = defineMutation((t) => ({
  updateManyPost: t.field(updateManyPostMutationObject(t)),
}));
