import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyFollowMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.FollowWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await db.follow.deleteMany({ where: args.where }),
  }),
);

export const deleteManyFollowMutation = defineMutation((t) => ({
  deleteManyFollow: t.field(deleteManyFollowMutationObject(t)),
}));
