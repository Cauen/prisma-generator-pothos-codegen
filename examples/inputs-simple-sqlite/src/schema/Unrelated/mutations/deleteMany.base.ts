import * as Inputs from '../../inputs';
import { BatchPayload } from '../../objects';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyUnrelatedMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.UnrelatedWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await _context.db.unrelated.deleteMany({ where: args.where }),
  }),
);

export const deleteManyUnrelatedMutation = defineMutation((t) => ({
  deleteManyUnrelated: t.field(deleteManyUnrelatedMutationObject(t)),
}));
