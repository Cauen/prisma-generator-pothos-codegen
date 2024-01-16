import * as Inputs from '../../inputs.js';
import { BatchPayload } from '../../objects.js';
import { builder } from '../../../builder.js';
import { defineMutation, defineMutationFunction, defineMutationObject } from '../../utils.js';

export const updateManyWithScalarsMutationArgs = builder.args((t) => ({
      where: t.field({ type: Inputs.WithScalarsWhereInput, required: false }),
      data: t.field({ type: Inputs.WithScalarsUpdateManyMutationInput, required: true }),
    }))

export const updateManyWithScalarsMutationObject = defineMutationFunction((t) =>
  defineMutationObject({
    type: BatchPayload,
    nullable: false,
    args: updateManyWithScalarsMutationArgs,
    resolve: async (_root, args, _context, _info) =>
      await _context.db.withScalars.updateMany({ where: args.where || undefined, data: args.data }),
  }),
);

export const updateManyWithScalarsMutation = defineMutation((t) => ({
  updateManyWithScalars: t.field(updateManyWithScalarsMutationObject(t)),
}));
