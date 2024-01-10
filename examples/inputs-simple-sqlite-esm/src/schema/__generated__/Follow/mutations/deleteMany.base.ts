import * as Inputs from '../../inputs.js';
import { BatchPayload } from '../../objects.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils.js';

export const deleteManyFollowMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.FollowWhereInput, required: true }) }))

export const deleteManyFollowMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyFollowMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await _context.db.follow.deleteMany({ where: args.where }),
  }),
);

export const deleteManyFollowMutation = defineMutation((t) => ({
  deleteManyFollow: t.field(deleteManyFollowMutationObject(t)),
}));
