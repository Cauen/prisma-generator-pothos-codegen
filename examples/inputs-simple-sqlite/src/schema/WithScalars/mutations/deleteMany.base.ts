import * as Inputs from '../../inputs';
import { BatchPayload } from '../../objects';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const deleteManyWithScalarsMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: true,
    args: { where: t.arg({ type: Inputs.WithScalarsWhereInput, required: true }) },
    resolve: async (_root, args, _context, _info) =>
      await _context.db.withScalars.deleteMany({ where: args.where }),
  }),
);

export const deleteManyWithScalarsMutation = defineMutation((t) => ({
  deleteManyWithScalars: t.field(deleteManyWithScalarsMutationObject(t)),
}));
