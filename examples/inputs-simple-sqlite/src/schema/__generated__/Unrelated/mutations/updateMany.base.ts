import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyUnrelatedMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.UnrelatedWhereInput, required: false }),
      data: t.arg({ type: Inputs.UnrelatedUpdateManyMutationInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await db.unrelated.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyUnrelatedMutation = defineMutation((t) => ({
  updateManyUnrelated: t.field(updateManyUnrelatedMutationObject(t)),
}));
