import * as Inputs from '@/schema/__generated__/inputs'
import { BatchPayload } from '../../objects';
import { db } from '@/db';
import { builder } from '../../../builder';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyUnrelatedMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.UnrelatedWhereInput, required: false }),
      data: t.field({ type: Inputs.UnrelatedUpdateManyMutationInput, required: true }),
    }))

export const updateManyUnrelatedMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyUnrelatedMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await db.unrelated.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyUnrelatedMutation = defineMutation((t) => ({
  updateManyUnrelated: t.field(updateManyUnrelatedMutationObject(t)),
}));
