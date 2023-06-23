import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyPostMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.PostWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await db.post.deleteMany({ where: args.where }),
  }),
);

export const deleteManyPostMutation = defineMutation((t) => ({
  deleteManyPost: t.field(deleteManyPostMutationObject(t)),
}));
