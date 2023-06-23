import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyUnrelatedMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.UnrelatedWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await db.unrelated.deleteMany({ where: args.where }),
  }),
);

export const deleteManyUnrelatedMutation = defineMutation((t) => ({
  deleteManyUnrelated: t.field(deleteManyUnrelatedMutationObject(t)),
}));
