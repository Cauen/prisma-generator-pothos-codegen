import * as Inputs from '../../inputs.js';
import { BatchPayload } from '../../objects.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils.js';

export const deleteManyUnrelatedMutationArgs = builder.args((t) => ({ where: t.field({ type: Inputs.UnrelatedWhereInput, required: true }) }))

export const deleteManyUnrelatedMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: deleteManyUnrelatedMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await _context.db.unrelated.deleteMany({ where: args.where }),
  }),
);

export const deleteManyUnrelatedMutation = defineMutation((t) => ({
  deleteManyUnrelated: t.field(deleteManyUnrelatedMutationObject(t)),
}));
