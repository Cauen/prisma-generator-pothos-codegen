import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyPostMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.PostWhereInput, required: false }),
      data: t.arg({ type: Inputs.PostUpdateManyMutationInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await db.post.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyPostMutation = defineMutation((t) => ({
  updateManyPost: t.field(updateManyPostMutationObject(t)),
}));
