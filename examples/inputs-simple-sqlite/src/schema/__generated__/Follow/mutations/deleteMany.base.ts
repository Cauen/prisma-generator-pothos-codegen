import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyFollowMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.FollowWhereInput, required: true }) }))

export const deleteManyFollowMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyFollowMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await db.follow.deleteMany({ where: args.where }),
  }),
);

export const deleteManyFollowMutation = defineMutation((t) => ({
  deleteManyFollow: t.field(deleteManyFollowMutationObject(t)),
}));
