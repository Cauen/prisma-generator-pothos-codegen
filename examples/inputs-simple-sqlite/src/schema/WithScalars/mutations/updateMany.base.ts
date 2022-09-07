import * as Inputs from '../../inputs';
import { BatchPayload } from '../../objects';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils';

export const updateManyWithScalarsMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: {
      where: t.arg({ type: Inputs.WithScalarsWhereInput, required: false }),
      data: t.arg({ type: Inputs.WithScalarsUpdateManyMutationInput, required: true }),
    },
    resolve: async (_root, args, _context, _info) =>
      await _context.db.withScalars.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyWithScalarsMutation = defineMutation((t) => ({
  updateManyWithScalars: t.field(updateManyWithScalarsMutationObject(t)),
}));
