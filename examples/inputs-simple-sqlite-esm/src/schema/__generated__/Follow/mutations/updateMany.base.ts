import * as Inputs from '../../inputs.js';
import { BatchPayload } from '../../objects.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils.js';

export const updateManyFollowMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.FollowWhereInput, required: false }),
      data: t.field({ type: Inputs.FollowUpdateManyMutationInput, required: true }),
    }))

export const updateManyFollowMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyFollowMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await _context.db.follow.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyFollowMutation = defineMutation((t) => ({
  updateManyFollow: t.field(updateManyFollowMutationObject(t)),
}));
