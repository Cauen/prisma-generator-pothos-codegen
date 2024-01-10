import * as Inputs from '../../inputs.js';
import { BatchPayload } from '../../objects.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils.js';

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
      await _context.db.unrelated.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyUnrelatedMutation = defineMutation((t) => ({
  updateManyUnrelated: t.field(updateManyUnrelatedMutationObject(t)),
}));
