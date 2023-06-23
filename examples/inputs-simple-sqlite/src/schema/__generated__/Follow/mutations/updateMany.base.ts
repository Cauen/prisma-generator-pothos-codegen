import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyFollowMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.FollowWhereInput, required: false }),
      data: t.arg({ type: Inputs.FollowUpdateManyMutationInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await db.follow.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyFollowMutation = defineMutation((t) => ({
  updateManyFollow: t.field(updateManyFollowMutationObject(t)),
}));
